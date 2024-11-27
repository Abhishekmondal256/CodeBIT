const mongoose = require('mongoose');

// Define the schema for student registration
const studentRegisterSchema = new mongoose.Schema({
  collegeRollNumber: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate roll numbers
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
  },
  
  password: {
    type: String,
    required: true,
    minlength: 6, // Enforces a minimum password length
  },
  isVerified: {
    type: Boolean,
    default: false, // Defaults to false (not verified)
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

// Create a model based on the schema
const studentRegister = mongoose.model('StudentRegister', studentRegisterSchema);

module.exports = studentRegister;