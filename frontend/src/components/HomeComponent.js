import { useEffect, useState } from "react";
const HomeComponent = () => {
    const [events, setEvents] = useState([]); // Set initial state as an empty array

    useEffect(() => {
        // Fetch events from the backend
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:4000/events");
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data); // Store events in state
                    console.log(data);
                } else {
                    console.error("Failed to fetch events");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    const handleViewDetails = (event) => {
        console.log("Viewing details for:", event);
    };

    return (
        <div className="homecomponent flex flex-wrap max-w-full justify-between flex-col items-center w-[100%] ">
            {events?.map((event, index) => (
                <div
                    key={index}
                    className="w-[100%] rounded-lg border-2 border-[#0DB276] bg-[#21272e] my-10"
                >
                    <div className="text-2xl display font-bold text-slate-50 bg-[#0DB276] py-4 ">
                        <h1 className="w-[100%] text-center">{"CodeBIT "}{event.tit}{" Announcement"}</h1>
                    </div>
                    <div className="bg-[#21272e] px-12 py-4 ">
                        <div className="text-[22px] text-slate-50 flex flex-col  gap-4">
                            <div>
                                <p className="leading-relaxed">
                                    {"We are super excited to invite you to participate in CodeBIT - "}{event.desc}{" "}
                                </p>
                                <p className="text-[#0a9160] text-[20px] font-bold">
                                    {new Date(event.deadline).toLocaleString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                        timeZoneName: "short",
                                    })}
                                </p>

                            </div>
                            {event.eType === 'Contest' &&
                                <>
                                    <div  >
                                        <p className="text-[22px]">The Contest will feature:</p>
                                        <ul className="text-[19px] py-2 px-8 list-inside list-disc text-slate-300">
                                            <li>
                                                {"question 1 : Solve all test cases to get 100 points."}
                                            </li>
                                            <li>
                                                {"question 2: Solve all test cases to get 200 points."}
                                            </li>
                                            <li>
                                                {"question 3: Solve all test cases to get 300 points."}
                                            </li>
                                            <li>
                                                {"question 4: Solve all test cases to get 400 points."}
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-[22px]">Rules and Instructions</p>
                                        <ul className="text-[19px] py-2 px-8 list-inside list-disc text-slate-50">
                                            <li>
                                                The event duration will be of 2 hours.
                                            </li>
                                            <li>
                                                Coding Languages supported for the event are: C++, Java, Python, JS.
                                            </li>
                                            <li>
                                                In case of technical problems, participants can contact the event administrators immediately.
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            }
                            {event.eType === 'Hackathon' &&
                                <>
                                    <div >
                                        <p className="text-[22px]">The Hackathon will feature:</p>
                                        <ul className="text-[19px]  py-2 px-8 list-inside list-disc text-slate-300 ">
                                            <li>{"The first-place winner will receive a cash prize of ₹5000 and a certificate."}</li>
                                            <li>{"The second-place winner will be awarded a trophy and a certificate."}</li>
                                            <li>{"The third-place winner will receive a medal and a certificate."}</li>
                                        </ul>

                                    </div>
                                    <div>
                                        <p className="text-[22px]">Rules and Instructions:</p>
                                        <ul className="text-[19px] py-2 px-8 list-inside list-disc text-slate-50">

                                        </ul>
                                    </div>
                                </>

                            }
                            {event.org && event.org.length > 0 && (
                                <div className="">
                                    <p className="text-[22px] text-slate-200">Organizers:</p>
                                    <ul className="text-[19px] px-8 list-inside list-disc text-slate-300">
                                        {event.org.map((organizer, idx) => (
                                            <li key={idx}>
                                                <span className="text-[#0DB276] font-semibold">
                                                    {organizer.name}
                                                </span>
                                                {" - "}
                                                <span className="hover:text-white hover:cursor-pointer">{organizer.cont}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                    </div>
                    {/* <div className="flex flex-col items-center justify-center bg-[#0DB276] hover:bg-[#0aa46c] hover:cursor-pointer transition delay-100  p-2 ">
                        <div
                            className="text-[18px] text-center text-slate-200 font-semibold "
                            onClick={() => handleViewDetails(event)}
                        >
                            View Details
                        </div>
                    </div> */}
                    <div className="flex justify-around gap-4 items-center text-slate-400 py-4  mx-6">
                        <div>
                            <p className="font-semibold px-6" >
                                {`For any assistance, please email us at ${event.ctEmail} or contact us at ${event.ctPhone}.`}
                            </p>
                        </div>

                        <div
                            className="text-[18px] text-center text-slate-200 font-semibold rounded-md
                        bg-[#0DB276] hover:bg-[#0aa46c] hover:cursor-pointer transition delay-100 py-3 w-[180px]  "
                            onClick={() => handleViewDetails(event)}
                        >
                            View Details
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default HomeComponent;