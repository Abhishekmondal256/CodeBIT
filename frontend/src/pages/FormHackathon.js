import React, { useState } from "react";

const FormHackathon = () => {
    const [formData, setFormData] = useState({
        teamName: "",
        teamLeader: {
            name: "",
            email: "",
            phone: "",
        },
        teamMembers: [{ name: "", email: "", phone: "" }],
        selectedProblem: "",
        projectDescription: "",
    });

    const problemStatements = [
        {
            id: "problem1",
            title: "Problem Statement 1",
            description: "Description of Problem Statement 1.",
        },
        {
            id: "problem2",
            title: "Problem Statement 2",
            description: "Description of Problem Statement 2.",
        },
        {
            id: "problem3",
            title: "Problem Statement 3",
            description: "Description of Problem Statement 3.",
        },
    ];

    const handleInputChange = (path, value) => {
        const pathArray = path.split(".");
        setFormData((prev) => {
            let updatedData = { ...prev };
            let temp = updatedData;
            for (let i = 0; i < pathArray.length - 1; i++) {
                temp = temp[pathArray[i]];
            }
            temp[pathArray[pathArray.length - 1]] = value;
            return updatedData;
        });
    };

    const handleAddTeamMember = () => {
        setFormData((prev) => ({
            ...prev,
            teamMembers: [...prev.teamMembers, { name: "", email: "", phone: "" }],
        }));
    };

    const handleProblemSelection = (id) => {
        setFormData((prev) => ({
            ...prev,
            selectedProblem: id,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted: ", formData);
    };

    return (
        <div className="min-h-screen bg-[#181C21] text-slate-300">
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-4xl font-semibold mb-8 tracking-wider text-[#0DB276]">Hackathon Team Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Team Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Team Name:</label>
                        <input
                            type="text"
                            value={formData.teamName}
                            onChange={(e) => handleInputChange("teamName", e.target.value)}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    {/* Team Leader Information */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Team Leader Name:</label>
                        <input
                            type="text"
                            value={formData.teamLeader.name}
                            onChange={(e) => handleInputChange("teamLeader.name", e.target.value)}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Team Leader Email:</label>
                        <input
                            type="email"
                            value={formData.teamLeader.email}
                            onChange={(e) => handleInputChange("teamLeader.email", e.target.value)}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Team Leader Phone:</label>
                        <input
                            type="text"
                            value={formData.teamLeader.phone}
                            onChange={(e) => handleInputChange("teamLeader.phone", e.target.value)}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    {/* Team Members */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Team Members:</label>
                        {formData.teamMembers.map((member, index) => (
                            <div key={index} className="flex space-x-4 mt-4">
                                <input
                                    type="text"
                                    placeholder="Member Name"
                                    value={member.name}
                                    onChange={(e) => handleInputChange(`teamMembers.${index}`.name, e.target.value)}
                                    required
                                    className="w-1/3 p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                                />
                                <input
                                    type="email"
                                    placeholder="Member Email"
                                    value={member.email}
                                    onChange={(e) => handleInputChange(`teamMembers.${index}.email`, e.target.value)}
                                    required
                                    className="w-1/3 p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Member Phone"
                                    value={member.phone}
                                    onChange={(e) => handleInputChange(`teamMembers.${index}.phone`, e.target.value)}
                                    required
                                    className="w-1/3 p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddTeamMember}
                            className="mt-4 px-6 py-2 bg-[#0DB276] hover:bg-green-600 rounded text-white font-semibold"
                        >
                            + Add Member
                        </button>
                    </div>

                    {/* Problem Statement */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Theme</h3>
                        <div className="space-y-4">
                            {problemStatements.map((problem) => (
                                <label
                                    key={problem.id}
                                    className="flex items-center space-x-4 p-4 border border-[#293139] rounded bg-[#212830] hover:bg-[#1b2127]"
                                >
                                    <input
                                        type="radio"
                                        name="problemStatement"
                                        value={problem.id}
                                        checked={formData.selectedProblem === problem.id}
                                        onChange={() => handleProblemSelection(problem.id)}
                                        className="form-radio text-[#0DB276] focus:ring-[#0DB276]"
                                    />
                                    <div>
                                        <h4 className="text-lg font-medium">{problem.title}</h4>
                                        <p className="text-sm text-slate-400">{problem.description}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#0DB276] hover:bg-green-600 text-white font-semibold tracking-wide rounded transition delay-100"
                    >
                        Register Team
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormHackathon;