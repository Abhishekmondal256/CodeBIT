import React, { useEffect, useState } from "react";
import ContestHackathonElement from "./ContestHackathonElement";

const ContestHackathonTable = ({ UP }) => {
    const [upcomingHackathons, setUpcomingHackathons] = useState([]);
    const [pastHackathons, setPastHackathons] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]); // State for user registrations
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch hackathons
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

        // Function to fetch user registrations
        const fetchUserRegistrations = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
        const email = user?.userid; // Extract email
        if (!email) {
            console.error("User email not found in localStorage.");
            return;
        }
                const response = await fetch(`http://localhost:4000/user-registrations?email=${encodeURIComponent(email)}`, {
                    method: "GET", // Use POST to send data in the body
            headers: {
                "Content-Type": "application/json",
            },
            
                });
                const registrations = await response.json();
                
                setUserRegistrations(registrations.map(reg => reg.hackathon)); // Store registered hackathon IDs
            } catch (error) {
                console.error("Error fetching user registrations:", error);
            }
        };

        // Fetch data
        fetchHackathons();
        fetchUserRegistrations();
    }, []);

    // Render hackathon list
    const renderHackathonList = (hackathons) =>
        hackathons.map(({ _id, hackathonName, teamSize, registrationTimeline, hackathonTimeline }) => {
            const isRegistered = userRegistrations.includes(_id); // Check if the user is registered

            return (
                <div key={_id} className="flex flex-col py-4 rounded-lg p-4 w-[750px]">
                    <ContestHackathonElement
                        compName={UP}
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
