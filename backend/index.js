// index.js

import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


// Import routes
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(json());

// MongoDB connection
const DEFAULT_LOCAL_DB = 'mongodb://localhost:27017/task-manager';
const DB_URI = process.env.MONGODB_URI || DEFAULT_LOCAL_DB;

async function connectWithFallback() {
  try {
    await connect(DB_URI);
    console.log(
      'Connected to MongoDB:',
      DB_URI === DEFAULT_LOCAL_DB ? 'local' : 'remote'
    );
  } catch (err) {
    console.error('Primary MongoDB connection failed:', err.message);
    if (DB_URI !== DEFAULT_LOCAL_DB) {
      console.log('Attempting to connect to local MongoDB...');
      try {
        await connect(DEFAULT_LOCAL_DB);
        console.log('Connected to local MongoDB');
      } catch (err2) {
        console.error('Local MongoDB connection failed:', err2.message);
      }
    }
  }
}

connectWithFallback();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
