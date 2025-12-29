import { JwtPayload } from '../types';
/**
 * Generate access token
 */
export declare const generateAccessToken: (payload: JwtPayload) => string;
/**
 * Generate refresh token
 */
export declare const generateRefreshToken: (payload: JwtPayload) => string;
/**
 * Verify access token
 */
export declare const verifyAccessToken: (token: string) => JwtPayload;
/**
 * Verify refresh token
 */
export declare const verifyRefreshToken: (token: string) => JwtPayload;
/**
 * Decode token without verification (for debugging)
 */
export declare const decodeToken: (token: string) => JwtPayload | null;
//# sourceMappingURL=jwt.util.d.ts.map