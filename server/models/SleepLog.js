const mongoose = require('mongoose');

// Simple schema for sleep data
const sleepLogSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  sleep: {
    type: String,
    required: true
  },
  wake: {
    type: String,
    required: true
  },
  hrs: {
    type: Number,
    required: true
  },
  // Automatically add createdAt and updatedAt fields
}, { timestamps: true });

module.exports = mongoose.model('SleepLog', sleepLogSchema);
