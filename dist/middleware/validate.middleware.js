"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const api_error_1 = require("../utils/api-error");
/**
 * Validate request body, query, or params against a Zod schema
 */
const validate = (schema) => {
    return (req, _res, next) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((err) => ({
                    path: err.path.join('.'),
                    message: err.message,
                }));
                throw new api_error_1.BadRequestError(`Validation error: ${errorMessages.map((e) => e.message).join(', ')}`);
            }
            next(error);
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.middleware.js.map