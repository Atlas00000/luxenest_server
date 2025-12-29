"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCartController = exports.removeCartItemController = exports.updateCartItemController = exports.addCartItemController = exports.getCartController = void 0;
const cart_service_1 = require("../services/cart.service");
const api_response_1 = require("../utils/api-response");
/**
 * Get user's cart
 */
const getCartController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await (0, cart_service_1.getCart)(userId);
        (0, api_response_1.sendSuccess)(res, cart, 'Cart retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getCartController = getCartController;
/**
 * Add item to cart
 */
const addCartItemController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cartItem = await (0, cart_service_1.addCartItem)(userId, req.body);
        (0, api_response_1.sendSuccess)(res, cartItem, 'Item added to cart successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.addCartItemController = addCartItemController;
/**
 * Update cart item quantity
 */
const updateCartItemController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const cartItem = await (0, cart_service_1.updateCartItem)(userId, productId, req.body);
        (0, api_response_1.sendSuccess)(res, cartItem, 'Cart item updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateCartItemController = updateCartItemController;
/**
 * Remove item from cart
 */
const removeCartItemController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        await (0, cart_service_1.removeCartItem)(userId, productId);
        (0, api_response_1.sendSuccess)(res, null, 'Item removed from cart successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.removeCartItemController = removeCartItemController;
/**
 * Clear cart
 */
const clearCartController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        await (0, cart_service_1.clearCart)(userId);
        (0, api_response_1.sendSuccess)(res, null, 'Cart cleared successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.clearCartController = clearCartController;
//# sourceMappingURL=cart.controller.js.map