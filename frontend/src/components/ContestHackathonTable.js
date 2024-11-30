// import React, { useEffect, useState } from "react";
// import ContestHackathonElement from "./ContestHackathonElement";

// const ContestHackathonTable = ({ UP }) => {
//     const [upcomingHackathons, setUpcomingHackathons] = useState([]);
//     const [pastHackathons, setPastHackathons] = useState([]);
//     const [userRegistrations, setUserRegistrations] = useState([]); // State for user registrations
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Function to fetch hackathons
//         const fetchHackathons = async () => {
//             try {
//                 const response = await fetch("http://localhost:4000/hackathons");
//                 const data = await response.json();
//                 const currentDate = new Date();

//                 const upcoming = data.filter(hackathon => new Date(hackathon.hackathonTimeline.start) > currentDate);
//                 const past = data.filter(hackathon => new Date(hackathon.hackathonTimeline.start) <= currentDate);

//                 setUpcomingHackathons(upcoming);
//                 setPastHackathons(past);
//             } catch (error) {
//                 console.error("Error fetching hackathons:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // Function to fetch user registrations
//         const fetchUserRegistrations = async () => {
//             try {
//                 const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
//         const email = user?.userid; // Extract email
//         if (!email) {
//             console.error("User email not found in localStorage.");
//             return;
//         }
//                 const response = await fetch(`http://localhost:4000/user-registrations?email=${encodeURIComponent(email)}`, {
//                     method: "GET", // Use POST to send data in the body
//             headers: {
//                 "Content-Type": "application/json",
//             },
            
//                 });
//                 const registrations = await response.json();
                
//                 setUserRegistrations(registrations.map(reg => reg.hackathon)); // Store registered hackathon IDs
//             } catch (error) {
//                 console.error("Error fetching user registrations:", error);
//             }
//         };

//         // Fetch data
//         fetchHackathons();
//         fetchUserRegistrations();
//     }, []);

//     // Render hackathon list
//     const renderHackathonList = (hackathons) =>
//         hackathons.map(({ _id, hackathonName, teamSize, registrationTimeline, hackathonTimeline }) => {
//             const isRegistered = userRegistrations.includes(_id); // Check if the user is registered

//             return (
//                 <div key={_id} className="flex flex-col py-4 rounded-lg p-4 w-[750px]">
//                     <ContestHackathonElement
//                         compName={UP}
//                         hackathonId={_id}
//                         hackathonName={hackathonName}
//                         teamSize={teamSize}
//                         registrationTimeline={registrationTimeline}
//                         hackathonTimeline={hackathonTimeline}
//                         isRegistered={isRegistered} // Pass registration status
//                     />
//                 </div>
//             );
//         });

//     return (
//         <div className="flex flex-col w-[750px]">
//             {loading ? (
//                 <p>Loading...</p>
//             ) : UP === "upcoming" ? (
//                 renderHackathonList(upcomingHackathons)
//             ) : UP === "past" ? (
//                 renderHackathonList(pastHackathons)
//             ) : (
//                 <p>No hackathons found.</p>
//             )}
//         </div>
//     );
// };

// export default ContestHackathonTable;

import React, { useEffect, useState } from "react";
import ContestHackathonElement from "./ContestHackathonElement";
const ContestHackathonTable = ({ UP }) => {
    const [upcomingHackathons, setUpcomingHackathons] = useState([]);
    const [pastHackathons, setPastHackathons] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]); // State for user registrations
    const [upcomingContests, setUpcomingContests] = useState([]);
    const [pastContests, setPastContests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch hackathons
        const fetchHackathons = async () => {
            try {
                const response = await fetch("http://localhost:4000/hackathons");
                const data = await response.json();
                const currentDate = new Date();

                const upcoming = data.filter(hackathon => new Date(hackathon.hackathonTimeline.start) > currentDate);
                const past = data.filter(hackathon => new Date(hackathon.hackathonTimeline.start) <= currentDate);

                setUpcomingHackathons(upcoming);
                setPastHackathons(past);
            } catch (error) {
                console.error("Error fetching hackathons:", error);
            }
            finally {
                setLoading(false);
            }
        };

        // Fetch contests
        const fetchContests = async () => {
            try {
                const response = await fetch("http://localhost:4000/contests");
                const data = await response.json();
                const currentDate = new Date();
                      console.log(response);
                const upcoming = data.filter(contest => new Date(contest.startTime) > currentDate);
                const past = data.filter(contest => new Date(contest.startTime) <= currentDate);

                setUpcomingContests(upcoming);
                setPastContests(past);
            } catch (error) {
                console.error("Error fetching contests:", error);
            }
            finally {
                setLoading(false);
            }
        };

        // Fetch user registrations
        const fetchUserRegistrations = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
                const email = user?.userid; // Extract email
                if (!email) {
                    console.error("User email not found in localStorage.");
                    return;
                }
                const response = await fetch(`http://localhost:4000/user-registrations?email=${encodeURIComponent(email)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const registrations = await response.json();
                setUserRegistrations(registrations.map(reg => reg.hackathon)); // Store hackathon registrations
            } catch (error) {
                console.error("Error fetching user registrations:", error);
            }
        };

        fetchHackathons();
        fetchContests();
        fetchUserRegistrations();
    }, []);
    const renderContestList = (contests) =>
        contests.map(({ _id, contestName,  startTime, endTime  }) => {
           // Check if the user is registered
            return (
                <div key={_id} className="flex flex-col py-4 rounded-lg p-4 w-[750px]">
                    <ContestHackathonElement
                        compName="contest"
                        hackathonId={_id}
                        hackathonName={contestName}
                        hackathonTimeline={{ start: startTime, end: endTime }}
                         
                    />
                </div>
            );
        });
    const renderHackathonList = (hackathons) =>
        hackathons.map(({ _id, hackathonName, teamSize, registrationTimeline, hackathonTimeline }) => {
            const isRegistered = userRegistrations.includes(_id); // Check if the user is registered
            return (
                <div key={_id} className="flex flex-col py-4 rounded-lg p-4 w-[750px]">
                    <ContestHackathonElement
                        compName="hackathon"
                        hackathonId={_id}
                        hackathonName={hackathonName}
                        teamSize={teamSize}
                        registrationTimeline={registrationTimeline}
                        hackathonTimeline={hackathonTimeline}
                        isRegistered={isRegistered} // Pass registration status
                    />
                </div>
            );
        });

 

    return (
        <div className="flex flex-col w-[750px]">
            {loading ? (
                <p>Loading...</p>
            ) : UP === "upcoming" ? (
                <>
                    {upcomingHackathons.length > 0 ? (
                        renderHackathonList(upcomingHackathons)
                    ) : upcomingContests.length > 0 ? (
                        renderContestList(upcomingContests)
                    ) : (
                        <p>No upcoming hackathons or contests found.</p>
                    )}
                </>
            ) : UP === "past" ? (
                <>
                    {pastHackathons.length > 0 ? (
                        renderHackathonList(pastHackathons)
                    ) : pastContests.length > 0 ? (
                        renderContestList(pastContests)
                    ) : (
                        <p>No past hackathons or contests found.</p>
                    )}
                </>
            ) : (
                <p>No data found.</p>
            )}
        </div>
    );
};
export default ContestHackathonTable;