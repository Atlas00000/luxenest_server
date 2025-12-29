/**
 * Get admin dashboard statistics
 */
export declare const getAdminStats: (dateRange?: string) => Promise<{}>;
/**
 * Get all orders for admin (with filters)
 */
export declare const getAdminOrders: (page?: number, limit?: number, status?: string, startDate?: Date, endDate?: Date) => Promise<{
    orders: ({
        user: {
            name: string;
            id: string;
            email: string;
        };
        items: ({
            product: {
                name: string;
                id: string;
                images: string[];
            };
        } & {
            id: string;
            createdAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        total: import("@prisma/client/runtime/library").Decimal;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        userId: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        paymentMethod: string;
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
/**
 * Get all users for admin
 */
export declare const getAdminUsers: (page?: number, limit?: number, search?: string) => Promise<{
    users: {
        role: import("@prisma/client").$Enums.Role;
        name: string;
        id: string;
        email: string;
        avatar: string | null;
        emailVerified: boolean;
        createdAt: Date;
        _count: {
            orders: number;
        };
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
/**
 * Get all products for admin
 */
export declare const getAdminProducts: (page?: number, limit?: number, search?: string, lowStock?: boolean) => Promise<{
    products: ({
        _count: {
            reviews: number;
            cartItems: number;
            wishlistItems: number;
        };
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
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
//# sourceMappingURL=admin.service.d.ts.map