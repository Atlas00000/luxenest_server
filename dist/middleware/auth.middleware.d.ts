import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../types';
/**
 * Authentication middleware - verifies JWT token and attaches user to request
 */
export declare const authenticate: (req: RequestWithUser, _res: Response, next: NextFunction) => Promise<void>;
/**
 * Optional authentication - doesn't fail if no token provided
 */
export declare const optionalAuthenticate: (req: RequestWithUser, _res: Response, next: NextFunction) => Promise<void>;
/**
 * Role-based authorization middleware
 */
export declare const authorize: (...roles: string[]) => (req: RequestWithUser, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map