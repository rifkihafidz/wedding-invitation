const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding-invitation';

// Import routes
const guestRoutes = require('./routes/guestRoutes');

// Middleware
// Allow all origins for development
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err.message);
  });

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Wedding Invitation API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', guestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Health: http://localhost:${PORT}/api/health`);
});

module.exports = app;
