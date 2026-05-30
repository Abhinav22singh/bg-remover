import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import connectDB from "../configs/mongodb.js";
import Razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

// ← move instance to top level so all functions can access it
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const clerkWebhooks = async (req, res) => {
    try {
        await connectDB();
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(req.body, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });
        const payload = JSON.parse(req.body);
        const { type, data } = payload;
        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url,
                    creditBalance: 5,
                };
                await userModel.create(userData);
                return res.json({ success: true });
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url,
                };
                await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
                return res.json({ success: true });
            }
            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id });
                return res.json({ success: true });
            }
            default:
                return res.json({ success: true });
        }
    } catch (error) {
        console.log("Webhook Error:", error.message);
        return res.json({ success: false, message: error.message });
    }
};

const userCredits = async (req, res) => {
    try {
        await connectDB();
        const clerkId = req.clerkId;
        const userData = await userModel.findOne({ clerkId });
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        return res.json({ success: true, credits: userData.creditBalance });
    } catch (error) {
        console.log("Credits Error:", error.message);
        return res.json({ success: false, message: error.message });
    }
};

const paymentRazorPay = async (req, res) => {
    try {
        await connectDB();
        const { planId } = req.body;
        const clerkId = req.clerkId;

        const userData = await userModel.findOne({ clerkId });
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let credits, plan, amount;

        switch (planId) {
            case "Basic":
                plan = "Basic"; credits = 100; amount = 10;
                break;
            case "Advance":
                plan = "Advance"; credits = 250; amount = 50;
                break;
            case "Business":
                plan = "Business"; credits = 5000; amount = 250;
                break;
            default:
                return res.json({ success: false, message: "Invalid plan ID" });
        }

        const transactionData = {
            clerkId, plan, credits, amount,
            date: Date.now(),
            payment: false,
        };

        const newTransaction = await transactionModel.create(transactionData);

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY || "INR",
            receipt: newTransaction._id.toString(),
        };

        const order = await razorpayInstance.orders.create(options);
        return res.json({ success: true, order });

    } catch (error) {
        console.log("Razorpay Error:", error);
        return res.json({ success: false, message: error.message });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        await connectDB();
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === "paid") {
            const transactionData = await transactionModel.findById(orderInfo.receipt);

            if (transactionData.payment) {
                return res.json({ success: false, message: "Payment already processed" });
            }

            const userData = await userModel.findOne({ clerkId: transactionData.clerkId });
            const creditBalance = userData.creditBalance + transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id, { creditBalance });
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

            return res.json({ success: true, message: "Payment verified and credits added successfully" });
        } else {
            return res.json({ success: false, message: "Payment not completed" });
        }

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export { clerkWebhooks, userCredits, paymentRazorPay, verifyRazorpay };