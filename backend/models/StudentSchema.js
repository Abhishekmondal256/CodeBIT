const mongoose = require('mongoose');

// Define the schema for storing email and roll number
const studentSchema = new mongoose.Schema({
 
  collegeRollNumber: {
    type: String,
    required: true,
    unique: true,// Ensures no duplicate roll numbers
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

// Create a model based on the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;