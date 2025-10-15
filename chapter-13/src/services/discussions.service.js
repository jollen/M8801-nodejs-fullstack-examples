const ChatMessage = require('../models/ChatMessage');

async function create({ user = 'guest', message }) {
  const text = String(message || '').trim();
  if (!text) { const err = new Error('message is required'); err.status = 400; throw err; }
  const doc = await ChatMessage.create({ user, message: text });
  return { id: String(doc._id), user: doc.user, message: doc.message, timestamp: doc.timestamp };
}

async function latest(limit = 10, skip = 0) {
  const n = Math.max(1, Math.min(100, parseInt(limit || 10, 10)));
  const s = Math.max(0, parseInt(skip || 0, 10));
  const docs = await ChatMessage.find({}).sort({ timestamp: -1 }).skip(s).limit(n).lean();
  return docs.map(d => ({ id: String(d._id), user: d.user, message: d.message, timestamp: d.timestamp }));
}

module.exports = { create, latest };
