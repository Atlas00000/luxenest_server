import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../types';
/**
 * Get product recommendations
 */
export declare const getProductRecommendationsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get user recommendations
 */
export declare const getUserRecommendationsController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get trending products
 */
export declare const getTrendingProductsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=recommendation.controller.d.ts.map