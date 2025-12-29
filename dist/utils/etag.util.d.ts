import { Request, Response } from 'express';
/**
 * Adds ETag support to a response handler
 * Checks If-None-Match header and returns 304 if content hasn't changed
 * @param req Express request object
 * @param res Express response object
 * @param data Data to generate ETag from
 * @returns true if 304 was sent (content unchanged), false otherwise
 */
export declare function handleETag(req: Request, res: Response, data: any): boolean;
/**
 * Wraps a controller function to add ETag support
 * @param controller Controller function
 * @returns Wrapped controller with ETag support
 */
export declare function withETag<T extends (...args: any[]) => Promise<any>>(controller: T): T;
//# sourceMappingURL=etag.util.d.ts.map