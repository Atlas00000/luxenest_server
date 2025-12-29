import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../types';
/**
 * Get user's cart
 */
export declare const getCartController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Add item to cart
 */
export declare const addCartItemController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update cart item quantity
 */
export declare const updateCartItemController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Remove item from cart
 */
export declare const removeCartItemController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Clear cart
 */
export declare const clearCartController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=cart.controller.d.ts.map