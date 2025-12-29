"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.optionalAuthenticate = exports.authenticate = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const api_error_1 = require("../utils/api-error");
const database_1 = __importDefault(require("../config/database"));
/**
 * Authentication middleware - verifies JWT token and attaches user to request
 */
const authenticate = async (req, _res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new api_error_1.UnauthorizedError('No token provided');
        }
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        // Verify token
        const decoded = (0, jwt_util_1.verifyAccessToken)(token);
        // Get user from database
        const user = await database_1.default.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                avatar: true,
                emailVerified: true,
            },
        });
        if (!user) {
            throw new api_error_1.UnauthorizedError('User not found');
        }
        // Attach user to request
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        next();
    }
    catch (error) {
        if (error instanceof api_error_1.UnauthorizedError) {
            next(error);
        }
        else {
            next(new api_error_1.UnauthorizedError('Invalid or expired token'));
        }
    }
};
exports.authenticate = authenticate;
/**
 * Optional authentication - doesn't fail if no token provided
 */
const optionalAuthenticate = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const decoded = (0, jwt_util_1.verifyAccessToken)(token);
            const user = await database_1.default.user.findUnique({
                where: { id: decoded.userId },
                select: {
                    id: true,
                    email: true,
                    role: true,
                },
            });
            if (user) {
                req.user = {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                };
            }
        }
        next();
    }
    catch (error) {
        // Silently fail for optional auth
        next();
    }
};
exports.optionalAuthenticate = optionalAuthenticate;
/**
 * Role-based authorization middleware
 */
const authorize = (...roles) => {
    return (req, _res, next) => {
        if (!req.user) {
            throw new api_error_1.UnauthorizedError('Authentication required');
        }
        if (!roles.includes(req.user.role)) {
            throw new api_error_1.ForbiddenError('Insufficient permissions');
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map