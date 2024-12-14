import { useEffect, useState } from "react";
const eventsData = [
    {
        title: "CodeBIT Beginner Contest 13 Announcement",
        description: "We are super excited to invite you to participate in CodeBIT Round 9.",
        date: "Saturday, November 23, 2024 at 20:05 UTC+5.5",
        problems: [
            { question: "Solve all test cases to get 100 points." },
            { question: "Solve all test cases to get 200 points." },
            { question: "Solve all test cases to get 300 points." },
            { question: "Solve all test cases to get 400 points." },
        ],
        rules: [
            "The contest duration will be of 2 hours.",
            "Coding Languages supported for the contest are: C++, Java, Python, JS.",
            "In case of technical problems, participants can contact the contest administrators immediately.",
        ],
    },
    {
        title: "CodeBIT Advanced Contest 5 Announcement",
        description: "Join us for an exciting advanced coding challenge in CodeBIT Round 10.",
        date: "Sunday, December 10, 2024 at 18:00 UTC+5.5",
        problems: [
            { question: "Solve all test cases to get 150 points." },
            { question: "Solve all test cases to get 250 points." },
            { question: "Solve all test cases to get 350 points." },
            { question: "Solve all test cases to get 450 points." },
        ],
        rules: [
            "The contest duration will be of 3 hours.",
            "Coding Languages supported for the contest are: C++, Java, Python, JS, Go.",
            "Participants can reach out to the organizers for clarifications during the contest.",
        ],
    },
];


const HomeComponent = () => {
    const [events, setEvents] = useState();
    useEffect(() => {
        // Fetch events from the backend
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:4000/events");
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data); // Store events in state
                } else {
                    console.error("Failed to fetch events");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);
    console.log(events);
    const handleViewDetails = (contest) => {
        console.log("Viewing details for:", contest);
    };

    return (
        <div className="homecomponent flex flex-wrap max-w-full justify-between flex-col items-center">
            {eventsData?.map((contest, index) => (
                <div
                    key={index}
                    className="w-[800px] rounded-lg border-2 border-[#0DB276] bg-[#21272e] my-14"
                >
                    <div className="text-2xl display font-bold text-slate-50 bg-[#0DB276] py-4 mb-4">
                        <h1 className="w-[100%] text-center">{contest.title}</h1>
                    </div>
                    <div className="bg-[#21272e] px-12">
                        <div className="text-[22px] text-slate-50">
                            <p className="leading-relaxed mb-4">
                                {contest.description}{" "}
                                <span className="text-[#0a9160]">{contest.date}</span>.
                            </p>
                            <p className="text-[22px] mb-4">The contest will feature:</p>
                            <ul className="text-[19px] py-4 px-8 list-inside list-disc text-slate-50">
                                {contest.problems.map((problem, i) => (
                                    <li key={`problem-${i}`}>{problem.question}</li>
                                ))}
                            </ul>
                            <div>
                                <p className="text-[22px]">Rules and Instructions</p>
                                <ul className="text-[19px] py-4 px-8 list-inside list-disc text-slate-50">
                                    {contest.rules.map((rule, i) => (
                                        <li key={`rule-${i}`}>{rule}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-center pb-8">
                        <div
                            className="text-[18px] text-center text-slate-200 font-semibold rounded-md
                        bg-[#0DB276] hover:bg-[#0aa46c] hover:cursor-pointer transition delay-100 mx-10 px-14 py-4"
                            onClick={() => handleViewDetails(contest)}
                        >
                            View Details
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeComponent;