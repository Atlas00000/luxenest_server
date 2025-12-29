"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = exports.logoutController = exports.loginController = exports.registerController = void 0;
const auth_service_1 = require("../services/auth.service");
const api_response_1 = require("../utils/api-response");
/**
 * Register a new user
 */
const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const result = await (0, auth_service_1.register)({ name, email, password });
        (0, api_response_1.sendSuccess)(res, result, 'User registered successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.registerController = registerController;
/**
 * Login user
 */
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await (0, auth_service_1.login)({ email, password });
        (0, api_response_1.sendSuccess)(res, result, 'Login successful');
    }
    catch (error) {
        next(error);
    }
};
exports.loginController = loginController;
/**
 * Logout user
 */
const logoutController = async (req, res, next) => {
    try {
        if (req.user) {
            await (0, auth_service_1.logout)(req.user.id);
        }
        (0, api_response_1.sendSuccess)(res, null, 'Logout successful');
    }
    catch (error) {
        next(error);
    }
};
exports.logoutController = logoutController;
/**
 * Refresh access token
 */
const refreshTokenController = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const result = await (0, auth_service_1.refreshAccessToken)(refreshToken);
        (0, api_response_1.sendSuccess)(res, result, 'Token refreshed successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.refreshTokenController = refreshTokenController;
//# sourceMappingURL=auth.controller.js.map