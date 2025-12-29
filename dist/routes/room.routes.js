"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_controller_1 = require("../controllers/room.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const cache_middleware_1 = require("../middleware/cache.middleware");
const zod_1 = require("zod");
const roomIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid room ID'),
    }),
});
const router = (0, express_1.Router)();
// Public routes with cache headers (medium cache with revalidation)
router.get('/', cache_middleware_1.cacheMiddlewares.medium, room_controller_1.getRoomsController);
router.get('/:id', cache_middleware_1.cacheMiddlewares.medium, (0, validate_middleware_1.validate)(roomIdSchema), room_controller_1.getRoomByIdController);
exports.default = router;
//# sourceMappingURL=room.routes.js.map