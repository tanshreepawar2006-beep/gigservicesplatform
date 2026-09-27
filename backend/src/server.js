require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const User = require('./models/User');
const Service = require('./models/Service');
const Booking = require('./models/Booking');
const { sampleUsers, sampleServices } = require('./seeds/seedData');

// Import routes
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Allow all for seamless dev & staging deployment
    },
    credentials: true
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'ServeEasy API is operational',
    timestamp: new Date().toISOString()
  });
});

// Database inspection endpoint for quick verification
app.get('/api/health/db', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const serviceCount = await Service.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const sampleUsersList = await User.find({}, 'name email role license').limit(5);

    res.status(200).json({
      status: 'connected',
      database: 'serveeasy',
      compassUri: 'mongodb://127.0.0.1:27017/serveeasy',
      totalRecords: {
        users: userCount,
        services: serviceCount,
        bookings: bookingCount
      },
      users: sampleUsersList
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Helper function to auto-seed if empty
const autoSeedIfEmpty = async () => {
  try {
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      console.log('[AutoSeed] Empty database detected. Seeding initial providers & services...');
      const createdUsers = [];
      for (const u of sampleUsers) {
        const user = await User.create(u);
        createdUsers.push(user);
      }

      const userMap = {};
      createdUsers.forEach((u) => {
        userMap[u.email] = u;
      });

      const servicesToInsert = sampleServices.map((s) => ({
        ...s,
        providerId: userMap[s.providerEmail]._id
      }));

      const createdServices = await Service.insertMany(servicesToInsert);

      // Create initial sample bookings
      const customerAarav = userMap['customer@serveeasy.in'];
      const providerRajesh = userMap['provider@serveeasy.in'];
      const providerSunita = userMap['sunita@serveeasy.in'];
      const acService = createdServices.find((s) => s.title.includes('Split AC'));
      const cleaningService = createdServices.find((s) => s.title.includes('Full Home Deep Cleaning'));

      if (customerAarav && providerRajesh && acService) {
        await Booking.create({
          customerId: customerAarav._id,
          providerId: providerRajesh._id,
          serviceId: acService._id,
          date: '2026-10-02',
          timeSlot: '10:00 AM - 12:00 PM',
          address: {
            street: 'Flat 402, Green Glen Layout, Bellandur',
            city: 'Bengaluru',
            pincode: '560103'
          },
          customerPhone: '+91 98201 12345',
          notes: 'AC outdoor unit is accessible via the utility balcony.',
          totalPrice: acService.price,
          status: 'pending'
        });
      }

      if (customerAarav && providerSunita && cleaningService) {
        await Booking.create({
          customerId: customerAarav._id,
          providerId: providerSunita._id,
          serviceId: cleaningService._id,
          date: '2026-10-05',
          timeSlot: '09:00 AM - 01:00 PM',
          address: {
            street: 'Flat 402, Green Glen Layout, Bellandur',
            city: 'Bengaluru',
            pincode: '560103'
          },
          customerPhone: '+91 98201 12345',
          notes: 'Deep cleaning with machine floor scrub.',
          totalPrice: cleaningService.price,
          status: 'accepted'
        });
      }

      console.log('[AutoSeed] Seeded successfully! Ready for demonstration.');
    }
  } catch (err) {
    console.error('[AutoSeed] Failed auto-seeding:', err.message);
  }
};

const PORT = process.env.PORT || 5000;

// Connect to DB then start server
connectDB().then(async () => {
  await autoSeedIfEmpty();
  app.listen(PORT, () => {
    console.log(`🚀 ServeEasy Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
