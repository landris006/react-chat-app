import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT ?? 5000;

export const CONNECTION_STRING = process.env.CONNECTION_STRING ?? '';

export const CLIENT_ADDRESS =
  process.env.CLIENT_ADDRESS ?? 'http://localhost:3000';

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
