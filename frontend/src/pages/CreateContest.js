import React, { useState } from "react";

const CreateContest = () => {
    const [formData, setFormData] = useState({
        contestName: "",
        startTime: "",
        endTime: "",
        challenges: [],
    });

    const [currentChallenge, setCurrentChallenge] = useState({
        challengeName: "",
        problemStatement: "",
        inputFormat: "",
        constraints: "",
        outputFormat: "",
    });

    const [isAddingChallenge, setIsAddingChallenge] = useState(false);

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleChallengeChange = (key, value) => {
        setCurrentChallenge((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleAddChallenge = () => {
        setFormData((prev) => ({
            ...prev,
            challenges: [...prev.challenges, currentChallenge],
        }));
        setCurrentChallenge({
            challengeName: "",
            problemStatement: "",
            inputFormat: "",
            constraints: "",
            outputFormat: "",
        });
        setIsAddingChallenge(false);
    };

    const handleRemoveChallenge = (index) => {
        setFormData((prev) => ({
            ...prev,
            challenges: prev.challenges.filter((_, idx) => idx !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contest Created: ", formData);
        alert("Contest and challenges submitted successfully!");

        // Reset formData and currentChallenge
        setFormData({
            contestName: "",
            startTime: "",
            endTime: "",
            challenges: [],
        });
        setCurrentChallenge({
            challengeName: "",
            problemStatement: "",
            inputFormat: "",
            constraints: "",
            outputFormat: "",
        });
    };

    return (
        <div className="min-h-screen bg-[#181C21] text-slate-300">
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-5xl font-semibold mb-8 tracking-wider text-[#0DB276]">
                    Create Contest with Challenges
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-xl font-medium mb-2">Contest Name:</label>
                        <input
                            type="text"
                            value={formData.contestName}
                            onChange={(e) => handleInputChange("contestName", e.target.value)}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xl font-medium mb-2">Start Time:</label>
                        <input
                            type="datetime-local"
                            value={formData.startTime}
                            onChange={(e) => handleInputChange("startTime", e.target.value)}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xl font-medium mb-2">End Time:</label>
                        <input
                            type="datetime-local"
                            value={formData.endTime}
                            onChange={(e) => handleInputChange("endTime", e.target.value)}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    <div className="mt-8">
                        <h3 className="text-3xl font-semibold mb-4">Challenges</h3>
                        {formData.challenges.map((challenge, index) => (
                            <div key={index} className="p-4 mb-4 rounded bg-[#212830] border border-[#0DB276]">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-2xl">{challenge.challengeName}</h4>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveChallenge(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <p className="mt-2">{challenge.problemStatement}</p>
                            </div>
                        ))}

                        {!isAddingChallenge && (
                            <button
                                type="button"
                                onClick={() => setIsAddingChallenge(true)}
                                className="mt-4 py-3 px-6 bg-[#0DB276] hover:bg-green-600 text-white font-semibold tracking-wide rounded"
                            >
                                Add Challenge
                            </button>
                        )}

                        {isAddingChallenge && (
                            <div className="p-4 mt-4 rounded bg-[#212830] border border-[#0DB276]">
                                <h4 className="text-2xl mb-4">New Challenge</h4>
                                <div>
                                    <label className="block text-lg mb-2">Challenge Name:</label>
                                    <input
                                        type="text"
                                        value={currentChallenge.challengeName}
                                        onChange={(e) => handleChallengeChange("challengeName", e.target.value)}
                                        className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg mb-2">Problem Statement:</label>
                                    <textarea
                                        value={currentChallenge.problemStatement}
                                        onChange={(e) => handleChallengeChange("problemStatement", e.target.value)}
                                        className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-lg mb-2">Input Format:</label>
                                    <textarea
                                        value={currentChallenge.inputFormat}
                                        onChange={(e) => handleChallengeChange("inputFormat", e.target.value)}
                                        className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-lg mb-2">Constraints:</label>
                                    <textarea
                                        value={currentChallenge.constraints}
                                        onChange={(e) => handleChallengeChange("constraints", e.target.value)}
                                        className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-lg mb-2">Output Format:</label>
                                    <textarea
                                        value={currentChallenge.outputFormat}
                                        onChange={(e) => handleChallengeChange("outputFormat", e.target.value)}
                                        className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                                    ></textarea>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        type="button"
                                        onClick={handleAddChallenge}
                                        className="py-2 px-4 bg-[#0DB276] hover:bg-green-600 text-white font-semibold tracking-wide rounded"
                                    >
                                        Save Challenge
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingChallenge(false)}
                                        className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-semibold tracking-wide rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#0DB276] hover:bg-green-600 text-white font-semibold tracking-wide rounded"
                    >
                        Create Contest
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateContest;
