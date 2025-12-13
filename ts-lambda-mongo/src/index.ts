import serverless from 'serverless-http';
import app from './app';
import { connectDatabase } from './database';

// Initialize database connection outside handler for reuse
connectDatabase();

export const handler = serverless(app);
