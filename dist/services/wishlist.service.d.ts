/**
 * Get user's wishlist
 */
export declare const getWishlist: (userId: string) => Promise<{
    items: ({
        product: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        wishlistId: string;
    })[];
} & {
    id: string;
    updatedAt: Date;
    userId: string;
}>;
/**
 * Add item to wishlist
 */
export declare const addWishlistItem: (userId: string, productId: string) => Promise<{
    product: {
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
    };
} & {
    id: string;
    createdAt: Date;
    productId: string;
    wishlistId: string;
}>;
/**
 * Remove item from wishlist
 */
export declare const removeWishlistItem: (userId: string, productId: string) => Promise<void>;
/**
 * Check if product is in wishlist
 */
export declare const isInWishlist: (userId: string, productId: string) => Promise<boolean>;
//# sourceMappingURL=wishlist.service.d.ts.map