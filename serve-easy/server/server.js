const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: '*', // Allow all origins for dev/demo; configure specific domains in production
    credentials: true
  })
);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ServeEasy API', timestamp: new Date() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('ServeEasy API Server is running');
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'API Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`ServeEasy Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
