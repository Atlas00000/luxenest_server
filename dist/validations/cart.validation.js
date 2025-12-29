"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productIdParamSchema = exports.updateCartItemSchema = exports.addCartItemSchema = void 0;
const zod_1 = require("zod");
// Add cart item validation
exports.addCartItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().uuid('Invalid product ID'),
        quantity: zod_1.z.number().int().min(1, 'Quantity must be at least 1').max(10, 'Maximum quantity is 10'),
    }),
});
// Update cart item validation
exports.updateCartItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        quantity: zod_1.z.number().int().min(1, 'Quantity must be at least 1').max(10, 'Maximum quantity is 10'),
    }),
});
// Product ID param validation
exports.productIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        productId: zod_1.z.string().uuid('Invalid product ID'),
    }),
});
//# sourceMappingURL=cart.validation.js.map