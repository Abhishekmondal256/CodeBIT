const express = require("express");
const router= express.Router();
const {registerMain,hackathonCreate,createContest,getThemes,teamRegister,projectSubmit,checkProjectSubmission,contestRegister,excelUpload}=require("../controllers/admincontroller");

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
module.exports= router;