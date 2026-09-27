const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const connectDB = require('../config/db');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Service.deleteMany({});
    await Booking.deleteMany({});

    console.log('Creating sample users (Providers and Customers)...');

    // Default Password for all seed users
    const defaultPassword = 'password123';

    // Create Demo Customer
    const customer1 = await User.create({
      name: 'Rohan Deshmukh',
      email: 'customer@serveeasy.com',
      password: defaultPassword,
      role: 'customer',
      phone: '+91 98765 43210',
      city: 'Mumbai',
      bio: 'Homeowner looking for trusted local services'
    });

    const customer2 = await User.create({
      name: 'Neha Kapoor',
      email: 'neha@example.com',
      password: defaultPassword,
      role: 'customer',
      phone: '+91 98123 45678',
      city: 'Bengaluru',
      bio: 'Tech professional'
    });

    // Create 5 Service Providers
    const provider1 = await User.create({
      name: 'Rajesh Kumar',
      email: 'provider@serveeasy.com', // Primary demo provider account
      password: defaultPassword,
      role: 'provider',
      phone: '+91 99887 76655',
      city: 'Mumbai',
      bio: 'Certified HVAC & AC Repair technician with 10+ years of experience in residential and commercial cooling systems.'
    });

    const provider2 = await User.create({
      name: 'Sunita Sharma',
      email: 'sunita.cleaning@example.com',
      password: defaultPassword,
      role: 'provider',
      phone: '+91 98220 11223',
      city: 'Mumbai',
      bio: 'Founder of CleanCraft Solutions. Specializing in eco-friendly deep home cleaning and sofa sanitation.'
    });

    const provider3 = await User.create({
      name: 'Vikramaditya Rao',
      email: 'vikram.electric@example.com',
      password: defaultPassword,
      role: 'provider',
      phone: '+91 97441 55667',
      city: 'Bengaluru',
      bio: 'Master Electrician with Govt. Grade A certification. Complete house wiring, smart switchboards & safety audits.'
    });

    const provider4 = await User.create({
      name: 'Priya Verma',
      email: 'priya.beauty@example.com',
      password: defaultPassword,
      role: 'provider',
      phone: '+91 99001 22334',
      city: 'Delhi NCR',
      bio: 'Professional beautician & salon expert with 8 years experience in top salons. Hygienic single-use kits.'
    });

    const provider5 = await User.create({
      name: 'Anil Mehta',
      email: 'anil.plumbing@example.com',
      password: defaultPassword,
      role: 'provider',
      phone: '+91 98334 88990',
      city: 'Mumbai',
      bio: 'Specialist in leak detection, bathroom fittings, pressure pumps, and blockage clearance.'
    });

    console.log('Creating 12 realistic service listings...');

    const services = await Service.insertMany([
      {
        title: 'Deep AC Foam Jet Service (Split & Window)',
        category: 'AC Services',
        description: 'Complete high-pressure foam jet cleaning of indoor cooling coils, outdoor condenser, filter replacement check, drain line flushing, and temperature performance measurement.',
        price: 599,
        duration: '60 mins',
        location: 'Mumbai',
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
        rating: 4.9,
        reviewsCount: 42,
        providerId: provider1._id
      },
      {
        title: 'AC Gas Refill & Leak Detection',
        category: 'AC Services',
        description: 'Advanced nitrogen leak testing, copper pipe brazing, and 100% pure R32/R410A refrigerant gas top-up with 30 days cooling warranty.',
        price: 2199,
        duration: '90 mins',
        location: 'Mumbai',
        imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        reviewsCount: 29,
        providerId: provider1._id
      },
      {
        title: 'Full Home Deep Cleaning (2-3 BHK)',
        category: 'Cleaning',
        description: 'Comprehensive scrub & vacuuming of kitchen tiles, chimney exterior, bathroom stain removal, balcony cleaning, window tracks, and floor buffing using non-toxic chemicals.',
        price: 2499,
        duration: '4-5 hrs',
        location: 'Mumbai',
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
        rating: 4.9,
        reviewsCount: 88,
        providerId: provider2._id
      },
      {
        title: 'Sofa & Fabric Upholstery Shampooing (5 Seater)',
        category: 'Cleaning',
        description: 'Deep injection-extraction shampoo treatment to pull out deep dust mites, allergen buildup, and tough food stains. Dries within 3 hours.',
        price: 999,
        duration: '90 mins',
        location: 'Mumbai',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
        rating: 4.7,
        reviewsCount: 35,
        providerId: provider2._id
      },
      {
        title: 'Complete Bathroom Sanitation & Stain Removal',
        category: 'Cleaning',
        description: 'Hard water tile stain scrubbing, chrome tap polishing, exhaust fan degreasing, and 99.9% germ disinfection with steam cleaner.',
        price: 699,
        duration: '75 mins',
        location: 'Mumbai',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        reviewsCount: 54,
        providerId: provider2._id
      },
      {
        title: 'Smart Home Switchboard & Modular Socket Fitting',
        category: 'Electrical',
        description: 'Installation of touch smart switches, heavy appliance sockets (16A), MCB fuse check, and grounding test for safe power distribution.',
        price: 399,
        duration: '45 mins',
        location: 'Bengaluru',
        imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop',
        rating: 4.9,
        reviewsCount: 61,
        providerId: provider3._id
      },
      {
        title: 'Ceiling Fan & Chandelier Installation / Repair',
        category: 'Electrical',
        description: 'Wobble-free ceiling fan mounting, heavy decorative chandelier assembly, motor capacitor check, and speed regulator wiring.',
        price: 299,
        duration: '40 mins',
        location: 'Bengaluru',
        imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&auto=format&fit=crop',
        rating: 4.8,
        reviewsCount: 47,
        providerId: provider3._id
      },
      {
        title: 'Luxury Facial & Skin Glow Treatment (At Home)',
        category: 'Grooming & Salon',
        description: 'Deep pore cleanse, organic fruit scrub, relaxing face massage, glow peel mask, and herbal steam. Includes single-use sealed hygiene kit.',
        price: 1299,
        duration: '60 mins',
        location: 'Delhi NCR',
        imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
        rating: 4.95,
        reviewsCount: 110,
        providerId: provider4._id
      },
      {
        title: 'Full Body Waxing & Mani-Pedi Combo',
        category: 'Grooming & Salon',
        description: 'Rica painless wax treatment for full arms, full legs, and underarms combined with moisturizing pedicure and manicure spa.',
        price: 1799,
        duration: '120 mins',
        location: 'Delhi NCR',
        imageUrl: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?q=80&w=800&auto=format&fit=crop',
        rating: 4.9,
        reviewsCount: 73,
        providerId: provider4._id
      },
      {
        title: 'Bathroom Tap, Mixer & Shower Leak Repair',
        category: 'Plumbing',
        description: 'Fixing dripping faucets, wall mixer replacement, concealed valve repair, and high-pressure showerhead installation with 90-day leak guarantee.',
        price: 349,
        duration: '45 mins',
        location: 'Mumbai',
        imageUrl: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=800&auto=format&fit=crop',
        rating: 4.85,
        reviewsCount: 92,
        providerId: provider5._id
      },
      {
        title: 'Drain & Sewer Line Clog Unblocking',
        category: 'Plumbing',
        description: 'High-torque drain snake motorized cleaning to remove hair, grease, and debris blockages from kitchen sinks, balcony drains, and toilets.',
        price: 699,
        duration: '60 mins',
        location: 'Mumbai',
        imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop',
        rating: 4.75,
        reviewsCount: 39,
        providerId: provider5._id
      },
      {
        title: 'Single Accent Wall Texture Painting',
        category: 'Painting',
        description: 'Premium Royal Metallic or Velvet texture paint application on 1 focal wall. Includes surface sanding, primer base coat, and floor tarp protection.',
        price: 1999,
        duration: '3-4 hrs',
        location: 'Mumbai',
        imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop',
        rating: 4.9,
        reviewsCount: 26,
        providerId: provider1._id
      }
    ]);

    console.log('Creating sample bookings...');

    await Booking.create([
      {
        customerId: customer1._id,
        providerId: provider1._id,
        serviceId: services[0]._id, // AC Foam Jet
        date: new Date(Date.now() + 86400000 * 2), // 2 days from now
        timeSlot: '11:00 AM - 01:00 PM',
        address: 'Flat 402, Sunshine Heights, Bandra West, Mumbai',
        totalAmount: 599,
        status: 'Pending',
        notes: 'Please bring a tall stepladder.'
      },
      {
        customerId: customer1._id,
        providerId: provider2._id,
        serviceId: services[2]._id, // Deep Cleaning
        date: new Date(Date.now() - 86400000 * 3), // 3 days ago
        timeSlot: '09:00 AM - 01:00 PM',
        address: 'Flat 402, Sunshine Heights, Bandra West, Mumbai',
        totalAmount: 2499,
        status: 'Completed',
        notes: 'Great service, house sparkles!'
      },
      {
        customerId: customer1._id,
        providerId: provider5._id,
        serviceId: services[9]._id, // Tap Repair
        date: new Date(Date.now() + 86400000 * 1), // tomorrow
        timeSlot: '04:00 PM - 06:00 PM',
        address: 'Flat 402, Sunshine Heights, Bandra West, Mumbai',
        totalAmount: 349,
        status: 'Accepted',
        notes: 'Master bathroom mixer drip.'
      },
      {
        customerId: customer2._id,
        providerId: provider3._id,
        serviceId: services[5]._id, // Smart Switchboard
        date: new Date(Date.now() + 86400000 * 4),
        timeSlot: '02:00 PM - 04:00 PM',
        address: 'Indiranagar 100ft Road, Bengaluru',
        totalAmount: 399,
        status: 'Pending',
        notes: 'Living room main switchboard.'
      }
    ]);

    console.log('Seed completed successfully!');
    console.log('----------------------------------------------------');
    console.log('Demo Customer Account: customer@serveeasy.com / password123');
    console.log('Demo Provider Account: provider@serveeasy.com / password123');
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
};

seedData();
