export interface UpdateProfileData {
    name?: string;
    avatar?: string | null;
}
export interface ChangePasswordData {
    userId: string;
    currentPassword: string;
    newPassword: string;
}
/**
 * Get user by ID
 */
export declare const getUserById: (userId: string) => Promise<{
    role: import("@prisma/client").$Enums.Role;
    name: string;
    id: string;
    email: string;
    avatar: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
/**
 * Update user profile
 */
export declare const updateProfile: (userId: string, data: UpdateProfileData) => Promise<{
    role: import("@prisma/client").$Enums.Role;
    name: string;
    id: string;
    email: string;
    avatar: string | null;
    emailVerified: boolean;
    updatedAt: Date;
}>;
/**
 * Change user password
 */
export declare const changePassword: (data: ChangePasswordData) => Promise<void>;
/**
 * Check if email is available
 */
export declare const checkEmailAvailability: (email: string) => Promise<boolean>;
//# sourceMappingURL=user.service.d.ts.map