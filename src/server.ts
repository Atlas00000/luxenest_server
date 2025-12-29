import dotenv from 'dotenv';
import { startServer } from './app';

// Load environment variables
dotenv.config();

// Start the server
startServer().catch((error) => {
  console.error('Fatal error starting server:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

