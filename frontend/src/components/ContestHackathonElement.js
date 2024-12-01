import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContestHackathonElement = ({
    compName,
    hackathonId,
    hackathonName,
    teamSize,
    registrationTimeline,
    hackathonTimeline,
    isRegistered
}) => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
    const userType = user?.userType || null; // Get userType or set null if not logged in
    const userEmail = user?.userid || null; // Get user email
    const token = user?.tokene || null;
    const navigate = useNavigate(); // React Router navigate hook

    const [isProjectSubmitted, setIsProjectSubmitted] = useState(false); // Track if the project is submitted
    const currentDate = new Date(); // Current date

    // Parse timeline dates
    const registrationEnd = registrationTimeline?.end ? new Date(registrationTimeline.end) : null;
    const hackathonEnd = hackathonTimeline?.end ? new Date(hackathonTimeline.end) : null;

    // Derived state
    const registrationClosed = registrationEnd && registrationEnd < currentDate;
    const hackathonEnded = hackathonEnd && hackathonEnd < currentDate;

    // Fetch if project is submitted
    useEffect(() => {
        const checkProjectSubmission = async () => {
            if (!userEmail || !hackathonId) return;

            try {
                const response = await fetch(
                    `http://localhost:4000/auth/checkProjectSubmission?hackathonId=${hackathonId}&email=${userEmail}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setIsProjectSubmitted(data.submitted);
            } catch (error) {
                console.error("Error fetching project submission status:", error);
            }
        };

        checkProjectSubmission();
    }, [userEmail, hackathonId, token]);

    // Helper functions
    const isRegistrationOpen = !registrationClosed && !isRegistered && hackathonEnd > currentDate;
    const canViewLeaderboard = hackathonEnded;

    // Handle Register
    const handleRegisterClick = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (compName === "contest") {
            try {
                const response = await fetch("http://localhost:4000/auth/register-contest", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        contestId: hackathonId,
                    }),
                });
                    
                if (!response.ok) {
                    throw new Error("Registration failed");
                }

                toast.success("Successfully registered for the contest!", {
                    position: "top-center",
                });
                navigate(`/contest`);
            } catch (error) {
                console.error("Error registering:", error);
                toast.error("Registration failed. Try again later.", {
                    position: "top-center",
                });
            }
        } else {
            navigate(`/teamregister/${hackathonId}`);
        }
    };

    // Enter Button Handler
    const handleEnterClick = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate(`/projectsubmit/${hackathonId}`);
        }
    };

    // Admin Manage Handler
    const handleManageClick = () => {
        navigate(`/manage/${hackathonId}`);
    };

    // Leaderboard Handler
    const handleLeaderboardClick = () => {
        navigate(`/leaderboard/${hackathonId}`);
    };

    return (
        <div className="flex items-center justify-between text-[15px] py-4 border border-[#293139] bg-[#21272e] rounded-lg h-[250px] px-4">
            <div className="flex flex-col justify-center">
                <div className="text-[30px] text-green-500 font-bold">{hackathonName}</div>
                {compName === "hackathon" && (
                    <>
                        <div>Team Size: {teamSize}</div>
                        <div>
                            <strong>Registration:</strong> 
                            {registrationTimeline?.start 
                                ? `${new Date(registrationTimeline.start).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}` 
                                : 'N/A'} 
                            to 
                            {registrationEnd 
                                ? `${new Date(registrationEnd).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}` 
                                : 'N/A'}
                        </div>
                        <div>
                            <strong>Hackathon:</strong> 
                            {hackathonTimeline?.start 
                                ? `${new Date(hackathonTimeline.start).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}` 
                                : 'N/A'} 
                            to 
                            {hackathonEnd 
                                ? `${new Date(hackathonEnd).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}` 
                                : 'N/A'}
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col items-center gap-3">
                {isRegistrationOpen && (
                    <div
                        onClick={handleRegisterClick}
                        className="w-[120px] hover:bg-[#0a9160] cursor-pointer bg-[#0DB276] rounded-lg py-2 px-4 text-center"
                    >
                        Register →
                    </div>
                )}

                {userType === "admin" && (
                    <div
                        onClick={handleManageClick}
                        className="w-[120px] hover:bg-[#0a9160] cursor-pointer bg-[#0DB276] rounded-lg py-2 px-4 text-center"
                    >
                        Manage →
                    </div>
                )}

{isRegistered && (
    <>
        {compName === "hackathon" && (
            <div
                onClick={isProjectSubmitted ? null : handleEnterClick}
                className={`w-[120px] ${
                    isProjectSubmitted
                        ? "bg-gray-500 cursor-not-allowed"
                        : "hover:bg-[#0a9160] cursor-pointer bg-[#0DB276]"
                } rounded-lg py-2 px-4 text-center`}
            >
                {isProjectSubmitted ? "Project Submitted" : "Enter →"}
            </div>
        )}

        {compName === "contest" && !hackathonEnded && (
            <div
                onClick={handleEnterClick}
                className="w-[120px] hover:bg-[#0a9160] cursor-pointer bg-[#0DB276] rounded-lg py-2 px-4 text-center"
            >
                Enter →
            </div>
        )}
    </>
)}


                {canViewLeaderboard && (
                    <div
                        onClick={handleLeaderboardClick}
                        className="w-[120px] hover:bg-[#0a9160] cursor-pointer bg-[#0DB276] rounded-lg py-2 px-4 text-center"
                    >
                        Leaderboard →
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestHackathonElement;
