export interface AddCartItemData {
    productId: string;
    quantity: number;
}
export interface UpdateCartItemData {
    quantity: number;
}
/**
 * Get user's cart
 */
export declare const getCart: (userId: string) => Promise<{
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
        updatedAt: Date;
        productId: string;
        cartId: string;
        quantity: number;
    })[];
} & {
    id: string;
    updatedAt: Date;
    userId: string;
}>;
/**
 * Add item to cart
 */
export declare const addCartItem: (userId: string, data: AddCartItemData) => Promise<{
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
    updatedAt: Date;
    productId: string;
    cartId: string;
    quantity: number;
}>;
/**
 * Update cart item quantity
 */
export declare const updateCartItem: (userId: string, productId: string, data: UpdateCartItemData) => Promise<{
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
    updatedAt: Date;
    productId: string;
    cartId: string;
    quantity: number;
}>;
/**
 * Remove item from cart
 */
export declare const removeCartItem: (userId: string, productId: string) => Promise<void>;
/**
 * Clear cart
 */
export declare const clearCart: (userId: string) => Promise<void>;
//# sourceMappingURL=cart.service.d.ts.map