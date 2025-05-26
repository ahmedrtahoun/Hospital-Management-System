import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    console.log('Cookies received:', req.cookies);
    const { token } = req.cookies;
    
    if (!token) {
        console.log('No token found in cookies');
        return next(new ErrorHandler("Please log in to continue!", 401));
    }

    try {
        console.log('Verifying token...');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('Token verified, decoded:', decoded);
        
        const user = await User.findById(decoded.id);
        if (!user) {
            console.log('No user found for id:', decoded.id);
            return next(new ErrorHandler("User not found!", 404));
        }
        
        console.log('User authenticated:', user.email);
        req.user = user;
        next();
    } catch (error) {
        console.log('Token verification failed:', error.message);
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
});

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log('Checking role authorization. User role:', req.user.role, 'Allowed roles:', roles);
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
        }
        console.log('Role authorized');
        next();
    };
}; 