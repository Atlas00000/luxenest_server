import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../types';
/**
 * Get user's wishlist
 */
export declare const getWishlistController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Add item to wishlist
 */
export declare const addWishlistItemController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Remove item from wishlist
 */
export declare const removeWishlistItemController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Check if product is in wishlist
 */
export declare const checkWishlistItemController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=wishlist.controller.d.ts.map