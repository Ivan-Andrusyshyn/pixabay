"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        console.error('Headers already sent, passing to next error handler:', err);
        return next(err);
    }
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Показываем stack только в режиме разработки
    });
};
exports.default = errorHandler;
