"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusController = exports.getOrderByIdController = exports.getUserOrdersController = exports.createOrderController = void 0;
const order_service_1 = require("../services/order.service");
const api_response_1 = require("../utils/api-response");
/**
 * Create order from cart
 */
const createOrderController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const order = await (0, order_service_1.createOrder)(userId, req.body);
        (0, api_response_1.sendSuccess)(res, order, 'Order created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createOrderController = createOrderController;
/**
 * Get user's orders
 */
const getUserOrdersController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        const result = await (0, order_service_1.getUserOrders)(userId, page, limit);
        (0, api_response_1.sendPaginated)(res, result.orders, result.meta, 'Orders retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getUserOrdersController = getUserOrdersController;
/**
 * Get single order by ID
 */
const getOrderByIdController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const order = await (0, order_service_1.getOrderById)(userId, id);
        (0, api_response_1.sendSuccess)(res, order, 'Order retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getOrderByIdController = getOrderByIdController;
/**
 * Update order status (admin only)
 */
const updateOrderStatusController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await (0, order_service_1.updateOrderStatus)(id, status);
        (0, api_response_1.sendSuccess)(res, order, 'Order status updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateOrderStatusController = updateOrderStatusController;
//# sourceMappingURL=order.controller.js.map