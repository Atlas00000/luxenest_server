"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultiple = exports.uploadSingle = void 0;
const upload_service_1 = require("../services/upload.service");
const api_response_1 = require("../utils/api-response");
const api_error_1 = require("../utils/api-error");
/**
 * Upload single file
 */
const uploadSingle = (req, res, next) => {
    upload_service_1.upload.single('file')(req, res, (err) => {
        if (err) {
            return next(err);
        }
        if (!req.file) {
            return next(new api_error_1.BadRequestError('No file uploaded'));
        }
        const fileUrl = (0, upload_service_1.getFileUrl)(req.file.filename);
        (0, api_response_1.sendSuccess)(res, {
            filename: req.file.filename,
            originalName: req.file.originalname,
            url: fileUrl,
            size: req.file.size,
            mimetype: req.file.mimetype,
        }, 'File uploaded successfully');
    });
};
exports.uploadSingle = uploadSingle;
/**
 * Upload multiple files
 */
const uploadMultiple = (req, res, next) => {
    upload_service_1.upload.array('files', 10)(req, res, (err) => {
        if (err) {
            return next(err);
        }
        if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
            return next(new api_error_1.BadRequestError('No files uploaded'));
        }
        if (!Array.isArray(req.files)) {
            return next(new api_error_1.BadRequestError('Invalid files format'));
        }
        const uploadedFiles = req.files.map((file) => {
            const filename = file.filename;
            return {
                filename,
                originalName: file.originalname,
                url: (0, upload_service_1.getFileUrl)(filename),
                size: file.size,
                mimetype: file.mimetype,
            };
        });
        (0, api_response_1.sendSuccess)(res, uploadedFiles, 'Files uploaded successfully');
    });
};
exports.uploadMultiple = uploadMultiple;
//# sourceMappingURL=upload.controller.js.map