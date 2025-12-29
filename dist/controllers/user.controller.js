"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = exports.updateProfileController = exports.getCurrentUser = void 0;
const user_service_1 = require("../services/user.service");
const api_response_1 = require("../utils/api-response");
/**
 * Get current user profile
 */
const getCurrentUser = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new Error('User not authenticated');
        }
        const user = await (0, user_service_1.getUserById)(req.user.id);
        (0, api_response_1.sendSuccess)(res, user, 'User profile retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getCurrentUser = getCurrentUser;
/**
 * Update user profile
 */
const updateProfileController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new Error('User not authenticated');
        }
        const { name, avatar } = req.body;
        const user = await (0, user_service_1.updateProfile)(req.user.id, { name, avatar });
        (0, api_response_1.sendSuccess)(res, user, 'Profile updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfileController = updateProfileController;
/**
 * Change user password
 */
const changePasswordController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new Error('User not authenticated');
        }
        const { currentPassword, newPassword } = req.body;
        await (0, user_service_1.changePassword)({
            userId: req.user.id,
            currentPassword,
            newPassword,
        });
        (0, api_response_1.sendSuccess)(res, null, 'Password changed successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.changePasswordController = changePasswordController;
//# sourceMappingURL=user.controller.js.map