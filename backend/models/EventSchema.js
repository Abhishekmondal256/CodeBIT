const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  tit: {
    type: String,
    required: true,
  },
  desc: { // Updated field name to match the "Description" input in the form
    type: String,
    required: true,
  },
  eType: { // Added field for event type (Contest or Hackathon)
    type: String,
    enum: ['Contest', 'Hackathon'],
    required: true,
  },
  contDet: { // Retained as it matches the "Contact Details" input
    type: String,
    required: true,
  },
  deadline: { // Matches the "Deadline" input
    type: Date,
    required: true,
  },
  org: [ // Matches the array of organizers with name and contact
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
  ct: { // Default field for creation timestamp
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
