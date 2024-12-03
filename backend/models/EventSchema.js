const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
    
  },
  ct: {
    type: Date,
    default: Date.now, // Automatically sets the current date/time when the document is created
  },
});

module.exports = mongoose.model('Event', EventSchema);
