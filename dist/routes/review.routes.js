"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const cache_middleware_1 = require("../middleware/cache.middleware");
const review_validation_1 = require("../validations/review.validation");
const router = (0, express_1.Router)();
// Get reviews for a product (public) - short cache since reviews can change
router.get('/products/:id/reviews', cache_middleware_1.cacheMiddlewares.short, (0, validate_middleware_1.validate)(review_validation_1.productIdParamSchema), (0, validate_middleware_1.validate)(review_validation_1.getReviewsQuerySchema), review_controller_1.getProductReviewsController);
// Get user's review for a product (authenticated)
router.get('/products/:id/reviews/me', auth_middleware_1.authenticate, (0, validate_middleware_1.validate)(review_validation_1.productIdParamSchema), review_controller_1.getUserReviewController);
// Create review (authenticated)
router.post('/products/:id/reviews', auth_middleware_1.authenticate, (0, validate_middleware_1.validate)(review_validation_1.productIdParamSchema), (0, validate_middleware_1.validate)(review_validation_1.createReviewSchema), review_controller_1.createReviewController);
// Mark review as helpful (public, but can be authenticated later for tracking)
router.patch('/reviews/:id/helpful', (0, validate_middleware_1.validate)(review_validation_1.reviewIdParamSchema), review_controller_1.markReviewHelpfulController);
exports.default = router;
//# sourceMappingURL=review.routes.js.map