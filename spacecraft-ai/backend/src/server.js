import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Route imports
import styleRoutes from './routes/styleRoutes.js';
import furnitureRoutes from './routes/furnitureRoutes.js';
import planRoutes from './routes/planRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Routes
app.use('/api/styles', styleRoutes);
app.use('/api/furniture', furnitureRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/analysis', analysisRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SpaceCraft AI Backend running on http://localhost:${PORT}`);
  console.log(`📱 Make sure frontend is connected to: http://localhost:${PORT}`);
});

export default app;
