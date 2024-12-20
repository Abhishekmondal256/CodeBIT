import { useEffect, useState } from "react";
const HomeComponent = () => {
    const [events, setEvents] = useState([]); // Set initial state as an empty array
    const [teamDetails, setTeamDetails] = useState({});
    useEffect(() => {
        // Fetch events from the backend
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:4000/events");
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data); // Store events in state
                    console.log(data);
                    data.forEach(event => fetchTeamAndSubmissionDetails(event));
                } else {
                    console.error("Failed to fetch events");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
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

        fetchEvents();
    }, []);

   
console.log(teamDetails);
    return (
        <div className="homecomponentonent flex flex-col items-center w-full px-4 rounded-lg">
            {events?.map((event, index) => (
                <div
                    key={index}
                    className="w-full rounded-lg border-2 border-[#0DB276] bg-[#21272e] my-10"
                >
                    {/* Title Section */}
                    <div className="text-2xl font-bold text-slate-50 bg-[#0DB276] py-4 ">
                        <h1 className="w-full text-center">
                            {"CodeBIT "}
                            {event.tit}
                        </h1>
                    </div>

                    {/* Event Details */}
                    <div className="bg-[#21272e] px-8 py-6 rounded-lg">
                        <div className="text-[22px] text-slate-50 flex flex-col gap-6">
                            {/* Description */}
                            <div>
                                <p className="leading-relaxed ">{event.desc}</p>
                                {(event.type === "normal" &&
                                    <p className="text-[#0a9160] text-[20px] font-bold">
                                        {new Date(event.deadline).toLocaleString("en-US", {
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

                            {/* Rank Details */}
                            {/* {(event.type === "hackathon") && (
                                <div>
                                    {event.rankHolders.map((holder, idx) => (
                                        <div
                                            key={idx}
                                            className={`mb-6 border-b-2 border-[#0a9160] pb-6 text-lg  text-slate-200 ${idx == 0 ? "border-t-2 border-[#0a9160] pt-6" : ""}`}
                                        // className={`mb-6 border-b-2 border-[#0a9160] pb-6 text-lg  text-slate-200 `}
                                        >
                                            {/* Rank of the project */}
                                            {/* <p className="">
                                                Rank : {" "}<span className="text-[#0DB276] font-bold">{idx + 1}</span>
                                            </p> */}

                                            {/* <p className="">
                                                Project Name :{"  "}
                                                <span className="text-[#0DB276] font-semibold">{holder.projectName}</span>
                                            </p>

                                            <p className="=">
                                                Team Name : {"  "}
                                                <span className="font-semibold text-[#0DB276]">{holder.teamName}</span>
                                            </p>

                                            {/* Team Members */}
                                            {/* <p className="text-[20px] text-[#0DB276] font-bold mb-2 mt-4">
                                                Team Members:
                                            </p> 
                                            <div className="grid grid-cols-3 gap-4 text-[18px] p-2">
                                                {holder.teamMembers.map((member, memberIdx) => (
                                                    <div
                                                        key={memberIdx}
                                                        className={`py-1 text-center capitalize rounded ${memberIdx % 2 === 0 ? "bg-gray-500" : "bg-gray-600"
                                                            } `}
                                                    >
                                                        {member}
                                                    </div>
                                                ))}
                                            </div>
                                        </div> */}
                                    {/* ))}
                                </div>
                            )}  */}
                           
                         
                         

                           {event.anType === "hackathon" && (
    <div>
        {console.log("Event:", event, "Team Details:", teamDetails)}
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
                            {event.org && event.org.length > 0 && (
                                <div>
                                    <p className="text-[22px] text-[#0DB276] font-bold">Organizers:</p>
                                    <ul className="text-[19px] px-2 list-inside list-disc text-slate-300">
                                        {event.org.map((organizer, idx) => (
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
            ))}
        </div >
    );
};

export default HomeComponent;