const express= require("express");
const router= express.Router();
const StudentRegisterSchema=require("../models/StudentRegisterSchema");
const Token=require("../models/token");
const {loginUser,showHackathons,registerStudent,getUserRegisteredHackathons,showContest,contestRegister,getUserRegisteredContests}=require("../controllers/publiccontroller");
router.post("/registerstudent",registerStudent);
router.post("/login/:userType",loginUser);
router.get("/hackathons",showHackathons);
router.get("/contests",showContest);
router.get("/user-registrations", getUserRegisteredHackathons);
router.get("/user-registrationscontest",getUserRegisteredContests);

router.get("/users/:id/verify/:token",async(req,res)=>{
try{
    console.log("me yaha hu");
const user=await StudentRegisterSchema.findOne({_id:req.params.id});
console.log(user);

if(!user)return res.status(400).send({message:"Invalid Link"});
const token=await Token.findOne({
userId:user._id,
token:req.params.token
});
console.log("token ayega");
console.log(token);
if(!token)return res.status(400).send({message:"Invalid Link"});
await StudentRegisterSchema.updateOne(
    { _id: user._id },         // Filter
    { $set: { isVerified: true } } // Update
);

await Token.deleteOne({ _id: token._id });

    res.status(200).send({message:"Email verified successfully"});
}catch(error){
res.status(400).send("Internal server error");

}


})
module.exports= router;