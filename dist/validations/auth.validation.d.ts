import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        password: string;
        name: string;
        email: string;
    }, {
        password: string;
        name: string;
        email: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        password: string;
        name: string;
        email: string;
    };
}, {
    body: {
        password: string;
        name: string;
        email: string;
    };
}>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        password: string;
        email: string;
    }, {
        password: string;
        email: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        password: string;
        email: string;
    };
}, {
    body: {
        password: string;
        email: string;
    };
}>;
export declare const refreshTokenSchema: z.ZodObject<{
    body: z.ZodObject<{
        refreshToken: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        refreshToken: string;
    }, {
        refreshToken: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        refreshToken: string;
    };
}, {
    body: {
        refreshToken: string;
    };
}>;
export declare const updateProfileSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        avatar: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        avatar?: string | null | undefined;
    }, {
        name?: string | undefined;
        avatar?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        avatar?: string | null | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        avatar?: string | null | undefined;
    };
}>;
export declare const changePasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        currentPassword: z.ZodString;
        newPassword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        currentPassword: string;
        newPassword: string;
    }, {
        currentPassword: string;
        newPassword: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        currentPassword: string;
        newPassword: string;
    };
}, {
    body: {
        currentPassword: string;
        newPassword: string;
    };
}>;
//# sourceMappingURL=auth.validation.d.ts.map