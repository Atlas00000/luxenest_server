"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPaginated = exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data, message, statusCode = 200) => {
    const response = {
        success: true,
        ...(data && { data }),
        ...(message && { message }),
    };
    return res.status(statusCode).json(response);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message, statusCode = 500) => {
    const response = {
        success: false,
        error: message,
    };
    return res.status(statusCode).json(response);
};
exports.sendError = sendError;
const sendPaginated = (res, data, meta, message) => {
    const totalPages = Math.ceil(meta.total / meta.limit);
    const response = {
        success: true,
        data,
        ...(message && { message }),
        meta: {
            page: meta.page,
            limit: meta.limit,
            total: meta.total,
            totalPages,
        },
    };
    return res.status(200).json(response);
};
exports.sendPaginated = sendPaginated;
//# sourceMappingURL=api-response.js.map