import { z } from 'zod';
export declare const createReviewSchema: z.ZodObject<{
    body: z.ZodObject<{
        rating: z.ZodNumber;
        title: z.ZodString;
        comment: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        rating: number;
        title: string;
        comment: string;
    }, {
        rating: number;
        title: string;
        comment: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        rating: number;
        title: string;
        comment: string;
    };
}, {
    body: {
        rating: number;
        title: string;
        comment: string;
    };
}>;
export declare const productIdParamSchema: z.ZodObject<{
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
export declare const reviewIdParamSchema: z.ZodObject<{
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
export declare const getReviewsQuerySchema: z.ZodObject<{
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
//# sourceMappingURL=review.validation.d.ts.map