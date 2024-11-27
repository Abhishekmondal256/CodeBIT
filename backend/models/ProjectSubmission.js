const mongoose = require('mongoose');

// Define the schema for project submission
const projectSubmissionSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true, // Project name is required
  },
  description: {
    type: String,
    required: true, // Project description is required
  },
  githubLink: {
    type: String,
    required: true, // GitHub link is required
    match: [
      /^(https:\/\/github\.com\/)([A-Za-z0-9-]+)(\/[A-Za-z0-9-]+)?$/,
      'Please provide a valid GitHub repository link',
    ], // Regex to validate GitHub links
  },
  videoLink: {
    type: String,
    required: true, // Video link is required
    match: [
      /^(https:\/\/www\.youtube\.com\/watch\?v=)([A-Za-z0-9_-]+)$/,
      'Please provide a valid YouTube video link',
    ], // Regex to validate YouTube links
  },
  liveLink: {
    type: String,
    required: true, // Live deployment link is required
    match: [
      /^(https:\/\/)(www\.)?[a-z0-9]+\.[a-z]+/,
      'Please provide a valid live deployment link',
    ], // Regex to validate live link (basic validation)
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

// Create a model based on the schema
const ProjectSubmission = mongoose.model('ProjectSubmission', projectSubmissionSchema);

module.exports = ProjectSubmission;