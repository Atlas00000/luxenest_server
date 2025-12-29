export interface ShippingAddress {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
}
export interface CreateOrderData {
    shippingAddress: ShippingAddress;
    paymentMethod: string;
}
/**
 * Calculate shipping cost
 */
export declare const calculateShipping: (subtotal: number) => number;
/**
 * Calculate tax
 */
export declare const calculateTax: (subtotal: number, shipping: number) => number;
/**
 * Create order from cart
 */
export declare const createOrder: (userId: string, data: CreateOrderData) => Promise<{
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
}>;
/**
 * Get user's orders
 */
export declare const getUserOrders: (userId: string, page?: number, limit?: number) => Promise<{
    orders: ({
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
 * Get single order by ID
 */
export declare const getOrderById: (userId: string, orderId: string) => Promise<{
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
}>;
/**
 * Update order status (admin only)
 */
export declare const updateOrderStatus: (orderId: string, status: string) => Promise<{
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
}>;
//# sourceMappingURL=order.service.d.ts.map