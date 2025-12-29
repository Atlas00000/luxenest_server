import { Request, Response, NextFunction } from 'express';
import { CacheStrategy } from '../utils/cache-headers.util';
/**
 * Cache middleware factory - creates middleware with specific cache strategy
 * @param strategy Cache strategy to apply
 * @param options Additional cache options
 */
export declare function cacheMiddleware(strategy: CacheStrategy, options?: {
    revalidate?: boolean;
    maxAge?: number;
    isPrivate?: boolean;
}): (_req: Request, res: Response, next: NextFunction) => void;
/**
 * Predefined cache middlewares for common use cases
 */
export declare const cacheMiddlewares: {
    /** No caching - for dynamic/user-specific content */
    noCache: (_req: Request, res: Response, next: NextFunction) => void;
    /** Short cache (1 hour) - for frequently changing content */
    short: (_req: Request, res: Response, next: NextFunction) => void;
    /** Medium cache (1 day) - for moderately changing content */
    medium: (_req: Request, res: Response, next: NextFunction) => void;
    /** Long cache (1 week) - for static/semi-static content */
    long: (_req: Request, res: Response, next: NextFunction) => void;
    /** Very long cache (30 days) - for static assets */
    veryLong: (_req: Request, res: Response, next: NextFunction) => void;
    /** Immutable cache (1 year) - for versioned static assets */
    immutable: (_req: Request, res: Response, next: NextFunction) => void;
    /** Private cache (1 hour) - for user-specific content */
    privateShort: (_req: Request, res: Response, next: NextFunction) => void;
    /** Private cache (1 day) - for user-specific content */
    privateMedium: (_req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=cache.middleware.d.ts.map