import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const PastHackathonManagePage = () => {
    const { hackathonId } = useParams(); // Extract the event ID from the URL
    const [viewType, setViewType] = useState("Event Details");
    const [events, setEventData] = useState(null);
    const [teamDetails, setTeamDetails] = useState({});
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const anType = window.location.pathname.includes("hackathonleaderboard")
    ? "hackathon"
    : "contest";
    
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/announcements/${anType}/${hackathonId}`, {
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
                console.log(data);
                 fetchTeamAndSubmissionDetails(data);
                
                    
               

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        const fetchTeamAndSubmissionDetails = async (event) => {
            try {
                
                if (event.selEv && event.tNames && event.tNames.length > 0) {
                    
                    // Construct query parameters for the GET request
                    const queryParams = new URLSearchParams({
                        eventId: event.selEv,
                        teamNames: JSON.stringify(event.tNames),
                    });
                    
                    const response = await fetch(`http://localhost:4000/teams?${queryParams.toString()}`);
                    
                    if (response.ok) {
                        const data = await response.json();
                        setTeamDetails(prev => ({ ...prev, [event.selEv]: data })); // Add team details by event
                        
                    } else {
                        console.error(`Failed to fetch team details for event ${event.selEv}`);
                    }
                    
                }
            } catch (error) {
                console.error("Error fetching team and submission details:", error);
            }
        };
       
            fetchEventData();
        
    }, []);

    if (loading) {
        return <div className="text-center text-slate-300">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    console.log(teamDetails);
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
           
                {viewType === "Event Details" && (
                    <>
                       
                       <div className="w-full max-w-3xl mx-auto border border-[#0DB276] bg-[#21272e] rounded-lg shadow-lg p-6">
            {events && (
                <div
                    
                    className="w-full rounded-lg border-2 border-[#0DB276] bg-[#21272e] my-10"
                >
                    {/* Title Section */}
                    <div className="text-2xl font-bold text-slate-50 bg-[#0DB276] py-4 ">
                        <h1 className="w-full text-center">
                            {"CodeBIT "}
                            {events.tit}
                        </h1>
                    </div>

                    {/* Event Details */}
                    <div className="bg-[#21272e] px-8 py-6 rounded-lg">
                        <div className="text-[22px] text-slate-50 flex flex-col gap-6">
                            {/* Description */}
                            <div>
                                <p className="leading-relaxed ">{events.desc}</p>
                                {(events.type === "normal" &&
                                    <p className="text-[#0a9160] text-[20px] font-bold">
                                        {new Date(events.deadline).toLocaleString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                            timeZoneName: "short",
                                        })}
                                    </p>
                                )}

                            </div>

                     
                           
                         
                         

                           {events.anType === "hackathon" && (
    <div>
        {console.log("Event:", events, "Team Details:", teamDetails)}
        {teamDetails && Object.keys(teamDetails).length > 0 ? (
            Object.entries(teamDetails).map(([eventId, teams]) => {
                console.log("Rendering Event ID:", eventId, "Teams:", teams);
                return (
                    <div key={eventId} className="mb-6">
                        {/* Event ID Title */}
                     
                        {teams.map((team, idx) => (
                            <div
                                key={idx}
                                className={`mb-6 border-b-2 border-[#0a9160] pb-6 text-lg text-slate-200 ${
                                    idx === 0 ? "border-t-2 border-[#0a9160] pt-6" : ""
                                }`}
                            >
                                {/* Rank */}
                                <p>
                                    Rank:{" "}
                                    <span className="text-[#0DB276] font-bold">{idx + 1}</span>
                                </p>

                                {/* Project Name */}
                                <p>
                                    Project Name:{" "}
                                    <span className="text-[#0DB276] font-semibold">{team.projectName}</span>
                                </p>

                                {/* Team Name */}
                                <p>
                                    Team Name:{" "}
                                    <span className="font-semibold text-[#0DB276]">{team.teamName}</span>
                                </p>

                              

                                {/* Team Members */}
                                <p className="text-[20px] text-[#0DB276] font-bold mb-2 mt-4">
                                    Team Members:
                                </p>
                                <div className="grid grid-cols-3 gap-4 text-[18px] p-2">
                                    {team.members.map((member, memberIdx) => (
                                        <div
                                            key={memberIdx}
                                            className={`py-1 text-center capitalize rounded ${
                                                memberIdx % 2 === 0 ? "bg-gray-500" : "bg-gray-600"
                                            }`}
                                        >
                                            <p>{member.name}</p>
                                           
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })
        ) : (
            <p className="text-red-500">No teams available for this hackathon.</p>
        )}
    </div>
)}


                                    {/* Organizers */}
                            {events.org && events.org.length > 0 && (
                                <div>
                                    <p className="text-[22px] text-[#0DB276] font-bold">Organizers:</p>
                                    <ul className="text-[19px] px-2 list-inside list-disc text-slate-300">
                                        {events.org.map((organizer, idx) => (
                                            <li key={idx} className="flex gap-4 ">
                                                {/* Name */}
                                                <span
                                                    title={organizer.name}
                                                    className=" w-[200px] truncate">
                                                    {organizer.name}
                                                </span>

                                                {/* Phone */}
                                                <span className="hover:text-white hover:cursor-pointer w-[120px]">
                                                    {organizer.phone}
                                                </span>
                                                {/* Email */}
                                                <span
                                                    title={organizer.email}
                                                    className="hover:text-white hover:cursor-pointer w-[300px] truncate">
                                                    {organizer.email}
                                                </span>

                                            </li>
                                        ))}
                                    </ul>
                                </div>



                            )}
                        </div>
                    </div>
                </div >
            )}
        </div >

                        
                       
                      
                    </>
                )}

                {viewType === "Registered Team" && (
                    
                     <div className="w-full max-w-3xl mx-auto border border-[#0DB276] bg-[#21272e] rounded-lg shadow-lg p-6 ">
                      <>
                        {/* <h2 className="text-[#0DB276] text-2xl font-bold text-center mb-6">
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
                        </p>*/}
                    </>
                    </div>
                )} 
           
        </div>
    );
};

export default PastHackathonManagePage;
