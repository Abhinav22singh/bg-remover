import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import connectDB from "../configs/mongodb.js";

const clerkWebhooks = async (req, res) => {
    try {
        await connectDB();

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(req.body, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const payload = JSON.parse(req.body);
        const { type, data } = payload;

        console.log("Webhook type:", type);

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url
                };
                await userModel.create(userData);
                res.json({ success: true });
                break;
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url
                };
                await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
                res.json({ success: true });
                break;
            }
            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id });
                res.json({ success: true });
                break;
            }
            default: {
                console.log("Unknown event type:", type);
                res.json({ success: false, message: "Unknown event type" });
            }
        }

    } catch (error) {
        console.log("Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}

const userCredits = async (req, res) => {
    try {
        await connectDB()
        const clerkId = req.clerkId
        console.log("clerkId:", clerkId)
        const userData = await userModel.findOne({ clerkId })
        console.log("userData:", userData)
        if(!userData){
            return res.json({ success: false, message: "User not found" })
        }
        res.json({ success: true, credits: userData.creditBalance })
    } catch (error) {
        console.log("Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}

export { clerkWebhooks, userCredits };