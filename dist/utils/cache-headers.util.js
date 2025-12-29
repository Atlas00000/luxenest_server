"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheStrategy = void 0;
exports.setCacheHeaders = setCacheHeaders;
exports.setETag = setETag;
exports.setLastModified = setLastModified;
exports.checkConditionalRequest = checkConditionalRequest;
exports.generateETag = generateETag;
/**
 * Cache strategies for different content types
 */
var CacheStrategy;
(function (CacheStrategy) {
    /** No caching - for dynamic/user-specific content */
    CacheStrategy["NO_CACHE"] = "no-cache";
    /** Short cache - for frequently changing content (1 hour) */
    CacheStrategy["SHORT"] = "short";
    /** Medium cache - for moderately changing content (1 day) */
    CacheStrategy["MEDIUM"] = "medium";
    /** Long cache - for static/semi-static content (1 week) */
    CacheStrategy["LONG"] = "long";
    /** Very long cache - for static assets (1 month) */
    CacheStrategy["VERY_LONG"] = "very-long";
    /** Immutable - for versioned static assets */
    CacheStrategy["IMMUTABLE"] = "immutable";
})(CacheStrategy || (exports.CacheStrategy = CacheStrategy = {}));
/**
 * Cache duration in seconds for each strategy
 */
const CACHE_DURATIONS = {
    [CacheStrategy.NO_CACHE]: 0,
    [CacheStrategy.SHORT]: 3600, // 1 hour
    [CacheStrategy.MEDIUM]: 86400, // 1 day
    [CacheStrategy.LONG]: 604800, // 1 week
    [CacheStrategy.VERY_LONG]: 2592000, // 30 days
    [CacheStrategy.IMMUTABLE]: 31536000, // 1 year
};
/**
 * Sets cache headers on the response based on the strategy
 * @param res Express response object
 * @param strategy Cache strategy to apply
 * @param options Additional cache options
 */
function setCacheHeaders(res, strategy, options = {}) {
    const { revalidate = false, maxAge, isPrivate = false } = options;
    const duration = maxAge ?? CACHE_DURATIONS[strategy];
    if (strategy === CacheStrategy.NO_CACHE) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        return;
    }
    const cacheControl = [];
    // Public or private
    cacheControl.push(isPrivate ? 'private' : 'public');
    // Max age
    if (duration > 0) {
        cacheControl.push(`max-age=${duration}`);
    }
    // Revalidation
    if (revalidate) {
        // Allow serving stale content while revalidating (stale-while-revalidate)
        cacheControl.push('stale-while-revalidate=86400'); // 1 day
        cacheControl.push('must-revalidate');
    }
    // Immutable for versioned assets
    if (strategy === CacheStrategy.IMMUTABLE) {
        cacheControl.push('immutable');
    }
    res.setHeader('Cache-Control', cacheControl.join(', '));
    // Set Expires header for older browsers
    if (duration > 0) {
        const expiresDate = new Date(Date.now() + duration * 1000);
        res.setHeader('Expires', expiresDate.toUTCString());
    }
}
/**
 * Sets ETag header for conditional requests
 * @param res Express response object
 * @param etag ETag value (usually a hash of the content)
 */
function setETag(res, etag) {
    res.setHeader('ETag', `"${etag}"`);
}
/**
 * Sets Last-Modified header
 * @param res Express response object
 * @param date Last modified date
 */
function setLastModified(res, date) {
    res.setHeader('Last-Modified', date.toUTCString());
}
/**
 * Checks if the request has a valid conditional header (If-None-Match or If-Modified-Since)
 * Returns true if the resource hasn't changed (304 Not Modified)
 * @param req Express request object
 * @param res Express response object
 * @param etag Current ETag value
 * @param lastModified Last modified date
 * @returns true if resource hasn't changed, false otherwise
 */
function checkConditionalRequest(req, res, etag, lastModified) {
    // Check ETag (If-None-Match)
    if (etag) {
        const ifNoneMatch = req.get('If-None-Match');
        if (ifNoneMatch && ifNoneMatch === `"${etag}"`) {
            res.status(304).end();
            return true;
        }
    }
    // Check Last-Modified (If-Modified-Since)
    if (lastModified) {
        const ifModifiedSince = req.get('If-Modified-Since');
        if (ifModifiedSince) {
            const ifModifiedSinceDate = new Date(ifModifiedSince);
            if (lastModified <= ifModifiedSinceDate) {
                res.status(304).end();
                return true;
            }
        }
    }
    return false;
}
/**
 * Generates an ETag from data (simple hash)
 * @param data Data to generate ETag from
 * @returns ETag string
 */
function generateETag(data) {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
}
//# sourceMappingURL=cache-headers.util.js.map