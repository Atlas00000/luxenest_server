"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryBySlug = exports.getCategoryById = exports.getCategories = void 0;
const database_1 = __importDefault(require("../config/database"));
const api_error_1 = require("../utils/api-error");
const cache_util_1 = require("../utils/cache.util");
/**
 * Get all categories
 */
const getCategories = async (featuredOnly = false) => {
    const cacheKey = cache_util_1.CacheKeys.categories(featuredOnly);
    const cached = await (0, cache_util_1.getCache)(cacheKey);
    if (cached) {
        return cached;
    }
    const where = featuredOnly ? { featured: true } : {};
    const categories = await database_1.default.category.findMany({
        where,
        orderBy: { name: 'asc' },
        include: {
            _count: {
                select: { products: true },
            },
        },
    });
    await (0, cache_util_1.setCache)(cacheKey, categories, cache_util_1.CACHE_TTL.LONG);
    return categories;
};
exports.getCategories = getCategories;
/**
 * Get single category by ID
 */
const getCategoryById = async (id) => {
    const cacheKey = cache_util_1.CacheKeys.category(id);
    const cached = await (0, cache_util_1.getCache)(cacheKey);
    if (cached) {
        return cached;
    }
    const category = await database_1.default.category.findUnique({
        where: { id },
        include: {
            _count: {
                select: { products: true },
            },
        },
    });
    if (!category) {
        throw new api_error_1.NotFoundError('Category not found');
    }
    await (0, cache_util_1.setCache)(cacheKey, category, cache_util_1.CACHE_TTL.LONG);
    return category;
};
exports.getCategoryById = getCategoryById;
/**
 * Get category by slug
 */
const getCategoryBySlug = async (slug) => {
    const cacheKey = cache_util_1.CacheKeys.categoryBySlug(slug);
    const cached = await (0, cache_util_1.getCache)(cacheKey);
    if (cached) {
        return cached;
    }
    const category = await database_1.default.category.findUnique({
        where: { slug },
        include: {
            _count: {
                select: { products: true },
            },
        },
    });
    if (!category) {
        throw new api_error_1.NotFoundError('Category not found');
    }
    await (0, cache_util_1.setCache)(cacheKey, category, cache_util_1.CACHE_TTL.LONG);
    return category;
};
exports.getCategoryBySlug = getCategoryBySlug;
/**
 * Create new category (admin only)
 */
const createCategory = async (data) => {
    // Check if category with same name exists
    const existingCategory = await database_1.default.category.findUnique({
        where: { name: data.name },
    });
    if (existingCategory) {
        throw new api_error_1.ConflictError('Category with this name already exists');
    }
    // Check if category with same slug exists
    const existingSlug = await database_1.default.category.findUnique({
        where: { slug: data.slug.toLowerCase() },
    });
    if (existingSlug) {
        throw new api_error_1.ConflictError('Category with this slug already exists');
    }
    const category = await database_1.default.category.create({
        data: {
            name: data.name,
            description: data.description,
            image: data.image,
            slug: data.slug.toLowerCase(),
            featured: data.featured || false,
        },
    });
    // Invalidate category caches
    await (0, cache_util_1.deleteCachePattern)('categories:*');
    await (0, cache_util_1.deleteCachePattern)('category:*');
    return category;
};
exports.createCategory = createCategory;
/**
 * Update category (admin only)
 */
const updateCategory = async (id, data) => {
    const existingCategory = await database_1.default.category.findUnique({
        where: { id },
    });
    if (!existingCategory) {
        throw new api_error_1.NotFoundError('Category not found');
    }
    // Check for name conflict if name is being updated
    if (data.name && data.name !== existingCategory.name) {
        const nameConflict = await database_1.default.category.findUnique({
            where: { name: data.name },
        });
        if (nameConflict) {
            throw new api_error_1.ConflictError('Category with this name already exists');
        }
    }
    // Check for slug conflict if slug is being updated
    if (data.slug && data.slug !== existingCategory.slug) {
        const slugConflict = await database_1.default.category.findUnique({
            where: { slug: data.slug.toLowerCase() },
        });
        if (slugConflict) {
            throw new api_error_1.ConflictError('Category with this slug already exists');
        }
    }
    const category = await database_1.default.category.update({
        where: { id },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.image && { image: data.image }),
            ...(data.slug && { slug: data.slug.toLowerCase() }),
            ...(data.featured !== undefined && { featured: data.featured }),
        },
    });
    // Invalidate category caches
    await (0, cache_util_1.deleteCache)(cache_util_1.CacheKeys.category(id));
    await (0, cache_util_1.deleteCachePattern)('categories:*');
    return category;
};
exports.updateCategory = updateCategory;
/**
 * Delete category (admin only)
 */
const deleteCategory = async (id) => {
    const category = await database_1.default.category.findUnique({
        where: { id },
        include: {
            _count: {
                select: { products: true },
            },
        },
    });
    if (!category) {
        throw new api_error_1.NotFoundError('Category not found');
    }
    // Check if category has products
    if (category._count.products > 0) {
        throw new api_error_1.ConflictError('Cannot delete category with existing products');
    }
    await database_1.default.category.delete({
        where: { id },
    });
    // Invalidate category caches
    await (0, cache_util_1.deleteCache)(cache_util_1.CacheKeys.category(id));
    await (0, cache_util_1.deleteCachePattern)('categories:*');
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.service.js.map