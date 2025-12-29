"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomById = exports.getRooms = void 0;
const database_1 = __importDefault(require("../config/database"));
const api_error_1 = require("../utils/api-error");
/**
 * Get all rooms
 */
const getRooms = async () => {
    return database_1.default.room.findMany({
        orderBy: { name: 'asc' },
    });
};
exports.getRooms = getRooms;
/**
 * Get single room by ID
 */
const getRoomById = async (id) => {
    const room = await database_1.default.room.findUnique({
        where: { id },
    });
    if (!room) {
        throw new api_error_1.NotFoundError('Room not found');
    }
    return room;
};
exports.getRoomById = getRoomById;
//# sourceMappingURL=room.service.js.map