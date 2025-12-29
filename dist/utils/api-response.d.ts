import { Response } from 'express';
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}
export declare const sendSuccess: <T>(res: Response, data?: T, message?: string, statusCode?: number) => Response;
export declare const sendError: (res: Response, message: string, statusCode?: number) => Response;
export declare const sendPaginated: <T>(res: Response, data: T[], meta: {
    page: number;
    limit: number;
    total: number;
}, message?: string) => Response;
//# sourceMappingURL=api-response.d.ts.map