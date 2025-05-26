import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import messageRouter from "./router/messageRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();

// Load env vars
config({ path: "./config/config.env" });

// Enable detailed logging in development
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        console.log('Request headers:', req.headers);
        next();
    });
}

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? process.env.ALLOWED_ORIGINS?.split(',') || [] 
  : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Basic middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Add cookie debugging middleware
app.use((req, res, next) => {
    const originalSetCookie = res.cookie;
    res.cookie = function (...args) {
        console.log('Setting cookie:', args);
        return originalSetCookie.apply(this, args);
    };
    next();
});

// Health check route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Life Care Hospital API",
        timestamp: new Date(),
        env: process.env.NODE_ENV
    });
});

// Debug route
app.get("/debug", (req, res) => {
    res.json({
        headers: req.headers,
        cookies: req.cookies,
        ip: req.ip,
        method: req.method,
        path: req.path,
        protocol: req.protocol,
        query: req.query
    });
});

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Connect to database
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    });
});

export default app;