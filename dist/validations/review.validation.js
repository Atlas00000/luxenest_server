"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsQuerySchema = exports.reviewIdParamSchema = exports.productIdParamSchema = exports.createReviewSchema = void 0;
const zod_1 = require("zod");
// Create review validation
exports.createReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
        title: zod_1.z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title must be less than 200 characters'),
        comment: zod_1.z.string().min(10, 'Comment must be at least 10 characters').max(2000, 'Comment must be less than 2000 characters'),
    }),
});
// Product ID param validation
exports.productIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid product ID'),
    }),
});
// Review ID param validation
exports.reviewIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid review ID'),
    }),
});
// Get reviews query validation
exports.getReviewsQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
        limit: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    }),
});
//# sourceMappingURL=review.validation.js.map