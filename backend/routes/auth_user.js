const express = require("express");
const router= express.Router();
const {registerMain,hackathonCreate}=require("../controllers/admincontroller");

router.post("/registermain",registerMain);
router.post("/hackathon/create",hackathonCreate);
module.exports= router;