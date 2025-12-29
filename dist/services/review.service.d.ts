export interface CreateReviewData {
    rating: number;
    title: string;
    comment: string;
}
/**
 * Get reviews for a product
 */
export declare const getProductReviews: (productId: string, page?: number, limit?: number) => Promise<{
    reviews: ({
        user: {
            name: string;
            id: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        rating: number;
        productId: string;
        userId: string;
        title: string;
        comment: string;
        helpful: number;
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
/**
 * Create review for a product
 */
export declare const createReview: (userId: string, productId: string, data: CreateReviewData) => Promise<{
    user: {
        name: string;
        id: string;
        avatar: string | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    productId: string;
    userId: string;
    title: string;
    comment: string;
    helpful: number;
}>;
/**
 * Mark review as helpful
 */
export declare const markReviewHelpful: (reviewId: string) => Promise<{
    user: {
        name: string;
        id: string;
        avatar: string | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    productId: string;
    userId: string;
    title: string;
    comment: string;
    helpful: number;
}>;
/**
 * Get user's review for a product
 */
export declare const getUserReview: (userId: string, productId: string) => Promise<{
    user: {
        name: string;
        id: string;
        avatar: string | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    productId: string;
    userId: string;
    title: string;
    comment: string;
    helpful: number;
}>;
//# sourceMappingURL=review.service.d.ts.map