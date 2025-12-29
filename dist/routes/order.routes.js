"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const order_validation_1 = require("../validations/order.validation");
const router = (0, express_1.Router)();
// All order routes require authentication
router.use(auth_middleware_1.authenticate);
// Order routes
router.post('/', (0, validate_middleware_1.validate)(order_validation_1.createOrderSchema), order_controller_1.createOrderController);
router.get('/', (0, validate_middleware_1.validate)(order_validation_1.getOrdersQuerySchema), order_controller_1.getUserOrdersController);
router.get('/:id', (0, validate_middleware_1.validate)(order_validation_1.orderIdParamSchema), order_controller_1.getOrderByIdController);
// Admin routes
router.patch('/:id/status', (0, auth_middleware_1.authorize)('ADMIN'), (0, validate_middleware_1.validate)(order_validation_1.orderIdParamSchema), (0, validate_middleware_1.validate)(order_validation_1.updateOrderStatusSchema), order_controller_1.updateOrderStatusController);
exports.default = router;
//# sourceMappingURL=order.routes.js.map