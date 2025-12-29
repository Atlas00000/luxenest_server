import { Request, Response, NextFunction } from 'express';
/**
 * Get products with filtering, sorting, and pagination
 */
export declare const getProductsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get single product by ID
 */
export declare const getProductByIdController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Create new product (admin only)
 */
export declare const createProductController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Update product (admin only)
 */
export declare const updateProductController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Delete product (admin only)
 */
export declare const deleteProductController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get featured products
 */
export declare const getFeaturedProductsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get new products
 */
export declare const getNewProductsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get sale products
 */
export declare const getSaleProductsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=product.controller.d.ts.map