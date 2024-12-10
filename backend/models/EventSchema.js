const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  contactDetails: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  organizers: [
    {
      name: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
