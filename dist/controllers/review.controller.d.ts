import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../types';
/**
 * Get reviews for a product
 */
export declare const getProductReviewsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create review for a product
 */
export declare const createReviewController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Mark review as helpful
 */
export declare const markReviewHelpfulController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get user's review for a product
 */
export declare const getUserReviewController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=review.controller.d.ts.map