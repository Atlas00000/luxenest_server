import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../types';
/**
 * Get current user profile
 */
export declare const getCurrentUser: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update user profile
 */
export declare const updateProfileController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Change user password
 */
export declare const changePasswordController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map