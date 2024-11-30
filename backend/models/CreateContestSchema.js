const mongoose = require("mongoose");

const CreateContestSchema = new mongoose.Schema({
    contestName: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    challenges: [
        {
            challengeName: { type: String, required: true },
            problemStatement: { type: String, required: true },
            inputFormat: { type: String, required: true },
            constraints: { type: String, required: true },
            outputFormat: { type: String, required: true },
        },
    ],
    createdAt: { type: Date, default: Date.now }, // Automatically sets the creation time
});

module.exports = mongoose.model("Contest", CreateContestSchema);
