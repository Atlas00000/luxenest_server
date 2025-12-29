"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrendingProductsController = exports.getUserRecommendationsController = exports.getProductRecommendationsController = void 0;
const recommendation_service_1 = require("../services/recommendation.service");
const api_response_1 = require("../utils/api-response");
/**
 * Get product recommendations
 */
const getProductRecommendationsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 8;
        const recommendations = await (0, recommendation_service_1.getProductRecommendations)(id, limit);
        (0, api_response_1.sendSuccess)(res, recommendations, 'Recommendations retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getProductRecommendationsController = getProductRecommendationsController;
/**
 * Get user recommendations
 */
const getUserRecommendationsController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 8;
        const recommendations = await (0, recommendation_service_1.getUserRecommendations)(userId, limit);
        (0, api_response_1.sendSuccess)(res, recommendations, 'User recommendations retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getUserRecommendationsController = getUserRecommendationsController;
/**
 * Get trending products
 */
const getTrendingProductsController = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 8;
        const products = await (0, recommendation_service_1.getTrendingProducts)(limit);
        (0, api_response_1.sendSuccess)(res, products, 'Trending products retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getTrendingProductsController = getTrendingProductsController;
//# sourceMappingURL=recommendation.controller.js.map