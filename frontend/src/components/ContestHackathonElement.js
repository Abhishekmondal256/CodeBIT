import { useNavigate } from "react-router-dom";

const ContestHackathonElement = ({ compName, hackathonId, hackathonName, teamSize, registrationTimeline, hackathonTimeline }) => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
    const userType = user?.userType || null; // Get userType or set null if not logged in
    const navigate = useNavigate(); // React Router navigate hook

    const handleRegisterClick = async () => {
        if (!user) {
            navigate("/login"); // Redirect to login if not logged in
        } else {
            // Navigate to team registration with hackathon ID
            navigate(`/teamregister/${hackathonId}`);
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
                {userType !== "admin" && (
                    <div
                        onClick={handleRegisterClick}
                        className={`${compName}-register w-[120px] hover:bg-[#0a9160] hover:text-[#efefef] hover:cursor-pointer transition delay-100 bg-[#0DB276] rounded-lg py-2 px-4 tracking-wider text-center font-Nomal`}
                    >
                        Register &rarr;
                    </div>
                )}
                {userType === "admin" ? (
                    <div
                        onClick={handleManageClick}
                        className={`${compName}-manage w-[120px] hover:bg-[#0a9160] hover:text-[#efefef] hover:cursor-pointer transition delay-100 bg-[#0DB276] rounded-lg py-1.5 px-4 tracking-wider text-center font-Nomal`}
                    >
                        Manage &rarr;
                    </div>
                ) : (
                    <div
                        onClick={handleEnterClick}
                        className={`${compName}-Enter w-[120px] hover:bg-[#0a9160] hover:text-[#efefef] hover:cursor-pointer transition delay-100 bg-[#0DB276] rounded-lg py-1.5 px-4 tracking-wider text-center font-Nomal`}
                    >
                        Enter &rarr;
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestHackathonElement;
