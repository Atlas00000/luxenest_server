"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
// Connect to database
const connectDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    }
    catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
// Disconnect from database
const disconnectDatabase = async () => {
    await prisma.$disconnect();
    console.log('Database disconnected');
};
exports.disconnectDatabase = disconnectDatabase;
exports.default = prisma;
//# sourceMappingURL=database.js.map