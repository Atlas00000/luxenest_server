"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.getFileUrl = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const api_error_1 = require("../utils/api-error");
// Create uploads directory if it doesn't exist
const uploadsDir = path_1.default.join(process.cwd(), 'server', 'uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
// Configure storage
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});
// File filter for images only
const fileFilter = (_req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new api_error_1.BadRequestError('Invalid file type. Only images are allowed.'));
    }
};
// Configure multer
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});
/**
 * Get file URL (for local storage, returns relative path)
 */
const getFileUrl = (filename) => {
    // In production, this would return a CDN URL
    // For local development, return the file path
    return `/uploads/${filename}`;
};
exports.getFileUrl = getFileUrl;
/**
 * Delete file
 */
const deleteFile = (filename) => {
    const filePath = path_1.default.join(uploadsDir, filename);
    if (fs_1.default.existsSync(filePath)) {
        fs_1.default.unlinkSync(filePath);
    }
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=upload.service.js.map