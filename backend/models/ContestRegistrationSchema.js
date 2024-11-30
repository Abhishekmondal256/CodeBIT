const mongoose = require("mongoose");
const CreateContestSchema=require("./CreateContestSchema");
const contestRegistrationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        
       
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the creation time
    },
    contestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CreateContestSchema", // Reference to the CreateContest schema
        required: true
    }
});

module.exports = mongoose.model("ContestRegistration", contestRegistrationSchema);
