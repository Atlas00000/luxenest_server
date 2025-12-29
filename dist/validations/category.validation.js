"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySlugSchema = exports.categoryIdSchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
// Create category validation
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().url('Invalid image URL'),
        slug: zod_1.z.string().min(2, 'Slug must be at least 2 characters').max(100, 'Slug must be less than 100 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
        featured: zod_1.z.boolean().optional(),
    }),
});
// Update category validation
exports.updateCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100).optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().url().optional(),
        slug: zod_1.z.string().min(2).max(100).regex(/^[a-z0-9-]+$/).optional(),
        featured: zod_1.z.boolean().optional(),
    }),
});
// Category ID param validation
exports.categoryIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid category ID'),
    }),
});
// Category slug param validation
exports.categorySlugSchema = zod_1.z.object({
    params: zod_1.z.object({
        slug: zod_1.z.string().min(1, 'Slug is required'),
    }),
});
//# sourceMappingURL=category.validation.js.map