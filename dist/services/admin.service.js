"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminProducts = exports.getAdminUsers = exports.getAdminOrders = exports.getAdminStats = void 0;
const database_1 = __importDefault(require("../config/database"));
const cache_util_1 = require("../utils/cache.util");
/**
 * Get admin dashboard statistics
 */
const getAdminStats = async (dateRange = '30d') => {
    // Try cache first
    const cacheKey = cache_util_1.CacheKeys.adminStats(dateRange);
    const cached = await (0, cache_util_1.getCache)(cacheKey);
    if (cached) {
        return cached;
    }
    // Calculate date range
    const now = new Date();
    let startDate;
    switch (dateRange) {
        case '7d':
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
        case '30d':
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
        case '90d':
            startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            break;
        case '1y':
            startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            break;
        default:
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    // Get revenue (from orders)
    const orders = await database_1.default.order.findMany({
        where: {
            createdAt: { gte: startDate },
            status: { not: 'CANCELLED' },
        },
        select: {
            total: true,
            createdAt: true,
        },
    });
    const revenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
    const orderCount = orders.length;
    // Get total users
    const totalUsers = await database_1.default.user.count();
    // Get new users in date range
    const newUsers = await database_1.default.user.count({
        where: {
            createdAt: { gte: startDate },
        },
    });
    // Get total products
    const totalProducts = await database_1.default.product.count();
    // Get low stock products (stock < 10)
    const lowStockProducts = await database_1.default.product.count({
        where: {
            stock: { lt: 10 },
        },
    });
    // Get total orders (all time)
    const totalOrders = await database_1.default.order.count({
        where: {
            status: { not: 'CANCELLED' },
        },
    });
    // Get orders by status
    const ordersByStatus = await database_1.default.order.groupBy({
        by: ['status'],
        _count: {
            id: true,
        },
    });
    // Calculate average order value
    const averageOrderValue = orderCount > 0 ? revenue / orderCount : 0;
    // Get revenue growth (compare with previous period)
    const previousStartDate = new Date(startDate.getTime() - (now.getTime() - startDate.getTime()));
    const previousOrders = await database_1.default.order.findMany({
        where: {
            createdAt: { gte: previousStartDate, lt: startDate },
            status: { not: 'CANCELLED' },
        },
        select: {
            total: true,
        },
    });
    const previousRevenue = previousOrders.reduce((sum, order) => sum + Number(order.total), 0);
    const revenueGrowth = previousRevenue > 0
        ? ((revenue - previousRevenue) / previousRevenue) * 100
        : 0;
    const stats = {
        revenue: {
            total: revenue,
            growth: revenueGrowth,
            averageOrderValue,
        },
        orders: {
            total: totalOrders,
            recent: orderCount,
            byStatus: ordersByStatus.reduce((acc, item) => {
                acc[item.status] = item._count.id;
                return acc;
            }, {}),
        },
        users: {
            total: totalUsers,
            new: newUsers,
        },
        products: {
            total: totalProducts,
            lowStock: lowStockProducts,
        },
    };
    // Cache stats (short TTL since stats change frequently)
    await (0, cache_util_1.setCache)(cacheKey, stats, cache_util_1.CACHE_TTL.SHORT);
    return stats;
};
exports.getAdminStats = getAdminStats;
/**
 * Get all orders for admin (with filters)
 */
const getAdminOrders = async (page = 1, limit = 20, status, startDate, endDate) => {
    const skip = (page - 1) * limit;
    const where = {};
    if (status) {
        where.status = status;
    }
    if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) {
            where.createdAt.gte = startDate;
        }
        if (endDate) {
            where.createdAt.lte = endDate;
        }
    }
    const [orders, total] = await Promise.all([
        database_1.default.order.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                images: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        database_1.default.order.count({ where }),
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
exports.getAdminOrders = getAdminOrders;
/**
 * Get all users for admin
 */
const getAdminUsers = async (page = 1, limit = 20, search) => {
    const skip = (page - 1) * limit;
    const where = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
        ];
    }
    const [users, total] = await Promise.all([
        database_1.default.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatar: true,
                emailVerified: true,
                createdAt: true,
                _count: {
                    select: {
                        orders: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        database_1.default.user.count({ where }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
        users,
        meta: {
            page,
            limit,
            total,
            totalPages,
        },
    };
};
exports.getAdminUsers = getAdminUsers;
/**
 * Get all products for admin
 */
const getAdminProducts = async (page = 1, limit = 20, search, lowStock) => {
    const skip = (page - 1) * limit;
    const where = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
        ];
    }
    if (lowStock) {
        where.stock = { lt: 10 };
    }
    const [products, total] = await Promise.all([
        database_1.default.product.findMany({
            where,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                _count: {
                    select: {
                        reviews: true,
                        cartItems: true,
                        wishlistItems: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        database_1.default.product.count({ where }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
        products,
        meta: {
            page,
            limit,
            total,
            totalPages,
        },
    };
};
exports.getAdminProducts = getAdminProducts;
//# sourceMappingURL=admin.service.js.map