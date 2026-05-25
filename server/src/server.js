import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';
import { logger } from './utils/logger.js';

dotenv.config();

const port = process.env.PORT || 8080;

await connectDatabase();

createApp().listen(port, () => {
  logger.info(`NOIRTHREAD API listening on ${port}`);
});
