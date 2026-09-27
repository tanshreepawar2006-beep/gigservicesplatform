const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

let mongoMemoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/serveeasy';

  try {
    // 1. Attempt connecting to external/local MongoDB instance first
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`[Database] Connected to external MongoDB server: ${conn.connection.host}`);
    console.log(`[Database] MongoDB Compass Connection URI: ${uri}`);
    return conn;
  } catch (err) {
    console.log(`[Database] Standard MongoDB service not detected on port 27017 (${err.message}).`);
    console.log('[Database] Starting persistent local MongoDB instance on standard port 27017...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const dataDir = path.resolve(__dirname, '../../.mongo-data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Configure persistent storage on port 27017
      mongoMemoryServer = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          dbPath: dataDir,
          dbName: 'serveeasy'
        }
      });

      const localUri = mongoMemoryServer.getUri() + 'serveeasy';
      const conn = await mongoose.connect(localUri);

      console.log('\n========================================================================');
      console.log('🟢 LOCAL MONGODB DATABASE READY');
      console.log(`📡 Compass Connection String: mongodb://127.0.0.1:27017/serveeasy`);
      console.log(`📁 Persistent Data Folder:    ${dataDir}`);
      console.log('========================================================================\n');

      return conn;
    } catch (memErr) {
      console.warn('[Database] Could not bind to port 27017, trying dynamic port fallback...');
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongoMemoryServer = await MongoMemoryServer.create({
          instance: {
            dbName: 'serveeasy'
          }
        });
        const dynamicUri = mongoMemoryServer.getUri() + 'serveeasy';
        const conn = await mongoose.connect(dynamicUri);

        console.log('\n========================================================================');
        console.log('🟢 LOCAL MONGODB RUNNING (DYNAMIC PORT)');
        console.log(`📡 Compass Connection String: ${dynamicUri}`);
        console.log('========================================================================\n');

        return conn;
      } catch (dynamicErr) {
        console.error('[Database] Critical: Unable to start MongoDB engine:', dynamicErr.message);
        throw dynamicErr;
      }
    }
  }
};

const closeDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
      console.log('[Database] Local MongoDB server stopped cleanly.');
    }
  } catch (err) {
    console.error('[Database] Error closing database:', err.message);
  }
};

// Graceful process shutdown handlers
process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDB();
  process.exit(0);
});

module.exports = { connectDB, closeDB };
