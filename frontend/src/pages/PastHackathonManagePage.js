import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const PastHackathonManagePage = () => {
    const { hackathonId } = useParams(); // Extract the event ID from the URL
    const [viewType, setViewType] = useState("Event Details");
    const [eventData, setEventData] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const announcementType = window.location.pathname.includes("hackathonleaderboard")
    ? "hackathon"
    : "contest";
    
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/announcements/${announcementType}/${hackathonId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
              
                if (!response.ok) {
                    throw new Error("Failed to fetch event data");
                }

                const data = await response.json();
               

                setEventData(data);
                
                if (data.winnerEmail) {
                    const studentResponse = await fetch(`http://localhost:4000/studentsdetail/${announcementType}/${hackathonId}/${data.winnerEmail}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (!studentResponse.ok) {
                        throw new Error("Failed to fetch student data");
                    }

                    const studentDat = await studentResponse.json();
                    setStudentData(studentDat);
                    
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (hackathonId) {
            fetchEventData();
        }
    }, [hackathonId, announcementType]);

    if (loading) {
        return <div className="text-center text-slate-300">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }


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
                            {eventData.tit}
                        </h2>
                        <p className="text-lg mt-4">📅 Date: {eventData.ct}</p>
                        <h3 className="text-xl text-[#0DB276] font-semibold mt-6">
                            🏆 Winner Details:
                        </h3>
                        <p className="mt-2">Team Name: {studentData[0].tName}</p>
                        <p>
                            Leader: {studentData[0].teamLeader.name} (
                            {studentData[0].teamLeader.email})
                        </p>
                        <p>Phone: {studentData[0].teamLeader.phone}</p>

                        <h4 className="text-lg text-[#0DB276] font-semibold mt-6">
                            👥 Team Members:
                        </h4>
                        {studentData[0].teamMembers.map((member, index) => (
                            <div key={index} className="mt-2">
                                <p>Name: {member.name}</p>
                                <p>Email: {member.email}</p>
                                <p>Phone: {member.phone}</p>
                            </div>
                        ))}

                        
                       
                      
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
                        <p className="mt-2">Team Name: {studentData[0].tName}</p>
                        <p>
                            Leader: {studentData[0].teamLeader.name} (
                            {studentData[0].teamLeader.email})
                        </p>
                        <p>Phone: {studentData[0].teamLeader.phone}</p>

                        <h4 className="text-lg text-[#0DB276] font-semibold mt-6">
                            👥 Team Members:
                        </h4>
                        {studentData[0].teamMembers.map((member, index) => (
                            <div key={index} className="mt-2">
                                <p>Name: {member.name}</p>
                                <p>Email: {member.email}</p>
                                <p>Phone: {member.phone}</p>
                            </div>
                        ))}

                        <h4 className="text-lg text-[#0DB276] font-semibold mt-6">
                            📊 Project Submission:
                        </h4>
                        <p>Project Desc: {studentData[0].submiss[0].desc}</p>
                        <p>
                            GitHub:{" "}
                            <a
                                href={studentData[0].submiss[0].githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0DB276] underline"
                            >
                                {studentData[0].submiss[0].githubLink}
                            </a>
                        </p>
                        <p>
                            Video:{" "}
                            <a
                                href={studentData[0].submiss[0].videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0DB276] underline"
                            >
                                {studentData[0].submiss[0].videoLink}
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default PastHackathonManagePage;
