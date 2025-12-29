/**
 * Hash a password using bcrypt
 */
export declare const hashPassword: (password: string) => Promise<string>;
/**
 * Compare a password with a hash
 */
export declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
//# sourceMappingURL=bcrypt.util.d.ts.map