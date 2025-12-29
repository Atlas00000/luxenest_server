"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database");
const redis_1 = require("./redis");
dotenv_1.default.config();
async function testConnections() {
    console.log('🔍 Testing database and Redis connections...\n');
    // Test Database Connection
    try {
        await (0, database_1.connectDatabase)();
        console.log('✅ Database connection test passed\n');
    }
    catch (error) {
        console.error('❌ Database connection test failed:', error);
        process.exit(1);
    }
    // Test Redis Connection
    try {
        await (0, redis_1.connectRedis)();
        console.log('✅ Redis connection test passed\n');
    }
    catch (error) {
        console.error('⚠️  Redis connection test failed (non-critical):', error);
    }
    // Cleanup
    await (0, database_1.disconnectDatabase)();
    await (0, redis_1.disconnectRedis)();
    console.log('✅ All connection tests completed');
    process.exit(0);
}
testConnections();
//# sourceMappingURL=test-connections.js.map