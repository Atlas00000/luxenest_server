"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const cart_validation_1 = require("../validations/cart.validation");
const router = (0, express_1.Router)();
// All cart routes require authentication
router.use(auth_middleware_1.authenticate);
// Cart routes
router.get('/', cart_controller_1.getCartController);
router.post('/items', (0, validate_middleware_1.validate)(cart_validation_1.addCartItemSchema), cart_controller_1.addCartItemController);
router.patch('/items/:productId', (0, validate_middleware_1.validate)(cart_validation_1.productIdParamSchema), (0, validate_middleware_1.validate)(cart_validation_1.updateCartItemSchema), cart_controller_1.updateCartItemController);
router.delete('/items/:productId', (0, validate_middleware_1.validate)(cart_validation_1.productIdParamSchema), cart_controller_1.removeCartItemController);
router.delete('/', cart_controller_1.clearCartController);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map