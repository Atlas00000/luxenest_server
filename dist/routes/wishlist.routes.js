"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_controller_1 = require("../controllers/wishlist.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const wishlist_validation_1 = require("../validations/wishlist.validation");
const router = (0, express_1.Router)();
// All wishlist routes require authentication
router.use(auth_middleware_1.authenticate);
// Wishlist routes
router.get('/', wishlist_controller_1.getWishlistController);
router.get('/items/:productId/check', (0, validate_middleware_1.validate)(wishlist_validation_1.productIdParamSchema), wishlist_controller_1.checkWishlistItemController);
router.post('/items/:productId', (0, validate_middleware_1.validate)(wishlist_validation_1.productIdParamSchema), wishlist_controller_1.addWishlistItemController);
router.delete('/items/:productId', (0, validate_middleware_1.validate)(wishlist_validation_1.productIdParamSchema), wishlist_controller_1.removeWishlistItemController);
exports.default = router;
//# sourceMappingURL=wishlist.routes.js.map