// ContestHackathonTable.js
import React, { useEffect, useState } from "react";
import ContestHackathonElement from "./ContestHackathonElement"; // Default import

const ContestHackathonTable = ({ UP, feat }) => {
    const [upcomingHackathons, setUpcomingHackathons] = useState([]);
    const [pastHackathons, setPastHackathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHackathons = async () => {
            console.log("Fetching hackathons...");
            try {
                const response = await fetch("http://localhost:4000/hackathons");
                const data = await response.json();

                const currentDate = new Date();

                const upcoming = data.filter(hackathon => {
                    const startDate = new Date(hackathon.hackathonTimeline.start);
                    return startDate > currentDate;
                });

                const past = data.filter(hackathon => {
                    const startDate = new Date(hackathon.hackathonTimeline.start);
                    return startDate < currentDate;
                });

                setUpcomingHackathons(upcoming);
                setPastHackathons(past);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching hackathons:", error);
                setLoading(false);
            }
        };

        fetchHackathons();
    }, []);

    return (
        <div className="flex flex-col w-[750px]">
            {UP === "upcoming" && upcomingHackathons.length > 0 && (
                <div>
                    
                    <div >
                        {loading ? (
                            <p>Loading...</p>
                        ) : upcomingHackathons.length > 0 ? (
                            upcomingHackathons.map(({ _id, hackathonName, teamSize, registrationTimeline, hackathonTimeline }) => (
                                <div key={_id} className="flex flex-col py-4 rounded-lg p-4 w-[750px]">
                                    <ContestHackathonElement
                                        compName={UP}
                                        hackathonName={hackathonName}
                                        teamSize={teamSize}
                                        registrationTimeline={registrationTimeline}
                                        hackathonTimeline={hackathonTimeline}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No upcoming hackathons found.</p>
                        )}
                    </div>
                </div>
            )}

            {UP === "past" && pastHackathons.length > 0 && (
                <div>
                    
                    <div >
                        {loading ? (
                            <p>Loading...</p>
                        ) : pastHackathons.length > 0 ? (
                            pastHackathons.map(({ _id, hackathonName, teamSize, registrationTimeline, hackathonTimeline }) => (
                                <div key={_id} className="flex flex-col py-4 rounded-lg p-4 w-[750px]">
                                    <ContestHackathonElement
                                        compName={UP}
                                        hackathonName={hackathonName}
                                        teamSize={teamSize}
                                        registrationTimeline={registrationTimeline}
                                        hackathonTimeline={hackathonTimeline}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No past hackathons found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContestHackathonTable;
