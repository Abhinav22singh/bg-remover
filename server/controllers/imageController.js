import axios from "axios";
import FormData from "form-data";
import userModel from "../models/userModel.js";
import connectDB from "../configs/mongodb.js";

const removeBgImage = async (req, res) => {
    try {
        await connectDB();

        const clerkId = req.clerkId;
        console.log("clerkId:", clerkId)

        const user = await userModel.findOne({ clerkId });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.creditBalance === 0) {
            return res.json({ success: false, message: "Insufficient credits", creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append("image_file", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        try {
            const { data } = await axios.post("https://clipdrop-api.co/remove-background/v1", formData, {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API,
                    ...formData.getHeaders()
                },
                responseType: "arraybuffer"
            });

            const base64Image = Buffer.from(data, "binary").toString("base64");
            const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

            await userModel.findOneAndUpdate({ _id: user._id }, { creditBalance: user.creditBalance - 1 });

            res.json({ success: true, resultImage, creditBalance: user.creditBalance - 1, message: "Background removed successfully" });

        } catch (clipErr) {
            console.log("Clipdrop status:", clipErr.response?.status);
            console.log("Clipdrop error:", Buffer.from(clipErr.response?.data || "", "binary").toString("utf8"));
            console.log("API KEY exists:", !!process.env.CLIPDROP_API);
            console.log("API KEY value:", process.env.CLIPDROP_API);
            res.json({ success: false, message: clipErr.message });
        }

    } catch (error) {
        console.log("Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}

export { removeBgImage };