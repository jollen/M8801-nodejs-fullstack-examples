const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nochat';

mongoose.set('strictQuery', true);
mongoose.connection.on('error', (err) => console.error('[MongoDB] 連線錯誤:', err));
mongoose.connection.once('open', () => console.log('[MongoDB] 已連線：', uri));

async function connect() {
  // useUnifiedTopology/Parser are default in Mongoose 8+
  await mongoose.connect(uri);
}

module.exports = { connect, mongoose };
