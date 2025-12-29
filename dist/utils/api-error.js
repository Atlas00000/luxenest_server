"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
        // Maintains proper stack trace for where our error was thrown
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApiError = ApiError;
class BadRequestError extends ApiError {
    constructor(message = 'Bad request') {
        super(400, message);
        this.name = 'BadRequestError';
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends ApiError {
    constructor(message = 'Unauthorized') {
        super(401, message);
        this.name = 'UnauthorizedError';
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends ApiError {
    constructor(message = 'Forbidden') {
        super(403, message);
        this.name = 'ForbiddenError';
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends ApiError {
    constructor(message = 'Not found') {
        super(404, message);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends ApiError {
    constructor(message = 'Conflict') {
        super(409, message);
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class InternalServerError extends ApiError {
    constructor(message = 'Internal server error') {
        super(500, message);
        this.name = 'InternalServerError';
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=api-error.js.map