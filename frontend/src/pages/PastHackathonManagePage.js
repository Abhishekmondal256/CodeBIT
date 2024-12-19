import React, { useState } from "react";

const PastHackathonManagePage = () => {
    const [viewType, setViewType] = useState("Event Details");

    const eventData = {
        eventName: "CodeBIT Mera Event",
        eventDate: "Saturday, December 21, 2024 at 05:30 GMT+5:30",
        winner: {
            teamName: "Innovators",
            teamLeader: {
                name: "John Doe",
                email: "johndoe@example.com",
                phone: "+1234567890",
            },
            teamMembers: [
                { name: "Jane Doe", email: "janedoe@example.com", phone: "+0987654321" },
            ],
            projectName: "Smart Environment",
            githubLink: "https://github.com/project-link",
            videoLink: "https://youtube.com/project-demo",
        },
        registeredUser: {
            name: "Michael Smith",
            email: "michael@example.com",
            phone: "+1122334455",
        },
    };

    return (
        <div className="min-h-screen bg-[#181C21] text-slate-300 p-4 sm:p-8">
            {/* Toggle Buttons */}
            <div className="flex justify-start space-x-6 mb-8 pl-20 pt-8">
                <button
                    className={`pb-1 text-lg font-semibold ${
                        viewType === "Event Details"
                            ? "border-b-[4px] border-[#0DB276] text-[#0DB276]"
                            : "text-gray-400 hover:text-[#0DB276]"
                    }`}
                    onClick={() => setViewType("Event Details")}
                >
                    Event Details
                </button>
                <button
                    className={`pb-1 text-lg font-semibold ${
                        viewType === "Registered Team"
                            ? "border-b-[4px] border-[#0DB276] text-[#0DB276]"
                            : "text-gray-400 hover:text-[#0DB276]"
                    }`}
                    onClick={() => setViewType("Registered Team")}
                >
                    Registered Team
                </button>
            </div>

            {/* Content Based on View Type */}
            <div className="w-full max-w-3xl mx-auto border border-[#0DB276] bg-[#21272e] rounded-lg shadow-lg p-6 ">
                {viewType === "Event Details" && (
                    <>
                        <h2 className="bg-[#0DB276] text-slate-300 font-bold text-center text-2xl px-4 py-2 rounded">
                            {eventData.eventName}
                        </h2>
                        <p className="text-lg mt-4">📅 Date: {eventData.eventDate}</p>
                        <h3 className="text-xl text-[#0DB276] font-semibold mt-6">
                            🏆 Winner Details:
                        </h3>
                        <p className="mt-2">Team Name: {eventData.winner.teamName}</p>
                        <p>
                            Leader: {eventData.winner.teamLeader.name} (
                            {eventData.winner.teamLeader.email})
                        </p>
                        <p>Phone: {eventData.winner.teamLeader.phone}</p>

                        <h4 className="text-lg text-[#0DB276] font-semibold mt-6">
                            👥 Team Members:
                        </h4>
                        {eventData.winner.teamMembers.map((member, index) => (
                            <div key={index} className="mt-2">
                                <p>Name: {member.name}</p>
                                <p>Email: {member.email}</p>
                                <p>Phone: {member.phone}</p>
                            </div>
                        ))}

                        <h4 className="text-lg text-[#0DB276] font-semibold mt-6">
                            📊 Project Submission:
                        </h4>
                        <p>Project Name: {eventData.winner.projectName}</p>
                        <p>
                            GitHub:{" "}
                            <a
                                href={eventData.winner.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0DB276] underline"
                            >
                                {eventData.winner.githubLink}
                            </a>
                        </p>
                        <p>
                            Video:{" "}
                            <a
                                href={eventData.winner.videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0DB276] underline"
                            >
                                {eventData.winner.videoLink}
                            </a>
                        </p>
                    </>
                )}

                {viewType === "Registered Team" && (
                    <>
                        <h2 className="text-[#0DB276] text-2xl font-bold text-center mb-6">
                            Registered
                        </h2>
                        <h3 className="text-xl text-[#0DB276] font-semibold">
                            🏆 Team Details:
                        </h3>
                        <p className="mt-2">Team Name: {eventData.winner.teamName}</p>
                        <p>
                            Leader: {eventData.winner.teamLeader.name} (
                            {eventData.winner.teamLeader.email})
                        </p>
                        <p>Phone: {eventData.winner.teamLeader.phone}</p>

                        <h4 className="text-lg text-[#0DB276] font-semibold mt-6">
                            👥 Team Members:
                        </h4>
                        {eventData.winner.teamMembers.map((member, index) => (
                            <div key={index} className="mt-2">
                                <p>Name: {member.name}</p>
                                <p>Email: {member.email}</p>
                                <p>Phone: {member.phone}</p>
                            </div>
                        ))}

                        <h4 className="text-lg text-[#0DB276] font-semibold mt-6">
                            📊 Project Submission:
                        </h4>
                        <p>Project Name: {eventData.winner.projectName}</p>
                        <p>
                            GitHub:{" "}
                            <a
                                href={eventData.winner.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0DB276] underline"
                            >
                                {eventData.winner.githubLink}
                            </a>
                        </p>
                        <p>
                            Video:{" "}
                            <a
                                href={eventData.winner.videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0DB276] underline"
                            >
                                {eventData.winner.videoLink}
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default PastHackathonManagePage;
