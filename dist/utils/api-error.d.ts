export declare class ApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
export declare class BadRequestError extends ApiError {
    constructor(message?: string);
}
export declare class UnauthorizedError extends ApiError {
    constructor(message?: string);
}
export declare class ForbiddenError extends ApiError {
    constructor(message?: string);
}
export declare class NotFoundError extends ApiError {
    constructor(message?: string);
}
export declare class ConflictError extends ApiError {
    constructor(message?: string);
}
export declare class InternalServerError extends ApiError {
    constructor(message?: string);
}
//# sourceMappingURL=api-error.d.ts.map