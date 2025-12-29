"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserReview = exports.markReviewHelpful = exports.createReview = exports.getProductReviews = void 0;
const database_1 = __importDefault(require("../config/database"));
const api_error_1 = require("../utils/api-error");
/**
 * Get reviews for a product
 */
const getProductReviews = async (productId, page = 1, limit = 10) => {
    // Validate product exists
    const product = await database_1.default.product.findUnique({
        where: { id: productId },
    });
    if (!product) {
        throw new api_error_1.NotFoundError('Product not found');
    }
    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
        database_1.default.review.findMany({
            where: { productId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
            orderBy: [
                { helpful: 'desc' },
                { createdAt: 'desc' },
            ],
            skip,
            take: limit,
        }),
        database_1.default.review.count({
            where: { productId },
        }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
        reviews,
        meta: {
            page,
            limit,
            total,
            totalPages,
        },
    };
};
exports.getProductReviews = getProductReviews;
/**
 * Create review for a product
 */
const createReview = async (userId, productId, data) => {
    // Validate product exists
    const product = await database_1.default.product.findUnique({
        where: { id: productId },
    });
    if (!product) {
        throw new api_error_1.NotFoundError('Product not found');
    }
    // Check if user already reviewed this product
    const existingReview = await database_1.default.review.findUnique({
        where: {
            productId_userId: {
                productId,
                userId,
            },
        },
    });
    if (existingReview) {
        throw new api_error_1.ConflictError('You have already reviewed this product');
    }
    // Validate rating
    if (data.rating < 1 || data.rating > 5) {
        throw new api_error_1.BadRequestError('Rating must be between 1 and 5');
    }
    // Create review
    const review = await database_1.default.review.create({
        data: {
            productId,
            userId,
            rating: data.rating,
            title: data.title,
            comment: data.comment,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                },
            },
        },
    });
    // Update product rating and review count
    await updateProductRating(productId);
    return review;
};
exports.createReview = createReview;
/**
 * Update product rating based on all reviews
 */
const updateProductRating = async (productId) => {
    const reviews = await database_1.default.review.findMany({
        where: { productId },
        select: { rating: true },
    });
    if (reviews.length === 0) {
        await database_1.default.product.update({
            where: { id: productId },
            data: {
                rating: 0,
                reviewsCount: 0,
            },
        });
        return;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    await database_1.default.product.update({
        where: { id: productId },
        data: {
            rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
            reviewsCount: reviews.length,
        },
    });
};
/**
 * Mark review as helpful
 */
const markReviewHelpful = async (reviewId) => {
    const review = await database_1.default.review.findUnique({
        where: { id: reviewId },
    });
    if (!review) {
        throw new api_error_1.NotFoundError('Review not found');
    }
    const updatedReview = await database_1.default.review.update({
        where: { id: reviewId },
        data: {
            helpful: {
                increment: 1,
            },
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                },
            },
        },
    });
    return updatedReview;
};
exports.markReviewHelpful = markReviewHelpful;
/**
 * Get user's review for a product
 */
const getUserReview = async (userId, productId) => {
    const review = await database_1.default.review.findUnique({
        where: {
            productId_userId: {
                productId,
                userId,
            },
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                },
            },
        },
    });
    if (!review) {
        throw new api_error_1.NotFoundError('Review not found');
    }
    return review;
};
exports.getUserReview = getUserReview;
//# sourceMappingURL=review.service.js.map