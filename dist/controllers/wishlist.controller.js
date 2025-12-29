"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWishlistItemController = exports.removeWishlistItemController = exports.addWishlistItemController = exports.getWishlistController = void 0;
const wishlist_service_1 = require("../services/wishlist.service");
const api_response_1 = require("../utils/api-response");
/**
 * Get user's wishlist
 */
const getWishlistController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const wishlist = await (0, wishlist_service_1.getWishlist)(userId);
        (0, api_response_1.sendSuccess)(res, wishlist, 'Wishlist retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getWishlistController = getWishlistController;
/**
 * Add item to wishlist
 */
const addWishlistItemController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const wishlistItem = await (0, wishlist_service_1.addWishlistItem)(userId, productId);
        (0, api_response_1.sendSuccess)(res, wishlistItem, 'Item added to wishlist successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.addWishlistItemController = addWishlistItemController;
/**
 * Remove item from wishlist
 */
const removeWishlistItemController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        await (0, wishlist_service_1.removeWishlistItem)(userId, productId);
        (0, api_response_1.sendSuccess)(res, null, 'Item removed from wishlist successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.removeWishlistItemController = removeWishlistItemController;
/**
 * Check if product is in wishlist
 */
const checkWishlistItemController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const inWishlist = await (0, wishlist_service_1.isInWishlist)(userId, productId);
        (0, api_response_1.sendSuccess)(res, { inWishlist }, 'Wishlist status retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.checkWishlistItemController = checkWishlistItemController;
//# sourceMappingURL=wishlist.controller.js.map