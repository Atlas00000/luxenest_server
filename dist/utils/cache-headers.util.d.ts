import { Response } from 'express';
/**
 * Cache strategies for different content types
 */
export declare enum CacheStrategy {
    /** No caching - for dynamic/user-specific content */
    NO_CACHE = "no-cache",
    /** Short cache - for frequently changing content (1 hour) */
    SHORT = "short",
    /** Medium cache - for moderately changing content (1 day) */
    MEDIUM = "medium",
    /** Long cache - for static/semi-static content (1 week) */
    LONG = "long",
    /** Very long cache - for static assets (1 month) */
    VERY_LONG = "very-long",
    /** Immutable - for versioned static assets */
    IMMUTABLE = "immutable"
}
/**
 * Sets cache headers on the response based on the strategy
 * @param res Express response object
 * @param strategy Cache strategy to apply
 * @param options Additional cache options
 */
export declare function setCacheHeaders(res: Response, strategy: CacheStrategy, options?: {
    /** Whether to allow revalidation (stale-while-revalidate) */
    revalidate?: boolean;
    /** Custom max-age in seconds (overrides strategy default) */
    maxAge?: number;
    /** Whether this is a private cache (user-specific) */
    isPrivate?: boolean;
}): void;
/**
 * Sets ETag header for conditional requests
 * @param res Express response object
 * @param etag ETag value (usually a hash of the content)
 */
export declare function setETag(res: Response, etag: string): void;
/**
 * Sets Last-Modified header
 * @param res Express response object
 * @param date Last modified date
 */
export declare function setLastModified(res: Response, date: Date): void;
/**
 * Checks if the request has a valid conditional header (If-None-Match or If-Modified-Since)
 * Returns true if the resource hasn't changed (304 Not Modified)
 * @param req Express request object
 * @param res Express response object
 * @param etag Current ETag value
 * @param lastModified Last modified date
 * @returns true if resource hasn't changed, false otherwise
 */
export declare function checkConditionalRequest(req: any, res: Response, etag?: string, lastModified?: Date): boolean;
/**
 * Generates an ETag from data (simple hash)
 * @param data Data to generate ETag from
 * @returns ETag string
 */
export declare function generateETag(data: any): string;
//# sourceMappingURL=cache-headers.util.d.ts.map