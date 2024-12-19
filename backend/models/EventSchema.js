const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  tit: {
    type: String,
    required: true, // Event title
  },
  desc: {
    type: String,
    required: true, // Event description
  },
  ctEmail: {
    type: String,
    required: true, // Contact email
  },
  ctPhone: {
    type: String,
    required: true, // Contact phone number
  },
  deadline: {
    type: Date,
    required: true, // Submission deadline
  },
  org: [
    {
      name: {
        type: String,
        required: true, // Organizer name
      },
      cont: {
        type: String,
        required: true, // Organizer contact
      },
    },
  ],
  announcementType: {
    type: String,
    enum: ['normal', 'hackathon', 'contest'], // Type of announcement
    required: true,
  },
  selectedEvent: {
    type: String, // Name of the selected event
  },
  winnerEmail: {
    type: String, // Winner email (required for hackathon or contest announcements)
  },
  ct: {
    type: Date,
    default: Date.now, // Creation time
  },
});

module.exports = mongoose.model('Event', EventSchema);
