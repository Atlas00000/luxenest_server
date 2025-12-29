"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const cache_middleware_1 = require("../middleware/cache.middleware");
const category_validation_1 = require("../validations/category.validation");
const router = (0, express_1.Router)();
// Public routes with cache headers (medium cache with revalidation)
router.get('/', cache_middleware_1.cacheMiddlewares.medium, category_controller_1.getCategoriesController);
router.get('/slug/:slug', cache_middleware_1.cacheMiddlewares.medium, (0, validate_middleware_1.validate)(category_validation_1.categorySlugSchema), category_controller_1.getCategoryBySlugController);
router.get('/:id', cache_middleware_1.cacheMiddlewares.medium, (0, validate_middleware_1.validate)(category_validation_1.categoryIdSchema), category_controller_1.getCategoryByIdController);
// Admin routes (require authentication and admin role)
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), (0, validate_middleware_1.validate)(category_validation_1.createCategorySchema), category_controller_1.createCategoryController);
router.patch('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), (0, validate_middleware_1.validate)(category_validation_1.categoryIdSchema), (0, validate_middleware_1.validate)(category_validation_1.updateCategorySchema), category_controller_1.updateCategoryController);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), (0, validate_middleware_1.validate)(category_validation_1.categoryIdSchema), category_controller_1.deleteCategoryController);
exports.default = router;
//# sourceMappingURL=category.routes.js.map