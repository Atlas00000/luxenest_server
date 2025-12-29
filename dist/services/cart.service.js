"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeCartItem = exports.updateCartItem = exports.addCartItem = exports.getCart = void 0;
const database_1 = __importDefault(require("../config/database"));
const api_error_1 = require("../utils/api-error");
/**
 * Get user's cart
 */
const getCart = async (userId) => {
    let cart = await database_1.default.cart.findUnique({
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
                    createdAt: 'asc',
                },
            },
        },
    });
    // Create cart if it doesn't exist
    if (!cart) {
        cart = await database_1.default.cart.create({
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
                        createdAt: 'asc',
                    },
                },
            },
        });
    }
    return cart;
};
exports.getCart = getCart;
/**
 * Add item to cart
 */
const addCartItem = async (userId, data) => {
    // Validate product exists
    const product = await database_1.default.product.findUnique({
        where: { id: data.productId },
    });
    if (!product) {
        throw new api_error_1.NotFoundError('Product not found');
    }
    // Validate stock
    if (product.stock < data.quantity) {
        throw new api_error_1.BadRequestError(`Only ${product.stock} items available in stock`);
    }
    // Validate quantity
    if (data.quantity <= 0) {
        throw new api_error_1.BadRequestError('Quantity must be greater than 0');
    }
    if (data.quantity > 10) {
        throw new api_error_1.BadRequestError('Maximum quantity per item is 10');
    }
    // Get or create cart
    let cart = await database_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart) {
        cart = await database_1.default.cart.create({
            data: {
                userId,
            },
        });
    }
    // Check if item already exists in cart
    const existingItem = await database_1.default.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId: data.productId,
            },
        },
    });
    if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + data.quantity;
        // Validate stock for new quantity
        if (product.stock < newQuantity) {
            throw new api_error_1.BadRequestError(`Only ${product.stock} items available in stock`);
        }
        if (newQuantity > 10) {
            throw new api_error_1.BadRequestError('Maximum quantity per item is 10');
        }
        const updatedItem = await database_1.default.cartItem.update({
            where: {
                id: existingItem.id,
            },
            data: {
                quantity: newQuantity,
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
        return updatedItem;
    }
    // Create new cart item
    const cartItem = await database_1.default.cartItem.create({
        data: {
            cartId: cart.id,
            productId: data.productId,
            quantity: data.quantity,
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
    return cartItem;
};
exports.addCartItem = addCartItem;
/**
 * Update cart item quantity
 */
const updateCartItem = async (userId, productId, data) => {
    // Validate quantity
    if (data.quantity <= 0) {
        throw new api_error_1.BadRequestError('Quantity must be greater than 0');
    }
    if (data.quantity > 10) {
        throw new api_error_1.BadRequestError('Maximum quantity per item is 10');
    }
    // Get cart
    const cart = await database_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart) {
        throw new api_error_1.NotFoundError('Cart not found');
    }
    // Get cart item
    const cartItem = await database_1.default.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId,
            },
        },
        include: {
            product: true,
        },
    });
    if (!cartItem) {
        throw new api_error_1.NotFoundError('Cart item not found');
    }
    // Validate stock
    if (cartItem.product.stock < data.quantity) {
        throw new api_error_1.BadRequestError(`Only ${cartItem.product.stock} items available in stock`);
    }
    // Update quantity
    const updatedItem = await database_1.default.cartItem.update({
        where: {
            id: cartItem.id,
        },
        data: {
            quantity: data.quantity,
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
    return updatedItem;
};
exports.updateCartItem = updateCartItem;
/**
 * Remove item from cart
 */
const removeCartItem = async (userId, productId) => {
    // Get cart
    const cart = await database_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart) {
        throw new api_error_1.NotFoundError('Cart not found');
    }
    // Get cart item
    const cartItem = await database_1.default.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId,
            },
        },
    });
    if (!cartItem) {
        throw new api_error_1.NotFoundError('Cart item not found');
    }
    // Delete cart item
    await database_1.default.cartItem.delete({
        where: {
            id: cartItem.id,
        },
    });
};
exports.removeCartItem = removeCartItem;
/**
 * Clear cart
 */
const clearCart = async (userId) => {
    // Get cart
    const cart = await database_1.default.cart.findUnique({
        where: { userId },
    });
    if (!cart) {
        return; // Cart doesn't exist, nothing to clear
    }
    // Delete all cart items
    await database_1.default.cartItem.deleteMany({
        where: {
            cartId: cart.id,
        },
    });
};
exports.clearCart = clearCart;
//# sourceMappingURL=cart.service.js.map