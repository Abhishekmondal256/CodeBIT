
const mongoose = require('mongoose');

// Define the schema for hackathon team registration
const formHackathonSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true, // Team name is required
  },
  teamLeader: {
    name: {
      type: String,
      required: true, // Leader name is required
    },
    email: {
      type: String,
      required: true, // Leader email is required
      unique: true, // Ensure the leader email is unique
    },
    phone: {
      type: String,
      required: true, // Leader phone number is required
    },
  },
  teamMembers: [
    {
      name: {
        type: String,
        required: true, // Member name is required
      },
      email: {
        type: String,
        required: true, // Member email is required
        unique: true, // Ensure no duplicate emails
      },
      phone: {
        type: String,
        required: true, // Member phone number is required
      },
    },
  ],
  selectedProblem: {
    type: String,
    required: true, // Selected problem is required
  },
  projectDescription: {
    type: String,
    required: true, // Project description is required
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Create a model based on the schema
const FormHackathon = mongoose.model('FormHackathon', formHackathonSchema);

module.exports = FormHackathon;
