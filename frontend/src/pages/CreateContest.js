import React, { useState } from "react";


const CreateContest = () => {
    const [formData, setFormData] = useState({
        contestName: "",
        startTime: "", // ISO datetime format (YYYY-MM-DDTHH:mm)
        endTime: "",   // ISO datetime format
    });

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contest Created: ", formData);
        alert("Contest details submitted successfully!");
    };

    return (
        <div className="min-h-screen bg-[#181C21] text-slate-300">
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-5xl font-semibold mb-8 tracking-wider text-[#0DB276]">
                    Create Contest
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Contest Name */}
                    <div>
                        <label className="block text-xl font-medium mb-2">
                            Contest Name:
                        </label>
                        <input
                            type="text"
                            value={formData.contestName}
                            onChange={(e) => handleInputChange("contestName", e.target.value)}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    {/* Start Time */}
                    <div>
                        <label className="block text-xl font-medium mb-2">
                            Start Time:
                        </label>
                        <input
                            type="datetime-local"
                            value={formData.startTime}
                            onChange={(e) => handleInputChange("startTime", e.target.value)}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    {/* End Time */}
                    <div>
                        <label className="block text-xl font-medium mb-2">
                            End Time:
                        </label>
                        <input
                            type="datetime-local"
                            value={formData.endTime}
                            onChange={(e) => handleInputChange("endTime", e.target.value)}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
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