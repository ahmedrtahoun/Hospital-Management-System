import Message from "../models/messageModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new ErrorHandler("Please Fill Full Form", 400))
    }

    const newMessage = await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
        success: true,
        message: "Message Sent Successfully!",
        data: newMessage
    });
});

export const getAllMessages = catchAsyncErrors(async(req, res, next) => {
    const messages = await Message.getAll();
    res.status(200).json({
        success: true,
        messages
    });
});