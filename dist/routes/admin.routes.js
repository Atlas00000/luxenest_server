"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All admin routes require authentication and admin role
router.use(auth_middleware_1.authenticate);
router.use((0, auth_middleware_1.authorize)('ADMIN'));
// Admin routes
router.get('/stats', admin_controller_1.getAdminStatsController);
router.get('/orders', admin_controller_1.getAdminOrdersController);
router.get('/users', admin_controller_1.getAdminUsersController);
router.get('/products', admin_controller_1.getAdminProductsController);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map