"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const cache_middleware_1 = require("../middleware/cache.middleware");
const product_validation_1 = require("../validations/product.validation");
const router = (0, express_1.Router)();
// Public routes with cache headers (medium cache with revalidation)
router.get('/', cache_middleware_1.cacheMiddlewares.medium, (0, validate_middleware_1.validate)(product_validation_1.getProductsQuerySchema), product_controller_1.getProductsController);
router.get('/featured', cache_middleware_1.cacheMiddlewares.medium, product_controller_1.getFeaturedProductsController);
router.get('/new', cache_middleware_1.cacheMiddlewares.medium, product_controller_1.getNewProductsController);
router.get('/sale', cache_middleware_1.cacheMiddlewares.medium, product_controller_1.getSaleProductsController);
router.get('/:id', cache_middleware_1.cacheMiddlewares.medium, (0, validate_middleware_1.validate)(product_validation_1.productIdSchema), product_controller_1.getProductByIdController);
// Admin routes (require authentication and admin role)
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), (0, validate_middleware_1.validate)(product_validation_1.createProductSchema), product_controller_1.createProductController);
router.patch('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), (0, validate_middleware_1.validate)(product_validation_1.productIdSchema), (0, validate_middleware_1.validate)(product_validation_1.updateProductSchema), product_controller_1.updateProductController);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN'), (0, validate_middleware_1.validate)(product_validation_1.productIdSchema), product_controller_1.deleteProductController);
exports.default = router;
//# sourceMappingURL=product.routes.js.map