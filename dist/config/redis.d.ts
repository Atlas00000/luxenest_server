import { RedisClientType } from 'redis';
declare const redisClient: RedisClientType;
export declare const connectRedis: () => Promise<void>;
export declare const disconnectRedis: () => Promise<void>;
export default redisClient;
//# sourceMappingURL=redis.d.ts.map