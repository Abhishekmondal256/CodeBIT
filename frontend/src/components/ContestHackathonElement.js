import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Ensure correct import
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
    console.log(compName);
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
    const userType = user?.userType || null; // Get userType or set null if not logged in
    const userEmail = user?.userid || null; // Get user email
    const token = user?.tokene || null;
    const navigate = useNavigate(); // React Router navigate hook

    const [isProjectSubmitted, setIsProjectSubmitted] = useState(false); // Track if the project is submitted
    const currentDate = new Date(); // Current date
    
    // Safe check for registrationTimeline and hackathonTimeline
    const registrationEnd = registrationTimeline?.end ? new Date(registrationTimeline.end) : null;
    const hackathonEnd = hackathonTimeline?.end ? new Date(hackathonTimeline.end) : null;

    const registrationClosed = registrationEnd && registrationEnd < currentDate; // Check if registration has closed
    const hackathonEnded = hackathonEnd && hackathonEnd < currentDate; // Check if hackathon has ended

    // Check if the user has submitted a project for hackathons or contests
    useEffect(() => {
        const checkProjectSubmission = async () => {
            if (!userEmail || !hackathonId) return;
    
            try {
                const response = await fetch(
                    `http://localhost:4000/auth/checkProjectSubmission?hackathonId=${hackathonId}&email=${userEmail}`,
                    {
                        method: 'GET', // HTTP method
                        headers: {
                            'Authorization': token, // Include token
                            'Content-Type': 'application/json' // Specify content type
                        }
                    }
                );
                
                console.log("API Response:", response);
    
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }
    
                const data = await response.json();
                console.log("Project Submission Data:", data);
    
                setIsProjectSubmitted(data.submitted);
            } catch (error) {
                console.error("Error checking project submission:", error);
            }
        };
    
        checkProjectSubmission();
    }, [userEmail, hackathonId]);

    // Handle registration button click
    const handleRegisterClick = async () => {
        if (!user) {
            navigate("/login"); // Redirect to login if not logged in
            return;
        }

        if (compName === "contest") {
            // If it's a contest, proceed with contest registration
            try {
                
                const response = await fetch("http://localhost:4000/register-contest", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        contestId: hackathonId, // Assuming hackathonId is contestId here
                    }),
                });

                if (!response.ok) {
                    throw new Error("Registration failed");
                }
               
                toast.success("Successfully registered for the contest!", {
                    position: toast.POSITION.TOP_CENTER,
                });
                navigate(`/teamregister/${hackathonId}`); // Navigate to team registration page
            } catch (error) {
                console.error("Registration error:", error);
                toast.error("Registration failed. Try again later.", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            // If it's not a contest (i.e., hackathon), navigate to team registration
            navigate(`/teamregister/${hackathonId}`);
        }
    };

    // Handle entering the contest page
    const handleEnterClick = () => {
        if (!user) {
            navigate("/login"); // Redirect to login if not logged in
        } else {
            navigate(`/projectsubmit/${hackathonId}`); // Navigate to project submission page
        }
    };

    // Handle management button click (for admin users)
    const handleManageClick = () => {
        console.log(`Managing ${compName} ID: ${hackathonId}`); // Log or navigate to the management page
    };

    // Handle leaderboard button click (for admin users or contest participants)
    const handleLeaderboardClick = () => {
        navigate(`/leaderboard/${hackathonId}`); // Navigate to the leaderboard page
    };

    return (
        <div className="flex items-center justify-between text-[15px] py-4 border border-[#293139] bg-[#21272e] rounded-lg h-[250px] px-4">
            {/* Left Content Section */}
            <div className="flex flex-col justify-center">
                <div className={`${compName}-title text-[30px] text-green-500 font-bold`}>
                    {hackathonName}
                </div>
                {compName === "hackathon" && (
                    <div className={`${compName}-teamSize`}>
                        Team Size: {teamSize}
                    </div>
                )}
                {/* Registration and Hackathon Timelines for Hackathons */}
                {compName === "hackathon" && (
                    <>
                        <div className={`${compName}-regDates`}>
                            <strong>Registration:</strong> {registrationTimeline?.start 
                                ? `${new Date(registrationTimeline.start).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}` 
                                : 'N/A'} 
                            to {registrationEnd 
                                ? `${new Date(registrationEnd).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}` 
                                : 'N/A'}
                        </div>
                        <div className={`${compName}-hackathonDates`}>
                            <strong>Hackathon:</strong> {hackathonTimeline?.start 
                                ? `${new Date(hackathonTimeline.start).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}` 
                                : 'N/A'} 
                            to {hackathonEnd 
                                ? `${new Date(hackathonEnd).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}` 
                                : 'N/A'}
                        </div>
                    </>
                )}
                {/* Contest Date and Time */}
                {compName === "contest" && (
                    <>
                        <div className={`${compName}-contestDates`}>
                            <strong>Contest Date:</strong> 
                            {hackathonTimeline?.start 
                                ? `${new Date(hackathonTimeline.start).toLocaleDateString()} to ${new Date(hackathonEnd).toLocaleDateString()}` 
                                : 'N/A'}
                        </div>
                        <div className={`${compName}-contestTimes`}>
                            <strong>Contest Time:</strong> 
                            {hackathonTimeline?.start 
                                ? `${new Date(hackathonTimeline.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to ${new Date(hackathonEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` 
                                : 'N/A'}
                        </div>
                    </>
                )}
            </div>

            {/* Right Button Section */}
            <div className="flex flex-col items-center gap-3">
                {/* Show Register button if registration is open, user is not registered, and user is not an admin */}
                {userType !== "admin" && !isRegistered && !registrationClosed && hackathonEnd > currentDate && (
                    <div
                        onClick={handleRegisterClick}
                        className={`${compName}-register w-[120px] hover:bg-[#0a9160] hover:text-[#efefef] hover:cursor-pointer transition delay-100 bg-[#0DB276] rounded-lg py-2 px-4 tracking-wider text-center font-Nomal`}
                    >
                        Register &rarr;
                    </div>
                )}
                {/* Admin users get the Manage button */}
                {userType === "admin" && (
                    <div
                        onClick={handleManageClick}
                        className={`${compName}-manage w-[120px] hover:bg-[#0a9160] hover:text-[#efefef] hover:cursor-pointer transition delay-100 bg-[#0DB276] rounded-lg py-1.5 px-4 tracking-wider text-center font-Nomal`}
                    >
                        Manage &rarr;
                    </div>
                )}

                {/* Non-admin users see appropriate buttons based on project submission */}
                {isRegistered && (
                    <div
                        onClick={isProjectSubmitted ? null : handleEnterClick} // Disable onClick if the project is submitted
                        className={`${compName}-enter w-[120px] ${
                            isProjectSubmitted
                                ? "bg-gray-500 text-[#d1d1d1] cursor-not-allowed" // Disabled state styles
                                : "hover:bg-[#0a9160] hover:text-[#efefef] cursor-pointer bg-[#0DB276] text-white" // Active state styles
                        } transition delay-100 rounded-lg py-1.5 px-4 tracking-wider text-center font-Nomal`}
                    >
                        {isProjectSubmitted ? (
                            <span className="text-xl font-semibold text-[#d1d1d1]">
                                Project Submitted
                            </span>
                        ) : (
                            "Enter →"
                        )}
                    </div>
                )}

                {hackathonEnded && (
                    <div
                        onClick={handleLeaderboardClick}
                        className="w-[120px] hover:bg-[#0a9160] hover:text-[#efefef] cursor-pointer transition delay-100 bg-[#0DB276] rounded-lg py-1.5 px-4 tracking-wider text-center font-Nomal"
                    >
                        Leaderboard &rarr;
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestHackathonElement;
