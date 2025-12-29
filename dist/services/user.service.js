"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmailAvailability = exports.changePassword = exports.updateProfile = exports.getUserById = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcrypt_util_1 = require("../utils/bcrypt.util");
const api_error_1 = require("../utils/api-error");
/**
 * Get user by ID
 */
const getUserById = async (userId) => {
    const user = await database_1.default.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
            emailVerified: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new api_error_1.NotFoundError('User not found');
    }
    return user;
};
exports.getUserById = getUserById;
/**
 * Update user profile
 */
const updateProfile = async (userId, data) => {
    const user = await database_1.default.user.update({
        where: { id: userId },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.avatar !== undefined && { avatar: data.avatar }),
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
            emailVerified: true,
            updatedAt: true,
        },
    });
    return user;
};
exports.updateProfile = updateProfile;
/**
 * Change user password
 */
const changePassword = async (data) => {
    // Get user with password
    const user = await database_1.default.user.findUnique({
        where: { id: data.userId },
        select: {
            id: true,
            password: true,
        },
    });
    if (!user) {
        throw new api_error_1.NotFoundError('User not found');
    }
    // Verify current password
    const isPasswordValid = await (0, bcrypt_util_1.comparePassword)(data.currentPassword, user.password);
    if (!isPasswordValid) {
        throw new api_error_1.UnauthorizedError('Current password is incorrect');
    }
    // Hash new password
    const hashedPassword = await (0, bcrypt_util_1.hashPassword)(data.newPassword);
    // Update password
    await database_1.default.user.update({
        where: { id: data.userId },
        data: {
            password: hashedPassword,
        },
    });
};
exports.changePassword = changePassword;
/**
 * Check if email is available
 */
const checkEmailAvailability = async (email) => {
    const user = await database_1.default.user.findUnique({
        where: { email: email.toLowerCase() },
    });
    return !user; // Return true if email is available (user doesn't exist)
};
exports.checkEmailAvailability = checkEmailAvailability;
//# sourceMappingURL=user.service.js.map