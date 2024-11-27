const mongoose = require('mongoose');

// Define the schema for creating hackathon
const createHackathonSchema = new mongoose.Schema({
  hackathonName: {
    type: String,
    required: true, // Required field
  },
  teamSize: {
    type: Number,
    required: true, // Required field, should be a number
  },
  registrationTimeline: {
    start: {
      type: Date,
      required: true, // Required field for registration start date
    },
    end: {
      type: Date,
      required: true, // Required field for registration end date
    },
  },
  hackathonTimeline: {
    start: {
      type: Date,
      required: true, // Required field for hackathon start date
    },
    end: {
      type: Date,
      required: true, // Required field for hackathon end date
    },
  },
  allowVideoLink: {
    type: Boolean,
    default: false, // Default value set to false
  },
  allowLiveDeploymentLink: {
    type: Boolean,
    default: false, // Default value set to false
  },
  themes: [
    {
      title: {
        type: String,
        required: true, // Required field for theme title
      },
      description: {
        type: String,
        required: true, // Required field for theme description
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

// Create a model based on the schema
const CreateHackathon = mongoose.model('CreateHackathon', createHackathonSchema);

module.exports = CreateHackathon;