"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_validation_1 = require("../validations/auth.validation");
const router = (0, express_1.Router)();
// Public routes
router.post('/register', (0, validate_middleware_1.validate)(auth_validation_1.registerSchema), auth_controller_1.registerController);
router.post('/login', (0, validate_middleware_1.validate)(auth_validation_1.loginSchema), auth_controller_1.loginController);
router.post('/refresh', (0, validate_middleware_1.validate)(auth_validation_1.refreshTokenSchema), auth_controller_1.refreshTokenController);
// Protected routes
router.post('/logout', auth_middleware_1.authenticate, auth_controller_1.logoutController);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map