import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../types';
/**
 * Register a new user
 */
export declare const registerController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Login user
 */
export declare const loginController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Logout user
 */
export declare const logoutController: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
/**
 * Refresh access token
 */
export declare const refreshTokenController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map