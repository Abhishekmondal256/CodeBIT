import React, { useState } from "react";

const CreateChallenge = () => {
    const [formData, setFormData] = useState({
        challengeName: "",
        problemStatement: "",
        inputFormat: "",
        constraints: "",
        outputFormat: "",
        tags: [],
        tagInput: "",
    });

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleAddTag = () => {
        if (formData.tagInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, formData.tagInput.trim()],
                tagInput: "",
            }));
        }
    };

    const handleRemoveTag = (index) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((_, idx) => idx !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Challenge Created: ", formData);
        alert("Challenge details submitted successfully!");
    };

    return (
        <div className="min-h-screen bg-[#181C21] text-slate-300">

            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-5xl font-semibold mb-8 tracking-wider text-[#0DB276]">
                    Create Challenge
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Challenge Name */}
                    <div>
                        <label className="block text-xl font-medium mb-2">
                            Challenge Name:
                        </label>
                        <input
                            type="text"
                            value={formData.challengeName}
                            onChange={(e) =>
                                handleInputChange("challengeName", e.target.value)
                            }
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    {/* Problem Statement */}
                    <div>
                        <label className="block text-xl font-medium mb-2">
                            Problem Statement:
                        </label>
                        <textarea
                            value={formData.problemStatement}
                            onChange={(e) =>
                                handleInputChange("problemStatement", e.target.value)
                            }
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                            rows="5"
                        />
                    </div>

                    {/* Input Format */}
                    <div>
                        <label className="block text-xl font-medium mb-2">
                            Input Format:
                        </label>
                        <textarea
                            value={formData.inputFormat}
                            onChange={(e) => handleInputChange("inputFormat", e.target.value)}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                            rows="3"
                        />
                    </div>

                    {/* Constraints */}
                    <div>
                        <label className="block text-xl font-medium mb-2">
                            Constraints:
                        </label>
                        <textarea
                            value={formData.constraints}
                            onChange={(e) =>
                                handleInputChange("constraints", e.target.value)
                            }
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                            rows="3"
                        />
                    </div>

                    {/* Output Format */}
                    <div>
                        <label className="block text-xl font-medium mb-2">
                            Output Format:
                        </label>
                        <textarea
                            value={formData.outputFormat}
                            onChange={(e) =>
                                handleInputChange("outputFormat", e.target.value)
                            }
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                            rows="3"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-xl font-medium mb-2">Tags:</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                value={formData.tagInput}
                                onChange={(e) => handleInputChange("tagInput", e.target.value)}
                                placeholder="Add a tag"
                                className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="py-2 px-4 bg-[#0DB276] hover:bg-green-600 text-white font-semibold tracking-wide rounded"
                            >
                                Add
                            </button>
                        </div>
                        <div className="mt-4 flex flex-wrap space-x-2">
                            {formData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 bg-gray-700 text-slate-300 rounded-full"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(index)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#0DB276] hover:bg-green-600 text-white font-semibold tracking-wide rounded"
                    >
                        Create Challenge
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateChallenge;