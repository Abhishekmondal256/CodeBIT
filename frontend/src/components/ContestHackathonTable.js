import React, { useEffect, useState } from "react";
import ContestHackathonElement from "./ContestHackathonElement";

const ContestHackathonTable = ({ UP }) => {
    const [upcomingHackathons, setUpcomingHackathons] = useState([]);
    const [pastHackathons, setPastHackathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
            } finally {
                setLoading(false);
            }
        };

        fetchHackathons();
    }, []);

    const renderHackathonList = (hackathons) =>
        hackathons.map(({ _id, hackathonName, teamSize, registrationTimeline, hackathonTimeline }) => (
            <div key={_id} className="flex flex-col py-4 rounded-lg p-4 w-[750px]">
                <ContestHackathonElement
                    compName={UP}
                    hackathonId={_id}
                    hackathonName={hackathonName}
                    teamSize={teamSize}
                    registrationTimeline={registrationTimeline}
                    hackathonTimeline={hackathonTimeline}
                />
            </div>
        ));

    return (
        <div className="flex flex-col w-[750px]">
            {loading ? (
                <p>Loading...</p>
            ) : UP === "upcoming" ? (
                renderHackathonList(upcomingHackathons)
            ) : UP === "past" ? (
                renderHackathonList(pastHackathons)
            ) : (
                <p>No hackathons found.</p>
            )}
        </div>
    );
};

export default ContestHackathonTable;
