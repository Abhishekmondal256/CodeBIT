const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  tit: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  ctEmail: { // Replaced 'contDet' with specific contact fields
    type: String,
    required: true,
  },
  ctPhone: { // Added for better clarity and separation
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  org: [
    {
      name: {
        type: String,
        required: true,
      },
      cont: {
        type: String,
        required: true,
      },
    },
  ],
  ct: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);