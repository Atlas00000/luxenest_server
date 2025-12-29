export interface CreateCategoryData {
    name: string;
    description?: string;
    image: string;
    slug: string;
    featured?: boolean;
}
export interface UpdateCategoryData extends Partial<CreateCategoryData> {
}
/**
 * Get all categories
 */
export declare const getCategories: (featuredOnly?: boolean) => Promise<{}>;
/**
 * Get single category by ID
 */
export declare const getCategoryById: (id: string) => Promise<{}>;
/**
 * Get category by slug
 */
export declare const getCategoryBySlug: (slug: string) => Promise<{}>;
/**
 * Create new category (admin only)
 */
export declare const createCategory: (data: CreateCategoryData) => Promise<{
    name: string;
    description: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    featured: boolean;
    image: string;
    slug: string;
}>;
/**
 * Update category (admin only)
 */
export declare const updateCategory: (id: string, data: UpdateCategoryData) => Promise<{
    name: string;
    description: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    featured: boolean;
    image: string;
    slug: string;
}>;
/**
 * Delete category (admin only)
 */
export declare const deleteCategory: (id: string) => Promise<void>;
//# sourceMappingURL=category.service.d.ts.map