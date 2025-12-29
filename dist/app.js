"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
const redis_1 = require("./config/redis");
const error_middleware_1 = require("./middleware/error.middleware");
const logger_middleware_1 = require("./middleware/logger.middleware");
const cache_middleware_1 = require("./middleware/cache.middleware");
const routes_1 = __importDefault(require("./routes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
// Middleware
app.use((0, cors_1.default)({
    origin: CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files (uploads) with cache headers
app.use('/uploads', cache_middleware_1.cacheMiddlewares.veryLong, // 30 days cache for uploaded images
express_1.default.static(path_1.default.join(process.cwd(), 'server', 'uploads')));
// Request logging
app.use(logger_middleware_1.requestLogger);
// Health check endpoint
app.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
    });
});
// API routes
app.use('/api/v1', routes_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl,
    });
});
// Error handling middleware (must be last)
app.use(error_middleware_1.errorHandler);
// Initialize server
const startServer = async () => {
    try {
        // Connect to database
        await (0, database_1.connectDatabase)();
        // Connect to Redis (non-blocking)
        await (0, redis_1.connectRedis)();
        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 CORS enabled for: ${CORS_ORIGIN}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
exports.startServer = startServer;
exports.default = app;
//# sourceMappingURL=app.js.map