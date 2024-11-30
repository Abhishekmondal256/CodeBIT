import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
    const token=user?.tokene|| null;
    const navigate = useNavigate(); // React Router navigate hook

    const [isProjectSubmitted, setIsProjectSubmitted] = useState(false); // Track if the project is submitted
    const currentDate = new Date(); // Current date
    const registrationClosed = new Date(registrationTimeline.end) < currentDate; // Check if registration has closed

    // Check if the user has submitted a project
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
                 console.log("data ata ");
                console.log(data);
                console.log("Project Submission Data:", data);
    
                setIsProjectSubmitted(data.submitted);
            } catch (error) {
                console.error("Error checking project submission:", error);
            }
        };
    
        checkProjectSubmission();
    }, [userEmail, hackathonId]);
    
    const handleRegisterClick = () => {
        if (!user) {
            navigate("/login"); // Redirect to login if not logged in
        } else {
            navigate(`/teamregister/${hackathonId}`); // Navigate to team registration
        }
    };

    const handleEnterClick = () => {
        if (!user) {
            navigate("/login"); // Redirect to login if not logged in
        } else {
            navigate(`/projectsubmit/${hackathonId}`); // Navigate to project submission page
        }
    };

    const handleManageClick = () => {
        console.log(`Managing hackathon ID: ${hackathonId}`); // Log or navigate to the management page
    };
    const handleLeaderboardClick = () => {
        navigate(`/leaderboard/${hackathonId}`); // Navigate to the leaderboard page
    };
    const hackathonEnded = new Date(hackathonTimeline.end) < currentDate;
    return (
        <div className="flex items-center justify-between text-[15px] py-4 border border-[#293139] bg-[#21272e] rounded-lg h-[250px] px-4">
            {/* Left Content Section */}
            <div className="flex flex-col justify-center">
                <div className={`${compName}-title text-[30px] text-green-500 font-bold`}>{hackathonName}</div>
                <div className={`${compName}-teamSize`}>Team Size: {teamSize}</div>
                <div className={`${compName}-regDates`}>
                    <strong>Registration:</strong> {new Date(registrationTimeline.start).toLocaleDateString()} to {new Date(registrationTimeline.end).toLocaleDateString()}
                </div>
                <div className={`${compName}-hackathonDates`}>
                    <strong>Hackathon:</strong> {new Date(hackathonTimeline.start).toLocaleDateString()} to {new Date(hackathonTimeline.end).toLocaleDateString()}
                </div>
            </div>

            {/* Right Button Section */}
            <div className="flex flex-col items-center gap-3">
                {/* Show Register button if registration is open, user is not registered, and user is not an admin */}
                {userType !== "admin" && !isRegistered && !registrationClosed && (
                    <div
                        onClick={handleRegisterClick}
                        className={`${compName}-register w-[120px] hover:bg-[#0a9160] hover:text-[#efefef] hover:cursor-pointer transition delay-100 bg-[#0DB276] rounded-lg py-2 px-4 tracking-wider text-center font-Nomal`}
                    >
                        Register &rarr;
                    </div>
                )}

                {/* Admin users get the Manage button */}
                {userType === "admin" ? (
                    <div
                        onClick={handleManageClick}
                        className={`${compName}-manage w-[120px] hover:bg-[#0a9160] hover:text-[#efefef] hover:cursor-pointer transition delay-100 bg-[#0DB276] rounded-lg py-1.5 px-4 tracking-wider text-center font-Nomal`}
                    >
                        Manage &rarr;
                    </div>
                ) : (
                    // Non-admin users see appropriate buttons based on project submission
                    isRegistered && (
                        <div
                            onClick={isProjectSubmitted ? null : handleEnterClick} // Disable onClick if the project is submitted
                            className={`${compName}-enter w-[120px] ${
                                isProjectSubmitted
                                    ? "bg-gray-500 text-[#d1d1d1] cursor-not-allowed" // Disabled state styles
                                    : "hover:bg-[#0a9160] hover:text-[#efefef] cursor-pointer bg-[#0DB276] text-white" // Active state styles
                            } transition delay-100 rounded-lg py-1.5 px-4 tracking-wider text-center font-Nomal`}
                        >
                            {isProjectSubmitted ?  <span className="text-xl font-semibold text-[#d1d1d1]">Project Submitted</span> : "Enter →"}
                        </div>
                    )
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
