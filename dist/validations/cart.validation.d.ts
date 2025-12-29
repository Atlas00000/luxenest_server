import { z } from 'zod';
export declare const addCartItemSchema: z.ZodObject<{
    body: z.ZodObject<{
        productId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: string;
        quantity: number;
    }, {
        productId: string;
        quantity: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        productId: string;
        quantity: number;
    };
}, {
    body: {
        productId: string;
        quantity: number;
    };
}>;
export declare const updateCartItemSchema: z.ZodObject<{
    body: z.ZodObject<{
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
    }, {
        quantity: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        quantity: number;
    };
}, {
    body: {
        quantity: number;
    };
}>;
export declare const productIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        productId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        productId: string;
    }, {
        productId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        productId: string;
    };
}, {
    params: {
        productId: string;
    };
}>;
//# sourceMappingURL=cart.validation.d.ts.map