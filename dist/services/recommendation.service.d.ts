/**
 * Get product recommendations based on category and similar products
 */
export declare const getProductRecommendations: (productId: string, limit?: number) => Promise<({
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
})[]>;
/**
 * Get recommendations based on user's purchase history (for future implementation)
 */
export declare const getUserRecommendations: (userId: string, limit?: number) => Promise<({
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
})[]>;
/**
 * Get trending products (based on reviews and sales)
 */
export declare const getTrendingProducts: (limit?: number) => Promise<({
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
})[]>;
//# sourceMappingURL=recommendation.service.d.ts.map