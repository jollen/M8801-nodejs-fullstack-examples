const { mongoose } = require('../db');

const ChatMessageSchema = new mongoose.Schema({
  user: { type: String, default: 'guest', trim: true, maxlength: 64 },
  message: { type: String, required: true, trim: true, maxlength: 500 },
  timestamp: { type: Date, default: Date.now, index: true }
}, { versionKey: false });

// 索引：常用查詢（最新 N 筆）
ChatMessageSchema.index({ timestamp: -1 });
ChatMessageSchema.index({ user: 1, timestamp: -1 });

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
