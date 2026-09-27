require('dotenv').config();
const { connectDB, closeDB } = require('../config/db');
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const { sampleUsers, sampleServices } = require('./seedData');

const runSeed = async () => {
  try {
    console.log('[Seed] Connecting to database...');
    await connectDB();

    console.log('[Seed] Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Booking.deleteMany({})
    ]);

    console.log(`[Seed] Inserting ${sampleUsers.length} users...`);
    // Create users individually to trigger pre-save bcrypt hook
    const createdUsers = [];
    for (const u of sampleUsers) {
      const user = await User.create(u);
      createdUsers.push(user);
    }

    const userMap = {};
    createdUsers.forEach((u) => {
      userMap[u.email] = u;
    });

    console.log(`[Seed] Inserting ${sampleServices.length} services...`);
    const servicesToInsert = sampleServices.map((s) => {
      const provider = userMap[s.providerEmail];
      if (!provider) {
        throw new Error(`Provider with email ${s.providerEmail} not found in seeded users.`);
      }
      return {
        ...s,
        providerId: provider._id
      };
    });

    const createdServices = await Service.insertMany(servicesToInsert);
    console.log(`[Seed] Inserted ${createdServices.length} services successfully.`);

    // Seed sample bookings for customer Aarav Sharma
    const customerAarav = userMap['customer@serveeasy.in'];
    const customerAnanya = userMap['ananya@example.com'];
    const providerRajesh = userMap['provider@serveeasy.in'];
    const providerSunita = userMap['sunita@serveeasy.in'];
    const providerAmit = userMap['amit@serveeasy.in'];

    const acService = createdServices.find((s) => s.title.includes('Split AC'));
    const cleaningService = createdServices.find((s) => s.title.includes('Full Home Deep Cleaning'));
    const plumbingService = createdServices.find((s) => s.title.includes('Tap, Shower'));
    const fridgeService = createdServices.find((s) => s.title.includes('Double-Door Refrigerator'));

    const sampleBookings = [
      {
        customerId: customerAarav._id,
        providerId: providerRajesh._id,
        serviceId: acService._id,
        date: '2026-10-02',
        timeSlot: '10:00 AM - 12:00 PM',
        address: {
          street: 'Flat 402, Green Glen Layout, Bellandur',
          city: 'Bengaluru',
          pincode: '560103',
          landmark: 'Near Bellandur Central Mall & EcoSpace',
          coordinates: { lat: 12.9279, lng: 77.6718 }
        },
        customerPhone: '+91 98201 12345',
        notes: 'AC outdoor unit is accessible via the utility balcony. Please bring ladder.',
        photos: {
          before: [
            {
              url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
              caption: 'Dirty indoor blower wheel and clogged cooling fins',
              uploadedAt: new Date(Date.now() - 86400000)
            }
          ],
          after: []
        },
        totalPrice: acService.price,
        status: 'pending'
      },
      {
        customerId: customerAarav._id,
        providerId: providerSunita._id,
        serviceId: cleaningService._id,
        date: '2026-10-05',
        timeSlot: '09:00 AM - 01:00 PM',
        address: {
          street: 'Flat 402, Green Glen Layout, Bellandur',
          city: 'Bengaluru',
          pincode: '560103',
          landmark: 'Behind Sobha Iris Apartments',
          coordinates: { lat: 12.9345, lng: 77.6680 }
        },
        customerPhone: '+91 98201 12345',
        notes: 'Need special attention to the master bathroom tiles and kitchen cabinets.',
        photos: {
          before: [
            {
              url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
              caption: 'Hard-water stains on glass enclosure and balcony grout grime',
              uploadedAt: new Date(Date.now() - 43200000)
            }
          ],
          after: []
        },
        totalPrice: cleaningService.price,
        status: 'accepted'
      },
      {
        customerId: customerAarav._id,
        providerId: providerAmit._id,
        serviceId: plumbingService._id,
        date: '2026-09-18',
        timeSlot: '02:00 PM - 03:00 PM',
        address: {
          street: 'Flat 402, Green Glen Layout, Bellandur',
          city: 'Bengaluru',
          pincode: '560103',
          landmark: 'Near Bellandur Junction',
          coordinates: { lat: 12.9279, lng: 77.6718 }
        },
        customerPhone: '+91 98201 12345',
        notes: 'Quarter turn tap mixer replaced with new cartridge.',
        photos: {
          before: [
            {
              url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
              caption: 'Pre-service: Severe dripping leak from hot-and-cold mixer spout',
              uploadedAt: new Date(Date.now() - 604800000)
            }
          ],
          after: [
            {
              url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
              caption: 'Post-service: New ceramic cartridge fitted, 100% leak-free & buffed',
              uploadedAt: new Date(Date.now() - 600000000)
            }
          ]
        },
        totalPrice: plumbingService.price,
        status: 'completed'
      },
      {
        customerId: customerAnanya._id,
        providerId: providerRajesh._id,
        serviceId: fridgeService._id,
        date: '2026-09-22',
        timeSlot: '04:00 PM - 05:00 PM',
        address: {
          street: '12B, Sea Breeze Apartments, Bandra West',
          city: 'Mumbai',
          pincode: '400050',
          landmark: 'Opposite Bandra Fort & Joggers Park',
          coordinates: { lat: 19.0596, lng: 72.8295 }
        },
        customerPhone: '+91 98450 67890',
        notes: 'Replaced defrost timer and verified compressor amperage.',
        photos: {
          before: [
            {
              url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80',
              caption: 'Before: Severe frost buildup obstructing air circulation vent',
              uploadedAt: new Date(Date.now() - 345600000)
            }
          ],
          after: [
            {
              url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80',
              caption: 'After: Heater coil replaced, airflow restored, temp optimal at 3°C',
              uploadedAt: new Date(Date.now() - 340000000)
            }
          ]
        },
        totalPrice: fridgeService.price,
        status: 'completed'
      }
    ];

    await Booking.insertMany(sampleBookings);
    console.log(`[Seed] Inserted ${sampleBookings.length} initial bookings.`);

    console.log('\n================ SEED COMPLETED SUCCESSFULLY ================');
    console.log('Demo Credentials for Instant Testing:');
    console.log('👤 Customer: customer@serveeasy.in / password123');
    console.log('🛠️ Provider: provider@serveeasy.in / password123');
    console.log('🛠️ Provider 2: sunita@serveeasy.in / password123');
    console.log('=============================================================\n');

    await closeDB();
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error during seeding:', error);
    process.exit(1);
  }
};

runSeed();
