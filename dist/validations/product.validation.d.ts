import { z } from 'zod';
export declare const getProductsQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>;
        limit: z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>;
        categoryId: z.ZodOptional<z.ZodString>;
        minPrice: z.ZodEffects<z.ZodOptional<z.ZodString>, number | undefined, string | undefined>;
        maxPrice: z.ZodEffects<z.ZodOptional<z.ZodString>, number | undefined, string | undefined>;
        inStock: z.ZodEffects<z.ZodOptional<z.ZodString>, boolean, string | undefined>;
        sustainable: z.ZodEffects<z.ZodOptional<z.ZodString>, boolean, string | undefined>;
        featured: z.ZodEffects<z.ZodOptional<z.ZodString>, boolean, string | undefined>;
        isNew: z.ZodEffects<z.ZodOptional<z.ZodString>, boolean, string | undefined>;
        onSale: z.ZodEffects<z.ZodOptional<z.ZodString>, boolean, string | undefined>;
        search: z.ZodOptional<z.ZodString>;
        sortBy: z.ZodOptional<z.ZodEnum<["name", "price", "rating", "createdAt", "reviewsCount"]>>;
        sortOrder: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        featured: boolean;
        isNew: boolean;
        onSale: boolean;
        inStock: boolean;
        sustainable: boolean;
        search?: string | undefined;
        categoryId?: string | undefined;
        minPrice?: number | undefined;
        maxPrice?: number | undefined;
        sortBy?: "name" | "createdAt" | "price" | "rating" | "reviewsCount" | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    }, {
        search?: string | undefined;
        page?: string | undefined;
        limit?: string | undefined;
        featured?: string | undefined;
        categoryId?: string | undefined;
        isNew?: string | undefined;
        onSale?: string | undefined;
        minPrice?: string | undefined;
        maxPrice?: string | undefined;
        inStock?: string | undefined;
        sustainable?: string | undefined;
        sortBy?: "name" | "createdAt" | "price" | "rating" | "reviewsCount" | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        page: number;
        limit: number;
        featured: boolean;
        isNew: boolean;
        onSale: boolean;
        inStock: boolean;
        sustainable: boolean;
        search?: string | undefined;
        categoryId?: string | undefined;
        minPrice?: number | undefined;
        maxPrice?: number | undefined;
        sortBy?: "name" | "createdAt" | "price" | "rating" | "reviewsCount" | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    };
}, {
    query: {
        search?: string | undefined;
        page?: string | undefined;
        limit?: string | undefined;
        featured?: string | undefined;
        categoryId?: string | undefined;
        isNew?: string | undefined;
        onSale?: string | undefined;
        minPrice?: string | undefined;
        maxPrice?: string | undefined;
        inStock?: string | undefined;
        sustainable?: string | undefined;
        sortBy?: "name" | "createdAt" | "price" | "rating" | "reviewsCount" | undefined;
        sortOrder?: "asc" | "desc" | undefined;
    };
}>;
export declare const createProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        price: z.ZodNumber;
        images: z.ZodArray<z.ZodString, "many">;
        categoryId: z.ZodString;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        stock: z.ZodNumber;
        featured: z.ZodOptional<z.ZodBoolean>;
        isNew: z.ZodOptional<z.ZodBoolean>;
        onSale: z.ZodOptional<z.ZodBoolean>;
        discount: z.ZodOptional<z.ZodNumber>;
        sustainabilityScore: z.ZodOptional<z.ZodNumber>;
        colors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        sizes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        materials: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        price: number;
        images: string[];
        categoryId: string;
        stock: number;
        featured?: boolean | undefined;
        tags?: string[] | undefined;
        isNew?: boolean | undefined;
        onSale?: boolean | undefined;
        discount?: number | undefined;
        sustainabilityScore?: number | undefined;
        colors?: string[] | undefined;
        sizes?: string[] | undefined;
        materials?: string[] | undefined;
    }, {
        name: string;
        description: string;
        price: number;
        images: string[];
        categoryId: string;
        stock: number;
        featured?: boolean | undefined;
        tags?: string[] | undefined;
        isNew?: boolean | undefined;
        onSale?: boolean | undefined;
        discount?: number | undefined;
        sustainabilityScore?: number | undefined;
        colors?: string[] | undefined;
        sizes?: string[] | undefined;
        materials?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        description: string;
        price: number;
        images: string[];
        categoryId: string;
        stock: number;
        featured?: boolean | undefined;
        tags?: string[] | undefined;
        isNew?: boolean | undefined;
        onSale?: boolean | undefined;
        discount?: number | undefined;
        sustainabilityScore?: number | undefined;
        colors?: string[] | undefined;
        sizes?: string[] | undefined;
        materials?: string[] | undefined;
    };
}, {
    body: {
        name: string;
        description: string;
        price: number;
        images: string[];
        categoryId: string;
        stock: number;
        featured?: boolean | undefined;
        tags?: string[] | undefined;
        isNew?: boolean | undefined;
        onSale?: boolean | undefined;
        discount?: number | undefined;
        sustainabilityScore?: number | undefined;
        colors?: string[] | undefined;
        sizes?: string[] | undefined;
        materials?: string[] | undefined;
    };
}>;
export declare const updateProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNumber>;
        images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        categoryId: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        stock: z.ZodOptional<z.ZodNumber>;
        featured: z.ZodOptional<z.ZodBoolean>;
        isNew: z.ZodOptional<z.ZodBoolean>;
        onSale: z.ZodOptional<z.ZodBoolean>;
        discount: z.ZodOptional<z.ZodNumber>;
        sustainabilityScore: z.ZodOptional<z.ZodNumber>;
        colors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        sizes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        materials: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        description?: string | undefined;
        featured?: boolean | undefined;
        price?: number | undefined;
        images?: string[] | undefined;
        categoryId?: string | undefined;
        tags?: string[] | undefined;
        stock?: number | undefined;
        isNew?: boolean | undefined;
        onSale?: boolean | undefined;
        discount?: number | undefined;
        sustainabilityScore?: number | undefined;
        colors?: string[] | undefined;
        sizes?: string[] | undefined;
        materials?: string[] | undefined;
    }, {
        name?: string | undefined;
        description?: string | undefined;
        featured?: boolean | undefined;
        price?: number | undefined;
        images?: string[] | undefined;
        categoryId?: string | undefined;
        tags?: string[] | undefined;
        stock?: number | undefined;
        isNew?: boolean | undefined;
        onSale?: boolean | undefined;
        discount?: number | undefined;
        sustainabilityScore?: number | undefined;
        colors?: string[] | undefined;
        sizes?: string[] | undefined;
        materials?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
        featured?: boolean | undefined;
        price?: number | undefined;
        images?: string[] | undefined;
        categoryId?: string | undefined;
        tags?: string[] | undefined;
        stock?: number | undefined;
        isNew?: boolean | undefined;
        onSale?: boolean | undefined;
        discount?: number | undefined;
        sustainabilityScore?: number | undefined;
        colors?: string[] | undefined;
        sizes?: string[] | undefined;
        materials?: string[] | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        description?: string | undefined;
        featured?: boolean | undefined;
        price?: number | undefined;
        images?: string[] | undefined;
        categoryId?: string | undefined;
        tags?: string[] | undefined;
        stock?: number | undefined;
        isNew?: boolean | undefined;
        onSale?: boolean | undefined;
        discount?: number | undefined;
        sustainabilityScore?: number | undefined;
        colors?: string[] | undefined;
        sizes?: string[] | undefined;
        materials?: string[] | undefined;
    };
}>;
export declare const productIdSchema: z.ZodObject<{
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
//# sourceMappingURL=product.validation.d.ts.map