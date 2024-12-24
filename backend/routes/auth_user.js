const express = require("express");
const router= express.Router();
const {registerMain,hackathonCreate,createContest,getThemes,teamRegister,projectSubmit,checkProjectSubmission,contestRegister,excelUpload,getContestProblems,getHackathonHistory,getContestHistory,addEvents,getHackathonData,editHackathon,deleteHackathon}=require("../controllers/admincontroller");

router.post("/registermain",registerMain);
router.post("/hackathon/create",hackathonCreate);
router.get("/teamregister/:id",getThemes);
router.post("/teamregister/:id",teamRegister);
// router.get("/current-user",getCurrentUser);
router.post("/projects/submit",projectSubmit);

router.post("/register-contest",contestRegister);
router.get("/checkProjectSubmission", checkProjectSubmission);
router.post("/createcontest",createContest);
router.post("/upload-excel",excelUpload);
router.get("/contestproblems/:id",getContestProblems);
router.get("/hackathonhist/:hackathonId",getHackathonHistory);
router.get("/contesthist/:contestId",getContestHistory);
router.post("/addevents",addEvents);
router.get("/hackathondata/:hackathonId",getHackathonData);
router.post("/edit-hackathon/:hackathonId", editHackathon);
router.delete("/deletehackathon/:hackathonId",deleteHackathon);
module.exports= router;