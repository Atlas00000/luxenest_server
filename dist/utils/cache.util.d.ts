declare const CACHE_TTL: {
    SHORT: number;
    MEDIUM: number;
    LONG: number;
    VERY_LONG: number;
};
/**
 * Get cached data
 */
export declare const getCache: <T>(key: string) => Promise<T | null>;
/**
 * Set cached data
 */
export declare const setCache: (key: string, value: any, ttl?: number) => Promise<void>;
/**
 * Delete cached data
 */
export declare const deleteCache: (key: string) => Promise<void>;
/**
 * Delete cache by pattern
 */
export declare const deleteCachePattern: (pattern: string) => Promise<void>;
/**
 * Cache key generators
 */
export declare const CacheKeys: {
    products: (filters: string) => string;
    product: (id: string) => string;
    featuredProducts: () => string;
    newProducts: () => string;
    saleProducts: () => string;
    categories: (featured: boolean) => string;
    category: (id: string) => string;
    categoryBySlug: (slug: string) => string;
    adminStats: (dateRange: string) => string;
    userSession: (userId: string) => string;
};
export { CACHE_TTL };
//# sourceMappingURL=cache.util.d.ts.map