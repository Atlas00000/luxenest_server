"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_TTL = exports.CacheKeys = exports.deleteCachePattern = exports.deleteCache = exports.setCache = exports.getCache = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const CACHE_TTL = {
    SHORT: 60, // 1 minute
    MEDIUM: 300, // 5 minutes
    LONG: 3600, // 1 hour
    VERY_LONG: 86400, // 24 hours
};
exports.CACHE_TTL = CACHE_TTL;
/**
 * Get cached data
 */
const getCache = async (key) => {
    try {
        if (!redis_1.default.isOpen) {
            return null;
        }
        const cached = await redis_1.default.get(key);
        if (cached) {
            return JSON.parse(cached);
        }
        return null;
    }
    catch (error) {
        console.error(`Cache get error for key ${key}:`, error);
        return null;
    }
};
exports.getCache = getCache;
/**
 * Set cached data
 */
const setCache = async (key, value, ttl = CACHE_TTL.MEDIUM) => {
    try {
        if (!redis_1.default.isOpen) {
            return;
        }
        await redis_1.default.setEx(key, ttl, JSON.stringify(value));
    }
    catch (error) {
        console.error(`Cache set error for key ${key}:`, error);
    }
};
exports.setCache = setCache;
/**
 * Delete cached data
 */
const deleteCache = async (key) => {
    try {
        if (!redis_1.default.isOpen) {
            return;
        }
        await redis_1.default.del(key);
    }
    catch (error) {
        console.error(`Cache delete error for key ${key}:`, error);
    }
};
exports.deleteCache = deleteCache;
/**
 * Delete cache by pattern
 */
const deleteCachePattern = async (pattern) => {
    try {
        if (!redis_1.default.isOpen) {
            return;
        }
        const keys = await redis_1.default.keys(pattern);
        if (keys.length > 0) {
            await redis_1.default.del(keys);
        }
    }
    catch (error) {
        console.error(`Cache delete pattern error for ${pattern}:`, error);
    }
};
exports.deleteCachePattern = deleteCachePattern;
/**
 * Cache key generators
 */
exports.CacheKeys = {
    // Products
    products: (filters) => `products:${filters}`,
    product: (id) => `product:${id}`,
    featuredProducts: () => 'products:featured',
    newProducts: () => 'products:new',
    saleProducts: () => 'products:sale',
    // Categories
    categories: (featured) => `categories:${featured ? 'featured' : 'all'}`,
    category: (id) => `category:${id}`,
    categoryBySlug: (slug) => `category:slug:${slug}`,
    // Admin
    adminStats: (dateRange) => `admin:stats:${dateRange}`,
    // User sessions (already handled by auth, but can be extended)
    userSession: (userId) => `session:${userId}`,
};
//# sourceMappingURL=cache.util.js.map