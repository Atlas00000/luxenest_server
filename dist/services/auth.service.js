"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.logout = exports.login = exports.register = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcrypt_util_1 = require("../utils/bcrypt.util");
const jwt_util_1 = require("../utils/jwt.util");
const api_error_1 = require("../utils/api-error");
const redis_1 = __importDefault(require("../config/redis"));
/**
 * Register a new user
 */
const register = async (data) => {
    // Check if user already exists
    const existingUser = await database_1.default.user.findUnique({
        where: { email: data.email.toLowerCase() },
    });
    if (existingUser) {
        throw new api_error_1.ConflictError('User with this email already exists');
    }
    // Hash password
    const hashedPassword = await (0, bcrypt_util_1.hashPassword)(data.password);
    // Create user
    const user = await database_1.default.user.create({
        data: {
            name: data.name,
            email: data.email.toLowerCase(),
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
        },
    });
    // Generate tokens
    const accessToken = (0, jwt_util_1.generateAccessToken)({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    const refreshToken = (0, jwt_util_1.generateRefreshToken)({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    // Store refresh token in Redis (optional, for token revocation)
    try {
        await redis_1.default.setEx(`refresh_token:${user.id}`, 7 * 24 * 60 * 60, // 7 days in seconds
        refreshToken);
    }
    catch (error) {
        console.warn('Failed to store refresh token in Redis:', error);
        // Non-critical, continue
    }
    return {
        user,
        accessToken,
        refreshToken,
    };
};
exports.register = register;
/**
 * Login user
 */
const login = async (data) => {
    // Find user by email
    const user = await database_1.default.user.findUnique({
        where: { email: data.email.toLowerCase() },
    });
    if (!user) {
        throw new api_error_1.UnauthorizedError('Invalid email or password');
    }
    // Verify password
    const isPasswordValid = await (0, bcrypt_util_1.comparePassword)(data.password, user.password);
    if (!isPasswordValid) {
        throw new api_error_1.UnauthorizedError('Invalid email or password');
    }
    // Generate tokens
    const accessToken = (0, jwt_util_1.generateAccessToken)({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    const refreshToken = (0, jwt_util_1.generateRefreshToken)({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    // Store refresh token in Redis
    try {
        await redis_1.default.setEx(`refresh_token:${user.id}`, 7 * 24 * 60 * 60, // 7 days in seconds
        refreshToken);
    }
    catch (error) {
        console.warn('Failed to store refresh token in Redis:', error);
    }
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        },
        accessToken,
        refreshToken,
    };
};
exports.login = login;
/**
 * Logout user (revoke refresh token)
 */
const logout = async (userId) => {
    try {
        // Remove refresh token from Redis
        await redis_1.default.del(`refresh_token:${userId}`);
    }
    catch (error) {
        console.warn('Failed to remove refresh token from Redis:', error);
    }
};
exports.logout = logout;
/**
 * Refresh access token using refresh token
 */
const refreshAccessToken = async (refreshToken) => {
    const { verifyRefreshToken } = await Promise.resolve().then(() => __importStar(require('../utils/jwt.util')));
    try {
        // Verify refresh token
        const decoded = verifyRefreshToken(refreshToken);
        // Check if token exists in Redis (optional validation)
        try {
            const storedToken = await redis_1.default.get(`refresh_token:${decoded.userId}`);
            if (storedToken !== refreshToken) {
                throw new api_error_1.UnauthorizedError('Invalid refresh token');
            }
        }
        catch (error) {
            // If Redis is unavailable, continue without validation
            console.warn('Redis unavailable, skipping token validation');
        }
        // Get user to ensure they still exist
        const user = await database_1.default.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                role: true,
            },
        });
        if (!user) {
            throw new api_error_1.NotFoundError('User not found');
        }
        // Generate new access token
        const accessToken = (0, jwt_util_1.generateAccessToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return { accessToken };
    }
    catch (error) {
        throw new api_error_1.UnauthorizedError('Invalid or expired refresh token');
    }
};
exports.refreshAccessToken = refreshAccessToken;
//# sourceMappingURL=auth.service.js.map