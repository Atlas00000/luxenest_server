"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaleProductsController = exports.getNewProductsController = exports.getFeaturedProductsController = exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.getProductByIdController = exports.getProductsController = void 0;
const product_service_1 = require("../services/product.service");
const api_response_1 = require("../utils/api-response");
/**
 * Get products with filtering, sorting, and pagination
 */
const getProductsController = async (req, res, next) => {
    try {
        const { page, limit, categoryId, minPrice, maxPrice, inStock, sustainable, featured, isNew, onSale, search, sortBy, sortOrder, } = req.query;
        const filters = {
            ...(categoryId && { categoryId: categoryId }),
            ...(minPrice && { minPrice: typeof minPrice === 'string' ? parseFloat(minPrice) : Number(minPrice) }),
            ...(maxPrice && { maxPrice: typeof maxPrice === 'string' ? parseFloat(maxPrice) : Number(maxPrice) }),
            ...(inStock && { inStock: inStock === 'true' }),
            ...(sustainable && { sustainable: sustainable === 'true' }),
            ...(featured !== undefined && { featured: featured === 'true' }),
            ...(isNew !== undefined && { isNew: isNew === 'true' }),
            ...(onSale !== undefined && { onSale: onSale === 'true' }),
            ...(search && { search: search }),
        };
        const sortOptions = {
            ...(sortBy && { sortBy: sortBy }),
            ...(sortOrder && { sortOrder: sortOrder }),
        };
        const pagination = {
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 20,
        };
        const result = await (0, product_service_1.getProducts)(filters, sortOptions, pagination);
        (0, api_response_1.sendPaginated)(res, result.products, result.meta, 'Products retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getProductsController = getProductsController;
/**
 * Get single product by ID
 */
const getProductByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await (0, product_service_1.getProductById)(id);
        (0, api_response_1.sendSuccess)(res, product, 'Product retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getProductByIdController = getProductByIdController;
/**
 * Create new product (admin only)
 */
const createProductController = async (req, res, next) => {
    try {
        const product = await (0, product_service_1.createProduct)(req.body);
        (0, api_response_1.sendSuccess)(res, product, 'Product created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createProductController = createProductController;
/**
 * Update product (admin only)
 */
const updateProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await (0, product_service_1.updateProduct)(id, req.body);
        (0, api_response_1.sendSuccess)(res, product, 'Product updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateProductController = updateProductController;
/**
 * Delete product (admin only)
 */
const deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await (0, product_service_1.deleteProduct)(id);
        (0, api_response_1.sendSuccess)(res, null, 'Product deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProductController = deleteProductController;
/**
 * Get featured products
 */
const getFeaturedProductsController = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 8;
        const products = await (0, product_service_1.getFeaturedProducts)(limit);
        (0, api_response_1.sendSuccess)(res, products, 'Featured products retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getFeaturedProductsController = getFeaturedProductsController;
/**
 * Get new products
 */
const getNewProductsController = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 8;
        const products = await (0, product_service_1.getNewProducts)(limit);
        (0, api_response_1.sendSuccess)(res, products, 'New products retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getNewProductsController = getNewProductsController;
/**
 * Get sale products
 */
const getSaleProductsController = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 8;
        const products = await (0, product_service_1.getSaleProducts)(limit);
        (0, api_response_1.sendSuccess)(res, products, 'Sale products retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getSaleProductsController = getSaleProductsController;
//# sourceMappingURL=product.controller.js.map