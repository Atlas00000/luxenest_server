"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recommendation_controller_1 = require("../controllers/recommendation.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const zod_1 = require("zod");
const productIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid product ID'),
    }),
});
const router = (0, express_1.Router)();
// Public routes
router.get('/products/:id/recommendations', (0, validate_middleware_1.validate)(productIdSchema), recommendation_controller_1.getProductRecommendationsController);
router.get('/trending', recommendation_controller_1.getTrendingProductsController);
// Authenticated routes
router.get('/user/recommendations', auth_middleware_1.authenticate, recommendation_controller_1.getUserRecommendationsController);
exports.default = router;
//# sourceMappingURL=recommendation.routes.js.map