const StudentSchema=require("../models/StudentSchema");
const StudentRegisterSchema=require("../models/StudentRegisterSchema");
const CreateHackathonSchema=require("../models/CreateHackathonSchema");
// Import the student register schema
const Token=require("../models/token");
const jwt = require("jsonwebtoken");
const sendEmail=require("../helperFunctions/sendEmail");
const crypto=require("crypto");
let {  authenticatedUser } = require("../helperFunctions/publicHelper");

const registerStudent = async (req, res) => {
  const { email, collegeRollNumber, password } = req.body;  // Extract the required data from the request body

  if (!email || !collegeRollNumber || !password) {
    return res.status(400).json({
      message: "Email, collegeRollNumber, and password are required",
    });
  }

  try {
    // Check if the student exists in the studentMain schema
    const existingStudent = await StudentSchema.findOne({ email, collegeRollNumber });
    const newexistingStudent=await StudentRegisterSchema.findOne({email,collegeRollNumber});
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
    const newStudent = new StudentRegisterSchema({
      email,
      collegeRollNumber,
      password,
    });

    // Save the student registration
    const savedStudent = await newStudent.save();
        const token=await new Token({
          userId:savedStudent._id,
          token:crypto.randomBytes(32).toString("hex")
        }).save();
        
        const url=`${process.env.BASE_URL}users/${savedStudent._id}/verify/${token.token}`;
       
       const p= await sendEmail(savedStudent.email,"Verify Email",url);
       console.log(p);
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
  const { userid, password } = req.body;
 
  // Check if userid and password are provided
  if (!userid || !password) {
      return res.status(404).json({ error: 'Username and password are required.' });
  }
  // User authentication successful, generate JWT token
  let user = await authenticatedUser(userType, userid, password);
  if (user ) {
    if(userType=='student' &&  !user.isVerified ){
      let token=await Token.findOne({userId:user._id});
      if(!token){
        token=await new Token({
          userId:user._id,
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
    const hackathons = await CreateHackathonSchema.find().sort({ 'hackathonTimeline.start': -1 });
    res.json(hackathons);
} catch (err) {
    res.status(500).json({ message: err.message });
}



}
module.exports = {
  registerStudent,
  loginUser,
  showHackathons
};
