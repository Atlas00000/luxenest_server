export interface RegisterData {
    name: string;
    email: string;
    password: string;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        avatar: string | null;
    };
    accessToken: string;
    refreshToken: string;
}
/**
 * Register a new user
 */
export declare const register: (data: RegisterData) => Promise<AuthResponse>;
/**
 * Login user
 */
export declare const login: (data: LoginData) => Promise<AuthResponse>;
/**
 * Logout user (revoke refresh token)
 */
export declare const logout: (userId: string) => Promise<void>;
/**
 * Refresh access token using refresh token
 */
export declare const refreshAccessToken: (refreshToken: string) => Promise<{
    accessToken: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map