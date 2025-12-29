"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderById = exports.getUserOrders = exports.createOrder = exports.calculateTax = exports.calculateShipping = void 0;
const database_1 = __importDefault(require("../config/database"));
const api_error_1 = require("../utils/api-error");
const cart_service_1 = require("./cart.service");
const TAX_RATE = 0.08; // 8% tax rate
const FREE_SHIPPING_THRESHOLD = 100; // Free shipping over $100
const STANDARD_SHIPPING_COST = 10; // Standard shipping cost
/**
 * Calculate shipping cost
 */
const calculateShipping = (subtotal) => {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        return 0;
    }
    return STANDARD_SHIPPING_COST;
};
exports.calculateShipping = calculateShipping;
/**
 * Calculate tax
 */
const calculateTax = (subtotal, shipping) => {
    return (subtotal + shipping) * TAX_RATE;
};
exports.calculateTax = calculateTax;
/**
 * Create order from cart
 */
const createOrder = async (userId, data) => {
    // Get user's cart
    const cart = await (0, cart_service_1.getCart)(userId);
    if (!cart || cart.items.length === 0) {
        throw new api_error_1.BadRequestError('Cart is empty');
    }
    // Validate all products are still available
    for (const item of cart.items) {
        if (item.product.stock < item.quantity) {
            throw new api_error_1.BadRequestError(`Insufficient stock for ${item.product.name}. Only ${item.product.stock} available.`);
        }
    }
    // Calculate totals
    let subtotal = 0;
    const orderItems = [];
    for (const cartItem of cart.items) {
        const productPrice = Number(cartItem.product.price);
        const discount = cartItem.product.discount || 0;
        const finalPrice = cartItem.product.onSale && discount > 0
            ? productPrice * (1 - discount / 100)
            : productPrice;
        const itemTotal = finalPrice * cartItem.quantity;
        subtotal += itemTotal;
        orderItems.push({
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            price: finalPrice,
        });
    }
    const shipping = (0, exports.calculateShipping)(subtotal);
    const tax = (0, exports.calculateTax)(subtotal, shipping);
    const total = subtotal + shipping + tax;
    // Create order
    const order = await database_1.default.order.create({
        data: {
            userId,
            subtotal,
            shipping,
            tax,
            total,
            shippingAddress: data.shippingAddress,
            paymentMethod: data.paymentMethod,
            status: 'PENDING',
            items: {
                create: orderItems,
            },
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
            },
        },
    });
    // Update product stock
    for (const cartItem of cart.items) {
        await database_1.default.product.update({
            where: { id: cartItem.productId },
            data: {
                stock: {
                    decrement: cartItem.quantity,
                },
            },
        });
    }
    // Clear cart
    await (0, cart_service_1.clearCart)(userId);
    return order;
};
exports.createOrder = createOrder;
/**
 * Get user's orders
 */
const getUserOrders = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
        database_1.default.order.findMany({
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
                },
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        database_1.default.order.count({
            where: { userId },
        }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
        orders,
        meta: {
            page,
            limit,
            total,
            totalPages,
        },
    };
};
exports.getUserOrders = getUserOrders;
/**
 * Get single order by ID
 */
const getOrderById = async (userId, orderId) => {
    const order = await database_1.default.order.findUnique({
        where: { id: orderId },
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
            },
        },
    });
    if (!order) {
        throw new api_error_1.NotFoundError('Order not found');
    }
    // Verify order belongs to user (unless admin)
    if (order.userId !== userId) {
        throw new api_error_1.NotFoundError('Order not found');
    }
    return order;
};
exports.getOrderById = getOrderById;
/**
 * Update order status (admin only)
 */
const updateOrderStatus = async (orderId, status) => {
    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
        throw new api_error_1.BadRequestError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    const order = await database_1.default.order.findUnique({
        where: { id: orderId },
    });
    if (!order) {
        throw new api_error_1.NotFoundError('Order not found');
    }
    // If cancelling, restore product stock
    if (status === 'CANCELLED' && order.status !== 'CANCELLED') {
        const orderItems = await database_1.default.orderItem.findMany({
            where: { orderId },
        });
        for (const item of orderItems) {
            await database_1.default.product.update({
                where: { id: item.productId },
                data: {
                    stock: {
                        increment: item.quantity,
                    },
                },
            });
        }
    }
    const updatedOrder = await database_1.default.order.update({
        where: { id: orderId },
        data: { status: status },
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
            },
        },
    });
    return updatedOrder;
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=order.service.js.map