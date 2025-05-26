class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || 'Internal Server Error';
    err.statusCode = err.statusCode || 500;

    // PostgreSQL unique violation error
    if (err.code === '23505') {
        const field = err.detail.match(/\((.*?)\)/)[1];
        const message = `Duplicate value for ${field}`;
        err = new ErrorHandler(message, 400);
    }

    // PostgreSQL foreign key violation
    if (err.code === '23503') {
        const message = 'Referenced record does not exist';
        err = new ErrorHandler(message, 400);
    }

    // PostgreSQL check constraint violation
    if (err.code === '23514') {
        const message = 'Data validation failed';
        err = new ErrorHandler(message, 400);
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid token, please login again";
        err = new ErrorHandler(message, 401);
    }

    if (err.name === "TokenExpiredError") {
        const message = "Token expired, please login again";
        err = new ErrorHandler(message, 401);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

export default ErrorHandler;