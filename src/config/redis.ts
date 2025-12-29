import { createClient, RedisClientType } from 'redis';

const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
}) as RedisClientType;

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('Redis Client Connecting...');
});

redisClient.on('ready', () => {
  console.log('✅ Redis connected successfully');
});

// Connect to Redis
export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('❌ Redis connection error:', error);
    // Don't exit process - Redis is optional for caching
  }
};

// Disconnect from Redis
export const disconnectRedis = async (): Promise<void> => {
  await redisClient.quit();
  console.log('Redis disconnected');
};

export default redisClient;

