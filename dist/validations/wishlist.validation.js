"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productIdParamSchema = void 0;
const zod_1 = require("zod");
// Product ID param validation
exports.productIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        productId: zod_1.z.string().uuid('Invalid product ID'),
    }),
});
//# sourceMappingURL=wishlist.validation.js.map