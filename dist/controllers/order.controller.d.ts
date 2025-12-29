import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../types';
/**
 * Create order from cart
 */
export declare const createOrderController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get user's orders
 */
export declare const getUserOrdersController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get single order by ID
 */
export declare const getOrderByIdController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update order status (admin only)
 */
export declare const updateOrderStatusController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=order.controller.d.ts.map