"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrendingProducts = exports.getUserRecommendations = exports.getProductRecommendations = void 0;
const database_1 = __importDefault(require("../config/database"));
const api_error_1 = require("../utils/api-error");
/**
 * Get product recommendations based on category and similar products
 */
const getProductRecommendations = async (productId, limit = 8) => {
    // Get the product
    const product = await database_1.default.product.findUnique({
        where: { id: productId },
        include: {
            category: true,
        },
    });
    if (!product) {
        throw new api_error_1.NotFoundError('Product not found');
    }
    // Get products from the same category
    const sameCategoryProducts = await database_1.default.product.findMany({
        where: {
            categoryId: product.categoryId,
            id: { not: productId },
            stock: { gt: 0 },
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
        orderBy: [
            { featured: 'desc' },
            { rating: 'desc' },
            { reviewsCount: 'desc' },
        ],
        take: limit,
    });
    // If we don't have enough products from the same category, get featured products
    if (sameCategoryProducts.length < limit) {
        const featuredProducts = await database_1.default.product.findMany({
            where: {
                id: { not: productId },
                featured: true,
                stock: { gt: 0 },
                categoryId: { not: product.categoryId }, // Don't include same category
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
            orderBy: [
                { rating: 'desc' },
                { reviewsCount: 'desc' },
            ],
            take: limit - sameCategoryProducts.length,
        });
        return [...sameCategoryProducts, ...featuredProducts];
    }
    return sameCategoryProducts;
};
exports.getProductRecommendations = getProductRecommendations;
/**
 * Get recommendations based on user's purchase history (for future implementation)
 */
const getUserRecommendations = async (userId, limit = 8) => {
    // Get user's order history
    const orders = await database_1.default.order.findMany({
        where: {
            userId,
            status: { not: 'CANCELLED' },
        },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
        take: 10,
        orderBy: {
            createdAt: 'desc',
        },
    });
    // Extract categories from purchased products
    const purchasedCategories = new Set();
    orders.forEach((order) => {
        order.items.forEach((item) => {
            purchasedCategories.add(item.product.categoryId);
        });
    });
    // Get products from purchased categories
    const recommendations = await database_1.default.product.findMany({
        where: {
            categoryId: { in: Array.from(purchasedCategories) },
            stock: { gt: 0 },
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
        orderBy: [
            { featured: 'desc' },
            { rating: 'desc' },
            { reviewsCount: 'desc' },
        ],
        take: limit,
    });
    // If not enough recommendations, add featured products
    if (recommendations.length < limit) {
        const featuredProducts = await database_1.default.product.findMany({
            where: {
                featured: true,
                stock: { gt: 0 },
                categoryId: { notIn: Array.from(purchasedCategories) },
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
            orderBy: [
                { rating: 'desc' },
                { reviewsCount: 'desc' },
            ],
            take: limit - recommendations.length,
        });
        return [...recommendations, ...featuredProducts];
    }
    return recommendations;
};
exports.getUserRecommendations = getUserRecommendations;
/**
 * Get trending products (based on reviews and sales)
 */
const getTrendingProducts = async (limit = 8) => {
    return database_1.default.product.findMany({
        where: {
            stock: { gt: 0 },
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
        orderBy: [
            { reviewsCount: 'desc' },
            { rating: 'desc' },
            { createdAt: 'desc' },
        ],
        take: limit,
    });
};
exports.getTrendingProducts = getTrendingProducts;
//# sourceMappingURL=recommendation.service.js.map