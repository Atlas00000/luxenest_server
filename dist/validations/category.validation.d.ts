import { z } from 'zod';
export declare const createCategorySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodString;
        slug: z.ZodString;
        featured: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        image: string;
        slug: string;
        description?: string | undefined;
        featured?: boolean | undefined;
    }, {
        name: string;
        image: string;
        slug: string;
        description?: string | undefined;
        featured?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        image: string;
        slug: string;
        description?: string | undefined;
        featured?: boolean | undefined;
    };
}, {
    body: {
        name: string;
        image: string;
        slug: string;
        description?: string | undefined;
        featured?: boolean | undefined;
    };
}>;
export declare const updateCategorySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        slug: z.ZodOptional<z.ZodString>;
        featured: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        description?: string | undefined;
        featured?: boolean | undefined;
        image?: string | undefined;
        slug?: string | undefined;
    }, {
        name?: string | undefined;
        description?: string | undefined;
        featured?: boolean | undefined;
        image?: string | undefined;
        slug?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
        featured?: boolean | undefined;
        image?: string | undefined;
        slug?: string | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
        featured?: boolean | undefined;
        image?: string | undefined;
        slug?: string | undefined;
    };
}>;
export declare const categoryIdSchema: z.ZodObject<{
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
export declare const categorySlugSchema: z.ZodObject<{
    params: z.ZodObject<{
        slug: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        slug: string;
    }, {
        slug: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        slug: string;
    };
}, {
    params: {
        slug: string;
    };
}>;
//# sourceMappingURL=category.validation.d.ts.map