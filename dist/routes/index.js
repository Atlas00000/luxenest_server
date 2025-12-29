"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_response_1 = require("../utils/api-response");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const cart_routes_1 = __importDefault(require("./cart.routes"));
const wishlist_routes_1 = __importDefault(require("./wishlist.routes"));
const review_routes_1 = __importDefault(require("./review.routes"));
const room_routes_1 = __importDefault(require("./room.routes"));
const recommendation_routes_1 = __importDefault(require("./recommendation.routes"));
const order_routes_1 = __importDefault(require("./order.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const upload_routes_1 = __importDefault(require("./upload.routes"));
const router = (0, express_1.Router)();
// Root API endpoint
router.get('/', (_req, res) => {
    (0, api_response_1.sendSuccess)(res, {
        name: 'LuxeNest API',
        version: '1.0.0',
        description: 'Premium Home Decor E-Commerce Platform API',
    }, 'Welcome to LuxeNest API');
});
// Auth routes
router.use('/auth', auth_routes_1.default);
// User routes
router.use('/users', user_routes_1.default);
// Product routes
router.use('/products', product_routes_1.default);
// Category routes
router.use('/categories', category_routes_1.default);
// Cart routes
router.use('/cart', cart_routes_1.default);
// Wishlist routes
router.use('/wishlist', wishlist_routes_1.default);
// Review routes
router.use('/', review_routes_1.default);
// Room routes
router.use('/rooms', room_routes_1.default);
// Recommendation routes
router.use('/', recommendation_routes_1.default);
// Order routes
router.use('/orders', order_routes_1.default);
// Admin routes
router.use('/admin', admin_routes_1.default);
// Upload routes
router.use('/upload', upload_routes_1.default);
// Placeholder routes - will be implemented in subsequent weeks
// router.use('/cart', cartRoutes);
// router.use('/wishlist', wishlistRoutes);
// router.use('/orders', orderRoutes);
// router.use('/reviews', reviewRoutes);
// router.use('/rooms', roomRoutes);
// router.use('/admin', adminRoutes);
exports.default = router;
//# sourceMappingURL=index.js.map