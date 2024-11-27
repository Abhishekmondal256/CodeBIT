const StudentSchema=require("../models/StudentSchema");
const CreateHackathonSchema =require("../models/CreateHackathonSchema");
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




module.exports = {
  registerMain,
  hackathonCreate
};