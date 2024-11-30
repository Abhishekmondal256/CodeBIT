const mongoose = require('mongoose');
const CreateHackathonSchema=require("./CreateHackathonSchema");
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
 
  },
  videoLink: {
    type: String,
    required: false, // Optional if allowVideoLink is false in hackathon
   
  },
  liveLink: {
    type: String,
    required: false, // Optional if allowLiveDeploymentLink is false in hackathon
    
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CreateHackathonSchema', // Reference to CreateHackathon model
    required: true, // Every project must be associated with a hackathon
  },
  teamLeader: {
    email: {
      type: String,
      required: true, // Team leader email is required
      
    },
    name: {
      type: String,
      required: true, // Team leader name is required
    },
  },
  teamMembers: [
    {
      email: {
        type: String,
        required: true, // Each team member email is required
      
      },
      name: {
        type: String,
        required: true, // Each team member name is required
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

// Create a model based on the schema
const ProjectSubmission = mongoose.model('ProjectSubmission', projectSubmissionSchema);

module.exports = ProjectSubmission;
