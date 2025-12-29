/**
 * Get all rooms
 */
export declare const getRooms: () => Promise<{
    name: string;
    description: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    hotspots: import("@prisma/client/runtime/library").JsonValue;
}[]>;
/**
 * Get single room by ID
 */
export declare const getRoomById: (id: string) => Promise<{
    name: string;
    description: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    hotspots: import("@prisma/client/runtime/library").JsonValue;
}>;
//# sourceMappingURL=room.service.d.ts.map