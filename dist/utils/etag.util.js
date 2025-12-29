"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleETag = handleETag;
exports.withETag = withETag;
const cache_headers_util_1 = require("./cache-headers.util");
/**
 * Adds ETag support to a response handler
 * Checks If-None-Match header and returns 304 if content hasn't changed
 * @param req Express request object
 * @param res Express response object
 * @param data Data to generate ETag from
 * @returns true if 304 was sent (content unchanged), false otherwise
 */
function handleETag(req, res, data) {
    const etag = (0, cache_headers_util_1.generateETag)(data);
    // Check if client has matching ETag
    if ((0, cache_headers_util_1.checkConditionalRequest)(req, res, etag)) {
        return true; // 304 Not Modified already sent
    }
    // Set ETag for future requests
    (0, cache_headers_util_1.setETag)(res, etag);
    return false;
}
/**
 * Wraps a controller function to add ETag support
 * @param controller Controller function
 * @returns Wrapped controller with ETag support
 */
function withETag(controller) {
    return (async (...args) => {
        const [req, res, _next] = args;
        // Store original json method
        const originalJson = res.json.bind(res);
        // Override json to add ETag
        res.json = function (body) {
            // Generate ETag from response body
            const etag = (0, cache_headers_util_1.generateETag)(body);
            // Check conditional request
            if ((0, cache_headers_util_1.checkConditionalRequest)(req, res, etag)) {
                return res; // 304 already sent
            }
            // Set ETag header
            (0, cache_headers_util_1.setETag)(res, etag);
            // Call original json method
            return originalJson(body);
        };
        // Call original controller
        return controller(...args);
    });
}
//# sourceMappingURL=etag.util.js.map