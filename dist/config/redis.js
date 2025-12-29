"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectRedis = exports.connectRedis = void 0;
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});
redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});
redisClient.on('connect', () => {
    console.log('Redis Client Connecting...');
});
redisClient.on('ready', () => {
    console.log('✅ Redis connected successfully');
});
// Connect to Redis
const connectRedis = async () => {
    try {
        await redisClient.connect();
    }
    catch (error) {
        console.error('❌ Redis connection error:', error);
        // Don't exit process - Redis is optional for caching
    }
};
exports.connectRedis = connectRedis;
// Disconnect from Redis
const disconnectRedis = async () => {
    await redisClient.quit();
    console.log('Redis disconnected');
};
exports.disconnectRedis = disconnectRedis;
exports.default = redisClient;
//# sourceMappingURL=redis.js.map