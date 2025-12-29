"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomByIdController = exports.getRoomsController = void 0;
const room_service_1 = require("../services/room.service");
const api_response_1 = require("../utils/api-response");
/**
 * Get all rooms
 */
const getRoomsController = async (_req, res, next) => {
    try {
        const rooms = await (0, room_service_1.getRooms)();
        (0, api_response_1.sendSuccess)(res, rooms, 'Rooms retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getRoomsController = getRoomsController;
/**
 * Get single room by ID
 */
const getRoomByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const room = await (0, room_service_1.getRoomById)(id);
        (0, api_response_1.sendSuccess)(res, room, 'Room retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.getRoomByIdController = getRoomByIdController;
//# sourceMappingURL=room.controller.js.map