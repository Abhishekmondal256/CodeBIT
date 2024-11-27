import React, { useState } from 'react';

const ProjectSubmission = () => {
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        githubLink: '',
        videoLink: '',
        liveLink: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Project Submitted:', formData);
        alert('Project submitted successfully!');
        // Reset form after submission
        setFormData({
            projectName: '',
            description: '',
            githubLink: '',
            videoLink: '',
            liveLink: '',
        });
    };

    return (
        <div className="min-h-screen bg-[#181C21] text-slate-300">
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-4xl font-semibold mb-8 tracking-wider text-[#0DB276]">
                    Project Submission
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Project Name */}
                    <div>
                        <label className="block text-xl font-medium mb-2">Project Name:</label>
                        <input
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xl font-medium mb-2">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                            rows="4"
                        />
                    </div>

                    {/* GitHub Link */}
                    <div>
                        <label className="block text-xl font-medium mb-2">GitHub Link:</label>
                        <input
                            type="url"
                            name="githubLink"
                            value={formData.githubLink}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    {/* Video Link */}
                    <div>
                        <label className="block text-xl font-medium mb-2">Video Link:</label>
                        <input
                            type="url"
                            name="videoLink"
                            value={formData.videoLink}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    {/* Live Link */}
                    <div>
                        <label className="block text-xl font-medium mb-2">Live Deployment Link:</label>
                        <input
                            type="url"
                            name="liveLink"
                            value={formData.liveLink}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded bg-[#212830] border border-transparent placeholder-slate-500 focus:border-[#0DB276] focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#0DB276] hover:bg-[#0aa46c] text-white font-semibold tracking-wide rounded transition delay-100"
                    >
                        Submit Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectSubmission;