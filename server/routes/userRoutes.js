import express from 'express';
import { clerkWebhooks, paymentRazorPay, userCredits, verifyRazorpay } from '../controllers/userController.js';
import authUser from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhooks);
userRouter.get('/credits', authUser, userCredits);

userRouter.post("/pay-razor",authUser,paymentRazorPay)

userRouter.post('/verify-razor', authUser, verifyRazorpay);

export default userRouter;