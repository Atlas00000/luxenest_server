"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserReviewController = exports.markReviewHelpfulController = exports.createReviewController = exports.getProductReviewsController = void 0;
const review_service_1 = require("../services/review.service");
const api_response_1 = require("../utils/api-response");
/**
 * Get reviews for a product
 */
const getProductReviewsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        const result = await (0, review_service_1.getProductReviews)(id, page, limit);
        (0, api_response_1.sendPaginated)(res, result.reviews, result.meta, 'Reviews retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getProductReviewsController = getProductReviewsController;
/**
 * Create review for a product
 */
const createReviewController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const review = await (0, review_service_1.createReview)(userId, id, req.body);
        (0, api_response_1.sendSuccess)(res, review, 'Review created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createReviewController = createReviewController;
/**
 * Mark review as helpful
 */
const markReviewHelpfulController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await (0, review_service_1.markReviewHelpful)(id);
        (0, api_response_1.sendSuccess)(res, review, 'Review marked as helpful');
    }
    catch (error) {
        next(error);
    }
};
exports.markReviewHelpfulController = markReviewHelpfulController;
/**
 * Get user's review for a product
 */
const getUserReviewController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const review = await (0, review_service_1.getUserReview)(userId, id);
        (0, api_response_1.sendSuccess)(res, review, 'User review retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getUserReviewController = getUserReviewController;
//# sourceMappingURL=review.controller.js.map