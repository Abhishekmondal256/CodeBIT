const StudentSchema=require("../models/StudentSchema");
const CreateHackathonSchema =require("../models/CreateHackathonSchema");
const StudentRegisterSchema=require("../models/StudentRegisterSchema");
const FormHackathon=require("../models/FormHackathon");
const ProjectSubmission=require("../models/ProjectSubmission");
const CreateContestSchema=require("../models/CreateContestSchema");
const ContestRegistration=require("../models/ContestRegistrationSchema");
const registerMain = async(req, res) => {
    const { collegeRollNumber, email } = req.body; // Extract user data from the request body
    if (!collegeRollNumber|| !email) {
        return res.status(400).json({
          message: "rollNumber and email are required",
        });
      }
    // Create a new student document using the Student model
    try {
        // Check for duplicates before saving
        
        const existingStudent = await StudentSchema.findOne({ collegeRollNumber });
        if (existingStudent) {
          return res.status(409).json({ message: "College Roll Number already exists" });
        }
    
        const newStudent = new StudentSchema({ collegeRollNumber, email });
        const savedStudent = await newStudent.save();
    
        res.status(201).json({ message: "Student added successfully", student: savedStudent });
      } catch (error) {
        res.status(500).json({ message: "Failed to add student", error: error.message });
      }
   
      
};



//use for postman sending request in array of json
// const StudentSchema = require("../models/StudentSchema");

// const registerMain = async (req, res) => {
//     const students = req.body; // Expecting an array of student objects

//     // Validate that the request contains an array
//     if (!Array.isArray(students)) {
//         return res.status(400).json({ message: "Input should be an array of student objects" });
//     }

//     try {
//         const savedStudents = [];
//         for (const studentData of students) {
//             const { collegeRollNumber, email } = studentData;

//             // Validate each student object
//             if (!collegeRollNumber || !email) {
//                 return res.status(400).json({ message: "collegeRollNumber and email are required for each student" });
//             }

//             // Check for duplicates
//             const existingStudent = await StudentSchema.findOne({ collegeRollNumber });
//             if (existingStudent) {
//                 return res.status(409).json({
//                     message: `College Roll Number ${collegeRollNumber} already exists`,
//                 });
//             }

//             // Save student
//             const newStudent = new StudentSchema({ collegeRollNumber, email });
//             const savedStudent = await newStudent.save();
//             savedStudents.push(savedStudent);
//         }

//         res.status(201).json({ message: "Students added successfully", students: savedStudents });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to add students", error: error.message });
//     }
// };

// module.exports = { registerMain };



const hackathonCreate = async (req, res) => {
    try {
        // Extract hackathon details from the request body
        

        const {
            hackathonName,
            teamSize,
            registrationTimeline,
            hackathonTimeline,
            allowVideoLink,
            allowLiveDeploymentLink,
            themes,
        } = req.body;
     
        // Validate required fields
        if (!hackathonName || !teamSize || !registrationTimeline || !hackathonTimeline || !themes) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }
       
        // Check registration and hackathon timelines
        if (new Date(registrationTimeline.start) > new Date(registrationTimeline.end)) {
            return res
                .status(400)
                .json({ error: "Registration start date cannot be later than the end date" });
        }
       
        if (new Date(hackathonTimeline.start) > new Date(hackathonTimeline.end)) {
            return res
                .status(400)
                .json({ error: "Hackathon start date cannot be later than the end date" });
        }
        
      

        // Create a new hackathon instance
        const newHackathon = new CreateHackathonSchema({
            hackathonName,
            teamSize,
            registrationTimeline,
            hackathonTimeline,
            allowVideoLink,
            allowLiveDeploymentLink,
            themes,
        });
       
        // Save the hackathon to the database
        const savedHackathon = await newHackathon.save();
       
        // Respond with the created hackathon
        res.status(201).json({
            message: "Hackathon created successfully",
            hackathon: savedHackathon,
        });
    } catch (error) {
        console.error("Error creating hackathon:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getThemes=async(req,res)=>{
  
    try {
      const { id } = req.params;
       
      // Validate ObjectId
      

      const hackathon = await CreateHackathonSchema.findById(id);
      if (!hackathon) {
          return res.status(404).json({ message: "Hackathon not found" });
      }

      res.status(200).json({ themes: hackathon.themes });
  
} 
catch (error) {
  console.error("Error fetching hackathon themes:", error);
  res.status(500).json({ message: "Server error" });
}



}


  
  const teamRegister = async (req, res) => {
      try {
          // Extract the hackathon ID from route parameters
          
          const { id} = req.params;
        
          // Extract the team registration data from the request body
          const {
              teamName,
              teamLeader,
              teamMembers,
              selectedProblem,
              projectDescription,
          } = req.body;
         
          // Validate the required fields
          if (!teamName || !teamLeader || !teamLeader.email || !selectedProblem) {
              return res.status(400).json({ error: 'Missing required fields.' });
          }
  
          // Verify the hackathon exists in the CreateHackathon collection
          const hackathon = await CreateHackathonSchema.findById({_id:id});
          
          if (!hackathon) {
              return res.status(404).json({ error: 'Hackathon not found.' });
          }
  
          // Ensure the team leader email is unique
          const existingTeam = await FormHackathon.findOne({ 'teamLeader.email': teamLeader.email });
          // console.log(existingTeam);
          if (existingTeam) {
              return res.status(409).json({ error: 'Team leader email is already registered.' });
          }
  
          // Ensure no duplicate member emails
          for (const member of teamMembers) {
              const existingMember = await FormHackathon.findOne({ 'teamMembers.email': member.email });
              if (existingMember) {
                  return res.status(409).json({ error: `Team member email ${member.email} is already registered.` });
              }
          }
  
          // Create a new FormHackathon document
          const newTeam = new FormHackathon({
              hackathon: id,
              teamName,
              teamLeader,
              teamMembers,
              selectedProblem,
              projectDescription,
          });
           
          // Save the new team document
          const savedTeam = await newTeam.save();
     
          // Respond with success
          return res.status(201).json({
              message: 'Team registered successfully.',
              team: savedTeam,
          });
      } catch (error) {
          console.error('Error during team registration:', error);
          return res.status(500).json({ error: 'Internal Server Error.' });
      }
  };
  

  





const getCurrentUser=async(req,res)=>{
  const userEmail = req.user.email; // Assuming email is in req.user
  try {
      const user = await StudentRegisterSchema.findOne({ email: userEmail });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(user); // Send back user details
  } catch (error) {
      console.error("Error fetching current user:", error);
      return res.status(500).json({ error: 'Server error' });
  }

}
const projectSubmit=async(req,res)=>{
    console.log("yaha pe");
    const { projectName, description, githubLink, videoLink, liveLink, hackathonId, teamLeader,
        teamMembers } = req.body;
    
    try {
        
        
        const hackathon = await FormHackathon.findOne({hackathon:hackathonId});
   
        if (!hackathon) {
            return res.status(404).json({ message: 'Hackathon not found' });
        }

        // Assuming the hackathon contains the teamLeader and teamMembers details
        const teamLeader = hackathon.teamLeader; // Get the team leader details from the hackathon document
        const teamMembers = hackathon.teamMembers; // Get all team members for the hackathon

        // Validate the teamMembers submitted by the user (you may want to validate if the user is part of the team)
        if (teamMembers.length !== teamMembers.length) {
            return res.status(400).json({ message: 'The number of team members does not match the hackathon team size' });
        }
   
        const projectSubmission = new ProjectSubmission({
            projectName,
            description,
            githubLink,
            videoLink,
            liveLink,
            hackathon: hackathonId,
            teamLeader,
            teamMembers,
        });
        
        await projectSubmission.save();
      
        res.status(201).json({
            message: 'Project submitted successfully!',
            projectSubmission,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error('Validation Error:', error.errors);
        } else {
            console.error('Error:', error);
        }
        res.status(500).json({ message: 'Error submitting project', error: error.message });
    }



}

const checkProjectSubmission = async (req, res) => {
    const { hackathonId, email } = req.query; // Accept hackathon ID and user email in the query params
  
    try {
      // Check if a project exists for the given hackathon and email
      const submission = await ProjectSubmission.findOne({
        hackathon: hackathonId,
        $or: [
            { 'teamLeader.email': email }, // Match with the team leader email
            { 'teamMembers.email': email } 
        ],
      });
 
      if (submission) {
        return res.status(200).json({ submitted: true, project: submission });
      } else {
        return res.status(200).json({ submitted: false });
      }
    } catch (error) {
      console.error("Error checking project submission:", error);
      res.status(500).json({ message: "Internal server error" });
    }
    
}
const createContest=async(req,res)=>{

    try {
        // Extract data from request body
        const { contestName, startTime, endTime, challenges } = req.body;
     
        // Validate required fields
        if (!contestName || !startTime || !endTime) {
            return res.status(400).json({ message: "Contest name, start time, and end time are required." });
        }
        const newContest = new CreateContestSchema({
            contestName,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            challenges,
        });
        
        // Save the contest to the database
        const savedContest = await newContest.save();
           console.log(savedContest);
        // Respond with the saved contest
        res.status(201).json({ message: "Contest created successfully", contest: savedContest });
    } catch (error) {
        console.error("Error creating contest:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }



}
const contestRegister=async(req,res)=>{
    const { email, contestId } = req.body;
    try {
      console.log(email);
      console.log(contestId);
      // Check if user already registered
      const existingRegistration = await ContestRegistration.findOne({ email, contestId });
      if (existingRegistration) {
          return res.status(400).json({ message: "Already registered for this contest." });
      }
  
      // Register user
      const newRegistration = new ContestRegistration({
          email,
          contestId,
      });
      console.log(newRegistration);
      await newRegistration.save();
      console.log("hogya kaam");
      res.status(201).json({ message: "Registered successfully." });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
  
  
  
  
  }


module.exports = {
  registerMain,
  hackathonCreate,
  getThemes,
  teamRegister,
  getCurrentUser,
  projectSubmit,
  checkProjectSubmission,
  createContest,
  contestRegister
};