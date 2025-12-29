"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminProductsController = exports.getAdminUsersController = exports.getAdminOrdersController = exports.getAdminStatsController = void 0;
const admin_service_1 = require("../services/admin.service");
const api_response_1 = require("../utils/api-response");
/**
 * Get admin dashboard statistics
 */
const getAdminStatsController = async (req, res, next) => {
    try {
        const dateRange = req.query.dateRange || '30d';
        const stats = await (0, admin_service_1.getAdminStats)(dateRange);
        (0, api_response_1.sendSuccess)(res, stats, 'Admin statistics retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getAdminStatsController = getAdminStatsController;
/**
 * Get all orders for admin
 */
const getAdminOrdersController = async (req, res, next) => {
    try {
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const status = req.query.status;
        const startDate = req.query.startDate ? new Date(req.query.startDate) : undefined;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : undefined;
        const result = await (0, admin_service_1.getAdminOrders)(page, limit, status, startDate, endDate);
        (0, api_response_1.sendPaginated)(res, result.orders, result.meta, 'Orders retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getAdminOrdersController = getAdminOrdersController;
/**
 * Get all users for admin
 */
const getAdminUsersController = async (req, res, next) => {
    try {
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const search = req.query.search;
        const result = await (0, admin_service_1.getAdminUsers)(page, limit, search);
        (0, api_response_1.sendPaginated)(res, result.users, result.meta, 'Users retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getAdminUsersController = getAdminUsersController;
/**
 * Get all products for admin
 */
const getAdminProductsController = async (req, res, next) => {
    try {
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const search = req.query.search;
        const lowStock = req.query.lowStock === 'true';
        const result = await (0, admin_service_1.getAdminProducts)(page, limit, search, lowStock);
        (0, api_response_1.sendPaginated)(res, result.products, result.meta, 'Products retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getAdminProductsController = getAdminProductsController;
//# sourceMappingURL=admin.controller.js.map