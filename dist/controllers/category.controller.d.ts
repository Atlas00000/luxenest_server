import { Request, Response, NextFunction } from 'express';
/**
 * Get all categories
 */
export declare const getCategoriesController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get single category by ID
 */
export declare const getCategoryByIdController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get category by slug
 */
export declare const getCategoryBySlugController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create new category (admin only)
 */
export declare const createCategoryController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update category (admin only)
 */
export declare const updateCategoryController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete category (admin only)
 */
export declare const deleteCategoryController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=category.controller.d.ts.map