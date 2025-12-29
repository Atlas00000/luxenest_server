"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_validation_1 = require("../validations/auth.validation");
const router = (0, express_1.Router)();
// All user routes require authentication
router.use(auth_middleware_1.authenticate);
// Get current user profile
router.get('/me', user_controller_1.getCurrentUser);
// Update user profile
router.patch('/me', (0, validate_middleware_1.validate)(auth_validation_1.updateProfileSchema), user_controller_1.updateProfileController);
// Change password
router.patch('/me/password', (0, validate_middleware_1.validate)(auth_validation_1.changePasswordSchema), user_controller_1.changePasswordController);
exports.default = router;
//# sourceMappingURL=user.routes.js.map