import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        const token_decoded = jwt.decode(token);
        req.clerkId = token_decoded.sub;
        next();
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export default authUser;