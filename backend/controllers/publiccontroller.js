const userSchema=require("../models/userSchema");
const VerificationSchema=require("../models/VerificationSchema");
const ContestSchema=require("../models/ContestSchema");
const HackathonSchema=require("../models/HackathonSchema");
// const ContestRegistration=require("../models/ContestRegistrationSchema");
// const CreateContestSchema=require("../models/CreateContestSchema");// Import the student register schema
const EventSchema=require("../models/EventSchema");
const Token=require("../models/tokenSchema");
const jwt = require("jsonwebtoken");
const sendEmail=require("../helperFunctions/sendEmail");
const crypto=require("crypto");
let {  authenticatedUser } = require("../helperFunctions/publicHelper");

const registerStudent = async (req, res) => {
  const { email,roll, pass } = req.body;  // Extract the required data from the request body

  if (!email || !roll || !pass) {
    return res.status(400).json({
      message: "Email, collegeRollNumber, and password are required",
    });
  }

  try {
    // Check if the student exists in the studentMain schema
    const existingStudent = await VerificationSchema.findOne({ email, roll });
    
    const newexistingStudent=await userSchema.findOne({email,roll});
    
    if(!existingStudent){
        return res.status(409).json({
            message: "Student with this email and roll number is not eligible for  registration",
          });

    }
    if (newexistingStudent ) {
      return res.status(409).json({
        message: "Student with this email and roll number is already registered",
      });
    }

    // Create a new student document using the studentRegister model
    const newStudent = new userSchema({
      email,
      roll,
      pass,
    });

    // Save the student registration
    const savedStudent = await newStudent.save();
        const token=await new Token({
          uId:savedStudent._id,
          token:crypto.randomBytes(32).toString("hex")
        }).save();
       
        const url=`${process.env.BASE_URL}users/${savedStudent._id}/verify/${token.token}`;
      
       await sendEmail(savedStudent.email,"Verify Email",url);
       
    res.status(201).json({
      message: "An Email sent to your account please verify",
      student: savedStudent,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to register student",
      error: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  const { userType } = req.params;
  const { userid, pass } = req.body;
 console.log(userType);
 console.log(userid);
 console.log(pass);
  // Check if userid and password are provided
  if (!userid || !pass) {
      return res.status(404).json({ error: 'Username and password are required.' });
  }
  // User authentication successful, generate JWT token
  let user = await authenticatedUser(userType, userid, pass);
  if (user ) {
    if(userType=='student' &&  !user.isVerified ){
      let token=await Token.findOne({uId:user._id});
      if(!token){
        token=await new Token({
          uId:user._id,
          token:crypto.randomBytes(32).toString("hex")
        }).save();
        
        const url=`${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
       
       const p= await sendEmail(user.email,"Verify Email",url);
       console.log(p);

      }

    }
      const tokene= jwt.sign({ userid }, 'fingerprint_customer');
      // req.session.authorization = {
      //     token, userid
      // }
      return res.status(200).json({ userid, userType, tokene});
  }
  else {
      return res.status(400).json({ error: "Invalid Login,User not registered" });
  }
}
const showHackathons=async(req,res)=>{
  try {
    const hackathons = await HackathonSchema.find().sort({ 'hackTime.start': -1 });
    res.json(hackathons);
} catch (err) {
    res.status(500).json({ message: err.message });
}



}

const showContest=async(req,res)=>{
try{
const contests=await ContestSchema.find().sort({'startTime':-1});

res.json(contests);


}catch(err){
  res.status(500).json({ message: err.message });


}



}
const getUserRegisteredHackathons = async (req, res) => {
  const userEmail = req.query.email; // Assuming the auth route sets req.user

  try {
    const user = await userSchema.findOne({ email: userEmail });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hackathons = user.hackhist.filter(
      (hack) =>
        hack.teamLeader.email === userEmail ||
        hack.teamMembers.some((member) => member.email === userEmail)
    );

    // Respond with the filtered hackathons
    res.status(200).json(hackathons);
  } catch (error) {
      console.error("Error fetching user registrations:", error);
      res.status(500).json({ message: "Internal server error" });
  }
}
const getUserRegisteredContests=async(req,res)=>{
const userEmail=req.query.email; 

try {
 
  const user = await userSchema.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
     
        const registeredContests = user.cnthis.map((contest) => ({
          contestId: contest.cntid,
          points: contest.point || 0, // Default points to 0 if not set
          submissions: contest.submiss, // Include submissions for the contest
      }));
console.log(registeredContests);
      res.status(200).json({ registeredContests });
} catch (error) {
    console.error("Error fetching user registrations:", error);
    res.status(500).json({ message: "Internal server error" });
}


}

const getEvents=async(req,res)=>{

  
    try {
        const events = await EventSchema.find().sort({ ct: -1 }); // Fetch all events
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching events" });
    }




}
module.exports = {
  registerStudent,
  loginUser,
  getUserRegisteredHackathons,
  showHackathons,
  showContest,
  getUserRegisteredContests,
  getEvents
  
  
 
};
