"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInWishlist = exports.removeWishlistItem = exports.addWishlistItem = exports.getWishlist = void 0;
const database_1 = __importDefault(require("../config/database"));
const api_error_1 = require("../utils/api-error");
/**
 * Get user's wishlist
 */
const getWishlist = async (userId) => {
    let wishlist = await database_1.default.wishlist.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            category: {
                                select: {
                                    id: true,
                                    name: true,
                                    slug: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    });
    // Create wishlist if it doesn't exist
    if (!wishlist) {
        wishlist = await database_1.default.wishlist.create({
            data: {
                userId,
            },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                category: {
                                    select: {
                                        id: true,
                                        name: true,
                                        slug: true,
                                    },
                                },
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
    }
    return wishlist;
};
exports.getWishlist = getWishlist;
/**
 * Add item to wishlist
 */
const addWishlistItem = async (userId, productId) => {
    // Validate product exists
    const product = await database_1.default.product.findUnique({
        where: { id: productId },
    });
    if (!product) {
        throw new api_error_1.NotFoundError('Product not found');
    }
    // Get or create wishlist
    let wishlist = await database_1.default.wishlist.findUnique({
        where: { userId },
    });
    if (!wishlist) {
        wishlist = await database_1.default.wishlist.create({
            data: {
                userId,
            },
        });
    }
    // Check if item already exists in wishlist
    const existingItem = await database_1.default.wishlistItem.findUnique({
        where: {
            wishlistId_productId: {
                wishlistId: wishlist.id,
                productId,
            },
        },
    });
    if (existingItem) {
        throw new api_error_1.ConflictError('Product already in wishlist');
    }
    // Create wishlist item
    const wishlistItem = await database_1.default.wishlistItem.create({
        data: {
            wishlistId: wishlist.id,
            productId,
        },
        include: {
            product: {
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
            },
        },
    });
    return wishlistItem;
};
exports.addWishlistItem = addWishlistItem;
/**
 * Remove item from wishlist
 */
const removeWishlistItem = async (userId, productId) => {
    // Get wishlist
    const wishlist = await database_1.default.wishlist.findUnique({
        where: { userId },
    });
    if (!wishlist) {
        throw new api_error_1.NotFoundError('Wishlist not found');
    }
    // Get wishlist item
    const wishlistItem = await database_1.default.wishlistItem.findUnique({
        where: {
            wishlistId_productId: {
                wishlistId: wishlist.id,
                productId,
            },
        },
    });
    if (!wishlistItem) {
        throw new api_error_1.NotFoundError('Wishlist item not found');
    }
    // Delete wishlist item
    await database_1.default.wishlistItem.delete({
        where: {
            id: wishlistItem.id,
        },
    });
};
exports.removeWishlistItem = removeWishlistItem;
/**
 * Check if product is in wishlist
 */
const isInWishlist = async (userId, productId) => {
    const wishlist = await database_1.default.wishlist.findUnique({
        where: { userId },
    });
    if (!wishlist) {
        return false;
    }
    const item = await database_1.default.wishlistItem.findUnique({
        where: {
            wishlistId_productId: {
                wishlistId: wishlist.id,
                productId,
            },
        },
    });
    return !!item;
};
exports.isInWishlist = isInWishlist;
//# sourceMappingURL=wishlist.service.js.map