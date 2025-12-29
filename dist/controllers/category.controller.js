"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.updateCategoryController = exports.createCategoryController = exports.getCategoryBySlugController = exports.getCategoryByIdController = exports.getCategoriesController = void 0;
const category_service_1 = require("../services/category.service");
const api_response_1 = require("../utils/api-response");
/**
 * Get all categories
 */
const getCategoriesController = async (req, res, next) => {
    try {
        const featuredOnly = req.query.featured === 'true';
        const categories = await (0, category_service_1.getCategories)(featuredOnly);
        (0, api_response_1.sendSuccess)(res, categories, 'Categories retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getCategoriesController = getCategoriesController;
/**
 * Get single category by ID
 */
const getCategoryByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await (0, category_service_1.getCategoryById)(id);
        (0, api_response_1.sendSuccess)(res, category, 'Category retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getCategoryByIdController = getCategoryByIdController;
/**
 * Get category by slug
 */
const getCategoryBySlugController = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const category = await (0, category_service_1.getCategoryBySlug)(slug);
        (0, api_response_1.sendSuccess)(res, category, 'Category retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getCategoryBySlugController = getCategoryBySlugController;
/**
 * Create new category (admin only)
 */
const createCategoryController = async (req, res, next) => {
    try {
        const category = await (0, category_service_1.createCategory)(req.body);
        (0, api_response_1.sendSuccess)(res, category, 'Category created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createCategoryController = createCategoryController;
/**
 * Update category (admin only)
 */
const updateCategoryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await (0, category_service_1.updateCategory)(id, req.body);
        (0, api_response_1.sendSuccess)(res, category, 'Category updated successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.updateCategoryController = updateCategoryController;
/**
 * Delete category (admin only)
 */
const deleteCategoryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await (0, category_service_1.deleteCategory)(id);
        (0, api_response_1.sendSuccess)(res, null, 'Category deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCategoryController = deleteCategoryController;
//# sourceMappingURL=category.controller.js.map