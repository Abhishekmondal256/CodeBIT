const express = require("express");
const router= express.Router();
const {registerMain,hackathonCreate,getThemes,teamRegister,getCurrentUser,
    projectSubmit,checkProjectSubmission,createContest}=require("../controllers/admincontroller");

router.post("/registermain",registerMain);
router.post("/hackathon/create",hackathonCreate);
router.get("/teamregister/:id",getThemes);
router.post("/teamregister/:id",teamRegister);
router.get("/current-user",getCurrentUser);
router.post("/projects/submit",projectSubmit);


router.get("/checkProjectSubmission", checkProjectSubmission);
router.post("/createcontest",createContest);
module.exports= router;