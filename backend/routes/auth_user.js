const express = require("express");
const router= express.Router();
const {registerMain,hackathonCreate,getThemes,teamRegister,getCurrentUser}=require("../controllers/admincontroller");

router.post("/registermain",registerMain);
router.post("/hackathon/create",hackathonCreate);
router.get("/teamregister/:id",getThemes);
router.post("/teamregister/:id",teamRegister);
router.get("/current-user",getCurrentUser);
module.exports= router;