"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productIdSchema = exports.updateProductSchema = exports.createProductSchema = exports.getProductsQuerySchema = void 0;
const zod_1 = require("zod");
// Get products query validation
exports.getProductsQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
        limit: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 20)),
        categoryId: zod_1.z.string().uuid().optional(),
        minPrice: zod_1.z.string().optional().transform((val) => (val ? parseFloat(val) : undefined)),
        maxPrice: zod_1.z.string().optional().transform((val) => (val ? parseFloat(val) : undefined)),
        inStock: zod_1.z.string().optional().transform((val) => val === 'true'),
        sustainable: zod_1.z.string().optional().transform((val) => val === 'true'),
        featured: zod_1.z.string().optional().transform((val) => val === 'true'),
        isNew: zod_1.z.string().optional().transform((val) => val === 'true'),
        onSale: zod_1.z.string().optional().transform((val) => val === 'true'),
        search: zod_1.z.string().optional(),
        sortBy: zod_1.z.enum(['name', 'price', 'rating', 'createdAt', 'reviewsCount']).optional(),
        sortOrder: zod_1.z.enum(['asc', 'desc']).optional(),
    }),
});
// Create product validation
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters').max(200, 'Name must be less than 200 characters'),
        description: zod_1.z.string().min(10, 'Description must be at least 10 characters'),
        price: zod_1.z.number().positive('Price must be positive'),
        images: zod_1.z.array(zod_1.z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
        categoryId: zod_1.z.string().uuid('Invalid category ID'),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        stock: zod_1.z.number().int().min(0, 'Stock cannot be negative'),
        featured: zod_1.z.boolean().optional(),
        isNew: zod_1.z.boolean().optional(),
        onSale: zod_1.z.boolean().optional(),
        discount: zod_1.z.number().int().min(0).max(100).optional(),
        sustainabilityScore: zod_1.z.number().int().min(0).max(5).optional(),
        colors: zod_1.z.array(zod_1.z.string()).optional(),
        sizes: zod_1.z.array(zod_1.z.string()).optional(),
        materials: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
// Update product validation
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(200).optional(),
        description: zod_1.z.string().min(10).optional(),
        price: zod_1.z.number().positive().optional(),
        images: zod_1.z.array(zod_1.z.string().url()).min(1).optional(),
        categoryId: zod_1.z.string().uuid().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        stock: zod_1.z.number().int().min(0).optional(),
        featured: zod_1.z.boolean().optional(),
        isNew: zod_1.z.boolean().optional(),
        onSale: zod_1.z.boolean().optional(),
        discount: zod_1.z.number().int().min(0).max(100).optional(),
        sustainabilityScore: zod_1.z.number().int().min(0).max(5).optional(),
        colors: zod_1.z.array(zod_1.z.string()).optional(),
        sizes: zod_1.z.array(zod_1.z.string()).optional(),
        materials: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
// Product ID param validation
exports.productIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid product ID'),
    }),
});
//# sourceMappingURL=product.validation.js.map