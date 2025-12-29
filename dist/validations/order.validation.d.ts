import { z } from 'zod';
export declare const createOrderSchema: z.ZodObject<{
    body: z.ZodObject<{
        shippingAddress: z.ZodObject<{
            fullName: z.ZodString;
            address: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            zipCode: z.ZodString;
            country: z.ZodString;
            phone: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            fullName: string;
            address: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
            phone?: string | undefined;
        }, {
            fullName: string;
            address: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
            phone?: string | undefined;
        }>;
        paymentMethod: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        shippingAddress: {
            fullName: string;
            address: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
            phone?: string | undefined;
        };
        paymentMethod: string;
    }, {
        shippingAddress: {
            fullName: string;
            address: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
            phone?: string | undefined;
        };
        paymentMethod: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        shippingAddress: {
            fullName: string;
            address: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
            phone?: string | undefined;
        };
        paymentMethod: string;
    };
}, {
    body: {
        shippingAddress: {
            fullName: string;
            address: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
            phone?: string | undefined;
        };
        paymentMethod: string;
    };
}>;
export declare const updateOrderStatusSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodEnum<["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]>;
    }, "strip", z.ZodTypeAny, {
        status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    }, {
        status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    };
}, {
    body: {
        status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    };
}>;
export declare const orderIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
}, {
    params: {
        id: string;
    };
}>;
export declare const getOrdersQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>;
        limit: z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
    }, {
        page?: string | undefined;
        limit?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        page: number;
        limit: number;
    };
}, {
    query: {
        page?: string | undefined;
        limit?: string | undefined;
    };
}>;
//# sourceMappingURL=order.validation.d.ts.map