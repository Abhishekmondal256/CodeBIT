const ContestHackathonElement = ({ compName, hackathonName, teamSize, registrationTimeline, hackathonTimeline }) => {
    // Retrieve userType from localStorage
    const userType = JSON.parse(localStorage.getItem("user"))?.userType || "null";

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
                {/* Register button only shown if userType is not admin */}
                {userType !== "admin" && (
                    <div className={`${compName}-register w-[120px] hover:bg-[#0a9160] hover:text-[#efefef] hover:cursor-pointer transition delay-100 bg-[#0DB276] rounded-lg py-2 px-4 tracking-wider text-center font-Nomal`}>
                        Register &rarr;
                    </div>
                )}
                <div className={`${compName}-Enter w-[120px] hover:bg-[#0a9160] hover:text-[#efefef] hover:cursor-pointer transition delay-100 bg-[#0DB276] rounded-lg py-1.5 px-4 tracking-wider text-center font-Nomal`}>
                    Enter &rarr;
                </div>
            </div>
        </div>
    );
};

export default ContestHackathonElement;
