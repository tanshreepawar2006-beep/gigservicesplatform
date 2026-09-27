const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/serveeasy';
    
    // Attempt standard connection first with 3s timeout
    try {
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      console.log(`MongoDB Connected to host: ${conn.connection.host}`);
      return conn;
    } catch (primaryErr) {
      if (process.env.MONGODB_URI) {
        throw primaryErr; // If user explicitly passed MONGODB_URI, throw error
      }
      
      console.log('Local MongoDB not available. Starting MongoDB Memory Server for seamless local execution...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB Memory Server Connected: ${mongoUri}`);
      return conn;
    }
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
