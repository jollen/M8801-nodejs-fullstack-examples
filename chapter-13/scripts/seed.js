require('dotenv').config();
const { connect, mongoose } = require('../src/db');
const ChatMessage = require('../src/models/ChatMessage');

(async () => {
  try {
    await connect();
    await ChatMessage.deleteMany({});
    const now = Date.now();
    const docs = await ChatMessage.insertMany([
      { user: 'alice', message: 'Hello Mongo!', timestamp: new Date(now - 5000) },
      { user: 'bob', message: 'Backed by Mongoose.', timestamp: new Date(now - 3000) },
      { user: 'carol', message: 'Nice pagination.', timestamp: new Date(now - 1000) },
    ]);
    console.log('[seed] inserted:', docs.length);
  } catch (e) {
    console.error('[seed] error:', e);
  } finally {
    await mongoose.disconnect();
  }
})();
