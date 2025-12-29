"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaleProducts = exports.getNewProducts = exports.getFeaturedProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const database_1 = __importDefault(require("../config/database"));
const api_error_1 = require("../utils/api-error");
const cache_util_1 = require("../utils/cache.util");
/**
 * Get products with filtering, sorting, and pagination
 */
const getProducts = async (filters = {}, sortOptions = {}, pagination = {}) => {
    const page = pagination.page || 1;
    const limit = pagination.limit || 20;
    const skip = (page - 1) * limit;
    // Generate cache key
    const cacheKey = cache_util_1.CacheKeys.products(JSON.stringify({ filters, sortOptions, pagination }));
    // Try to get from cache
    const cached = await (0, cache_util_1.getCache)(cacheKey);
    if (cached) {
        return cached;
    }
    // Build where clause
    const where = {};
    if (filters.categoryId) {
        where.categoryId = filters.categoryId;
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        where.price = {};
        if (filters.minPrice !== undefined) {
            where.price.gte = filters.minPrice;
        }
        if (filters.maxPrice !== undefined) {
            where.price.lte = filters.maxPrice;
        }
    }
    if (filters.inStock) {
        where.stock = { gt: 0 };
    }
    if (filters.sustainable) {
        where.sustainabilityScore = { gte: 4 };
    }
    if (filters.featured !== undefined) {
        where.featured = filters.featured;
    }
    if (filters.isNew !== undefined) {
        where.isNew = filters.isNew;
    }
    if (filters.onSale !== undefined) {
        where.onSale = filters.onSale;
    }
    if (filters.search) {
        where.OR = [
            { name: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } },
            { tags: { hasSome: [filters.search] } },
        ];
    }
    // Build orderBy clause
    const orderBy = {};
    const sortBy = sortOptions.sortBy || 'createdAt';
    const sortOrder = sortOptions.sortOrder || 'desc';
    if (sortBy === 'price') {
        orderBy.price = sortOrder;
    }
    else if (sortBy === 'rating') {
        orderBy.rating = sortOrder;
    }
    else if (sortBy === 'reviewsCount') {
        orderBy.reviewsCount = sortOrder;
    }
    else if (sortBy === 'name') {
        orderBy.name = sortOrder;
    }
    else {
        orderBy.createdAt = sortOrder;
    }
    // Execute query
    const [products, total] = await Promise.all([
        database_1.default.product.findMany({
            where,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
            orderBy,
            skip,
            take: limit,
        }),
        database_1.default.product.count({ where }),
    ]);
    const totalPages = Math.ceil(total / limit);
    const result = {
        products,
        meta: {
            page,
            limit,
            total,
            totalPages,
        },
    };
    // Cache result (shorter TTL for filtered results)
    await (0, cache_util_1.setCache)(cacheKey, result, cache_util_1.CACHE_TTL.SHORT);
    return result;
};
exports.getProducts = getProducts;
/**
 * Get single product by ID
 */
const getProductById = async (id) => {
    // Try cache first
    const cacheKey = cache_util_1.CacheKeys.product(id);
    const cached = await (0, cache_util_1.getCache)(cacheKey);
    if (cached) {
        return cached;
    }
    const product = await database_1.default.product.findUnique({
        where: { id },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    description: true,
                },
            },
            reviews: {
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
    if (!product) {
        throw new api_error_1.NotFoundError('Product not found');
    }
    // Cache product
    await (0, cache_util_1.setCache)(cacheKey, product, cache_util_1.CACHE_TTL.MEDIUM);
    return product;
};
exports.getProductById = getProductById;
/**
 * Create new product (admin only)
 */
const createProduct = async (data) => {
    // Validate category exists
    const category = await database_1.default.category.findUnique({
        where: { id: data.categoryId },
    });
    if (!category) {
        throw new api_error_1.NotFoundError('Category not found');
    }
    // Validate price
    if (data.price < 0) {
        throw new api_error_1.BadRequestError('Price cannot be negative');
    }
    // Validate stock
    if (data.stock < 0) {
        throw new api_error_1.BadRequestError('Stock cannot be negative');
    }
    // Validate discount
    if (data.discount !== undefined) {
        if (data.discount < 0 || data.discount > 100) {
            throw new api_error_1.BadRequestError('Discount must be between 0 and 100');
        }
    }
    // Validate sustainability score
    if (data.sustainabilityScore !== undefined) {
        if (data.sustainabilityScore < 0 || data.sustainabilityScore > 5) {
            throw new api_error_1.BadRequestError('Sustainability score must be between 0 and 5');
        }
    }
    const product = await database_1.default.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            images: data.images,
            categoryId: data.categoryId,
            tags: data.tags || [],
            stock: data.stock,
            featured: data.featured || false,
            isNew: data.isNew || false,
            onSale: data.onSale || false,
            discount: data.discount || null,
            sustainabilityScore: data.sustainabilityScore || null,
            colors: data.colors || [],
            sizes: data.sizes || [],
            materials: data.materials || [],
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });
    // Invalidate product caches
    await (0, cache_util_1.deleteCachePattern)('products:*');
    await (0, cache_util_1.deleteCachePattern)('product:*');
    return product;
};
exports.createProduct = createProduct;
/**
 * Update product (admin only)
 */
const updateProduct = async (id, data) => {
    // Check if product exists
    const existingProduct = await database_1.default.product.findUnique({
        where: { id },
    });
    if (!existingProduct) {
        throw new api_error_1.NotFoundError('Product not found');
    }
    // Validate category if provided
    if (data.categoryId) {
        const category = await database_1.default.category.findUnique({
            where: { id: data.categoryId },
        });
        if (!category) {
            throw new api_error_1.NotFoundError('Category not found');
        }
    }
    // Validate price if provided
    if (data.price !== undefined && data.price < 0) {
        throw new api_error_1.BadRequestError('Price cannot be negative');
    }
    // Validate stock if provided
    if (data.stock !== undefined && data.stock < 0) {
        throw new api_error_1.BadRequestError('Stock cannot be negative');
    }
    // Validate discount if provided
    if (data.discount !== undefined) {
        if (data.discount < 0 || data.discount > 100) {
            throw new api_error_1.BadRequestError('Discount must be between 0 and 100');
        }
    }
    // Validate sustainability score if provided
    if (data.sustainabilityScore !== undefined) {
        if (data.sustainabilityScore < 0 || data.sustainabilityScore > 5) {
            throw new api_error_1.BadRequestError('Sustainability score must be between 0 and 5');
        }
    }
    const product = await database_1.default.product.update({
        where: { id },
        data: {
            ...(data.name && { name: data.name }),
            ...(data.description && { description: data.description }),
            ...(data.price !== undefined && { price: data.price }),
            ...(data.images && { images: data.images }),
            ...(data.categoryId && { categoryId: data.categoryId }),
            ...(data.tags && { tags: data.tags }),
            ...(data.stock !== undefined && { stock: data.stock }),
            ...(data.featured !== undefined && { featured: data.featured }),
            ...(data.isNew !== undefined && { isNew: data.isNew }),
            ...(data.onSale !== undefined && { onSale: data.onSale }),
            ...(data.discount !== undefined && { discount: data.discount }),
            ...(data.sustainabilityScore !== undefined && { sustainabilityScore: data.sustainabilityScore }),
            ...(data.colors && { colors: data.colors }),
            ...(data.sizes && { sizes: data.sizes }),
            ...(data.materials && { materials: data.materials }),
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });
    // Invalidate product caches
    await (0, cache_util_1.deleteCache)(cache_util_1.CacheKeys.product(id));
    await (0, cache_util_1.deleteCachePattern)('products:*');
    return product;
};
exports.updateProduct = updateProduct;
/**
 * Delete product (admin only)
 */
const deleteProduct = async (id) => {
    const product = await database_1.default.product.findUnique({
        where: { id },
    });
    if (!product) {
        throw new api_error_1.NotFoundError('Product not found');
    }
    await database_1.default.product.delete({
        where: { id },
    });
    // Invalidate product caches
    await (0, cache_util_1.deleteCache)(cache_util_1.CacheKeys.product(id));
    await (0, cache_util_1.deleteCachePattern)('products:*');
};
exports.deleteProduct = deleteProduct;
/**
 * Get featured products
 */
const getFeaturedProducts = async (limit = 8) => {
    const cacheKey = cache_util_1.CacheKeys.featuredProducts();
    const cached = await (0, cache_util_1.getCache)(cacheKey);
    if (cached) {
        return cached;
    }
    const products = await database_1.default.product.findMany({
        where: { featured: true },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
    });
    await (0, cache_util_1.setCache)(cacheKey, products, cache_util_1.CACHE_TTL.MEDIUM);
    return products;
};
exports.getFeaturedProducts = getFeaturedProducts;
/**
 * Get new products
 */
const getNewProducts = async (limit = 8) => {
    const cacheKey = cache_util_1.CacheKeys.newProducts();
    const cached = await (0, cache_util_1.getCache)(cacheKey);
    if (cached) {
        return cached;
    }
    const products = await database_1.default.product.findMany({
        where: { isNew: true },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
    });
    await (0, cache_util_1.setCache)(cacheKey, products, cache_util_1.CACHE_TTL.MEDIUM);
    return products;
};
exports.getNewProducts = getNewProducts;
/**
 * Get products on sale
 */
const getSaleProducts = async (limit = 8) => {
    const cacheKey = cache_util_1.CacheKeys.saleProducts();
    const cached = await (0, cache_util_1.getCache)(cacheKey);
    if (cached) {
        return cached;
    }
    const products = await database_1.default.product.findMany({
        where: { onSale: true },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
        orderBy: { discount: 'desc' },
        take: limit,
    });
    await (0, cache_util_1.setCache)(cacheKey, products, cache_util_1.CACHE_TTL.MEDIUM);
    return products;
};
exports.getSaleProducts = getSaleProducts;
//# sourceMappingURL=product.service.js.map