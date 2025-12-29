"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All upload routes require authentication and admin role
router.use(auth_middleware_1.authenticate);
router.use((0, auth_middleware_1.authorize)('ADMIN'));
// Upload routes
router.post('/single', upload_controller_1.uploadSingle);
router.post('/multiple', upload_controller_1.uploadMultiple);
exports.default = router;
//# sourceMappingURL=upload.routes.js.map