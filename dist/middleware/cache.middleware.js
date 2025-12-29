"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddlewares = void 0;
exports.cacheMiddleware = cacheMiddleware;
const cache_headers_util_1 = require("../utils/cache-headers.util");
/**
 * Cache middleware factory - creates middleware with specific cache strategy
 * @param strategy Cache strategy to apply
 * @param options Additional cache options
 */
function cacheMiddleware(strategy, options = {}) {
    return (_req, res, next) => {
        (0, cache_headers_util_1.setCacheHeaders)(res, strategy, options);
        next();
    };
}
/**
 * Predefined cache middlewares for common use cases
 */
exports.cacheMiddlewares = {
    /** No caching - for dynamic/user-specific content */
    noCache: cacheMiddleware(cache_headers_util_1.CacheStrategy.NO_CACHE),
    /** Short cache (1 hour) - for frequently changing content */
    short: cacheMiddleware(cache_headers_util_1.CacheStrategy.SHORT, { revalidate: true }),
    /** Medium cache (1 day) - for moderately changing content */
    medium: cacheMiddleware(cache_headers_util_1.CacheStrategy.MEDIUM, { revalidate: true }),
    /** Long cache (1 week) - for static/semi-static content */
    long: cacheMiddleware(cache_headers_util_1.CacheStrategy.LONG, { revalidate: true }),
    /** Very long cache (30 days) - for static assets */
    veryLong: cacheMiddleware(cache_headers_util_1.CacheStrategy.VERY_LONG),
    /** Immutable cache (1 year) - for versioned static assets */
    immutable: cacheMiddleware(cache_headers_util_1.CacheStrategy.IMMUTABLE),
    /** Private cache (1 hour) - for user-specific content */
    privateShort: cacheMiddleware(cache_headers_util_1.CacheStrategy.SHORT, { isPrivate: true }),
    /** Private cache (1 day) - for user-specific content */
    privateMedium: cacheMiddleware(cache_headers_util_1.CacheStrategy.MEDIUM, { isPrivate: true }),
};
//# sourceMappingURL=cache.middleware.js.map