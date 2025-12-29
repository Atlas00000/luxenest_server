import { PaginationParams, PaginationMeta } from '../types';
export interface CreateProductData {
    name: string;
    description: string;
    price: number;
    images: string[];
    categoryId: string;
    tags?: string[];
    stock: number;
    featured?: boolean;
    isNew?: boolean;
    onSale?: boolean;
    discount?: number;
    sustainabilityScore?: number;
    colors?: string[];
    sizes?: string[];
    materials?: string[];
}
export interface UpdateProductData extends Partial<CreateProductData> {
}
export interface ProductFilters {
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    sustainable?: boolean;
    featured?: boolean;
    isNew?: boolean;
    onSale?: boolean;
    search?: string;
}
export interface ProductSortOptions {
    sortBy?: 'name' | 'price' | 'rating' | 'createdAt' | 'reviewsCount';
    sortOrder?: 'asc' | 'desc';
}
/**
 * Get products with filtering, sorting, and pagination
 */
export declare const getProducts: (filters?: ProductFilters, sortOptions?: ProductSortOptions, pagination?: PaginationParams) => Promise<{
    products: any[];
    meta: PaginationMeta;
}>;
/**
 * Get single product by ID
 */
export declare const getProductById: (id: string) => Promise<{}>;
/**
 * Create new product (admin only)
 */
export declare const createProduct: (data: CreateProductData) => Promise<{
    category: {
        name: string;
        id: string;
        slug: string;
    };
} & {
    name: string;
    description: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    featured: boolean;
    price: import("@prisma/client/runtime/library").Decimal;
    images: string[];
    categoryId: string;
    tags: string[];
    stock: number;
    isNew: boolean;
    onSale: boolean;
    discount: number | null;
    sustainabilityScore: number | null;
    colors: string[];
    sizes: string[];
    materials: string[];
    rating: number;
    reviewsCount: number;
}>;
/**
 * Update product (admin only)
 */
export declare const updateProduct: (id: string, data: UpdateProductData) => Promise<{
    category: {
        name: string;
        id: string;
        slug: string;
    };
} & {
    name: string;
    description: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    featured: boolean;
    price: import("@prisma/client/runtime/library").Decimal;
    images: string[];
    categoryId: string;
    tags: string[];
    stock: number;
    isNew: boolean;
    onSale: boolean;
    discount: number | null;
    sustainabilityScore: number | null;
    colors: string[];
    sizes: string[];
    materials: string[];
    rating: number;
    reviewsCount: number;
}>;
/**
 * Delete product (admin only)
 */
export declare const deleteProduct: (id: string) => Promise<void>;
/**
 * Get featured products
 */
export declare const getFeaturedProducts: (limit?: number) => Promise<{}>;
/**
 * Get new products
 */
export declare const getNewProducts: (limit?: number) => Promise<{}>;
/**
 * Get products on sale
 */
export declare const getSaleProducts: (limit?: number) => Promise<{}>;
//# sourceMappingURL=product.service.d.ts.map