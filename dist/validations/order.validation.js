"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersQuerySchema = exports.orderIdParamSchema = exports.updateOrderStatusSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
// Shipping address validation
const shippingAddressSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name must be less than 100 characters'),
    address: zod_1.z.string().min(5, 'Address must be at least 5 characters').max(200, 'Address must be less than 200 characters'),
    city: zod_1.z.string().min(2, 'City must be at least 2 characters').max(100, 'City must be less than 100 characters'),
    state: zod_1.z.string().min(2, 'State must be at least 2 characters').max(100, 'State must be less than 100 characters'),
    zipCode: zod_1.z.string().min(5, 'Zip code must be at least 5 characters').max(10, 'Zip code must be less than 10 characters'),
    country: zod_1.z.string().min(2, 'Country must be at least 2 characters').max(100, 'Country must be less than 100 characters'),
    phone: zod_1.z.string().optional(),
});
// Create order validation
exports.createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        shippingAddress: shippingAddressSchema,
        paymentMethod: zod_1.z.string().min(1, 'Payment method is required'),
    }),
});
// Update order status validation
exports.updateOrderStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'], {
            errorMap: () => ({ message: 'Invalid order status' }),
        }),
    }),
});
// Order ID param validation
exports.orderIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid order ID'),
    }),
});
// Get orders query validation
exports.getOrdersQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
        limit: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    }),
});
//# sourceMappingURL=order.validation.js.map