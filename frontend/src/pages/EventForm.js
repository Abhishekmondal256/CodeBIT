import React, { useState, useEffect } from "react";

const EventForm = () => {
    const [tit, setTit] = useState(""); 
    const [desc, setDesc] = useState(""); 
    const [ctEmail, setCtEmail] = useState(""); 
    const [ctPhone, setCtPhone] = useState(""); 
    const [deadline, setDeadline] = useState(""); 
    const [org, setOrg] = useState([{ name: "", cont: "" }]); 
    const [announcementType, setAnnouncementType] = useState("normal"); 
    const [selectedEvent, setSelectedEvent] = useState(""); 
    const [hackathons, setHackathons] = useState([]); 
    const [contests, setContests] = useState([]); 
    const [winnerEmail, setWinnerEmail] = useState(""); 
    const [loading, setLoading] = useState(false); 

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.tokene || null;

    const currentDate = new Date(); 

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                if (announcementType === "hackathon") {
                    const response = await fetch("http://localhost:4000/hackathons", {
                        method: "GET",
                        headers: { Authorization: token },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        const pastHackathons = data
                            .filter((event) => new Date(event.hackTime.end) < currentDate)
                            .map((event) => ({ name: event.hackName, id: event._id }));
                        setHackathons(pastHackathons);
                    }
                } else if (announcementType === "contest") {
                    const response = await fetch("http://localhost:4000/contests", {
                        method: "GET",
                        headers: { Authorization: token },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        const pastContests = data
                            .filter((event) => new Date(event.endTime) < currentDate)
                            .map((event) => ({ name: event.contName, id: event._id }));
                        setContests(pastContests);
                    }
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [announcementType, token]);

    const addOrganizer = () => {
        setOrg([...org, { name: "", cont: "" }]);
    };

    const handleOrganizerChange = (index, field, value) => {
        const newOrg = [...org];
        newOrg[index][field] = value;
        setOrg(newOrg);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tit || !desc || !ctEmail || !ctPhone || !deadline) {
            alert("Please fill in all required fields.");
            return;
        }

        if (org.some((o) => !o.name || !o.cont)) {
            alert("Please fill in all organizer details.");
            return;
        }

        if ((announcementType === "hackathon" || announcementType === "contest") && !winnerEmail) {
            alert("Please provide the winner email.");
            return;
        }

        const formData = {
            tit,
            desc,
            ctEmail,
            ctPhone,
            deadline,
            org,
            announcementType,
            selectedEvent,
            winnerEmail: announcementType === "hackathon" || announcementType === "contest" ? winnerEmail : undefined,
        };

        try {
            const response = await fetch("http://localhost:4000/auth/addevents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Event created successfully!");
                setTit("");
                setDesc("");
                setCtEmail("");
                setCtPhone("");
                setDeadline("");
                setOrg([{ name: "", cont: "" }]);
                setAnnouncementType("normal");
                setSelectedEvent("");
                setWinnerEmail("");
            } else {
                const errorData = await response.json();
                alert(`Submission failed: ${errorData.message}`);
            }
        } catch (error) {
            alert("An error occurred during submission. Please try again.");
            console.error("Submission error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#181C21] text-slate-300">
            <header className="px-8 pt-8 pb-4 bg-[#181C21]">
                <h1 className="text-3xl font-bold text-[#0DB276] text-center">Event Registration</h1>
            </header>

            <main className="px-8 py-8">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                    {/* Announcement Type */}
                    <div>
                        <label className="block text-m font-medium mb-2">Announcement Type</label>
                        <select
                            value={announcementType}
                            onChange={(e) => setAnnouncementType(e.target.value)}
                            className="w-full bg-[#21272e] text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                        >
                            <option value="normal">Normal Announcement</option>
                            <option value="hackathon">Hackathon Result Announcement</option>
                            <option value="contest">Contest Result Announcement</option>
                        </select>
                    </div>

                    {/* Event Name */}
                    {(announcementType === "hackathon" || announcementType === "contest") && (
                        <div>
                            <label className="block text-m font-medium mb-2">Event Name</label>
                            <select
                                value={selectedEvent}
                                onChange={(e) => setSelectedEvent(e.target.value)}
                                className="w-full bg-[#21272e] text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                            >
                                <option value="">
                                    Select {announcementType === "hackathon" ? "Hackathon" : "Contest"}
                                </option>
                                {loading ? (
                                    <option>Loading...</option>
                                ) : (
                                    (announcementType === "hackathon" ? hackathons : contests).map((event) => (
                                        <option key={event.id} value={event.id}>
                                            {event.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    )}

                    {/* Winner Email */}
                    {(announcementType === "hackathon" || announcementType === "contest") && (
                        <div>
                            <label className="block text-m font-medium mb-2">Winner Email</label>
                            <input
                                type="email"
                                value={winnerEmail}
                                onChange={(e) => setWinnerEmail(e.target.value)}
                                className="w-full bg-[#21272e] text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                                placeholder="Winner's Email"
                            />
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label className="block text-m font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={tit}
                            onChange={(e) => setTit(e.target.value)}
                            className="w-full bg-[#21272e] text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                            placeholder="Event Title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-m font-medium mb-2">Description</label>
                        <textarea
                            rows="4"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            className="w-full bg-[#21272e] text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                            placeholder="Event Description"
                        ></textarea>
                    </div>

                    {/* Contact Email */}
                    <div>
                        <label className="block text-m font-medium mb-2">Contact Email</label>
                        <input
                            type="email"
                            value={ctEmail}
                            onChange={(e) => setCtEmail(e.target.value)}
                            className="w-full bg-[#21272e] text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                            placeholder="Email Address"
                        />
                    </div>

                    {/* Contact Phone */}
                    <div>
                        <label className="block text-m font-medium mb-2">Contact Phone</label>
                        <input
                            type="text"
                            value={ctPhone}
                            onChange={(e) => setCtPhone(e.target.value)}
                            className="w-full bg-[#21272e] text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                            placeholder="Phone Number"
                        />
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="block text-m font-medium mb-2">Deadline</label>
                        <input
                            type="text"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full bg-[#21272e] text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                            placeholder="Deadline (e.g., 2024-12-20)"
                        />
                    </div>

                    {/* Organizers */}
                    <div>
                        <label className="block text-m font-medium mb-2">Organizers</label>
                        {org.map((o, index) => (
                            <div key={index} className="flex gap-4 mb-2">
                                <input
                                    type="text"
                                    className="w-1/2 bg-[#21272e] text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                                    placeholder="Organizer Name"
                                    value={o.name}
                                    onChange={(e) =>
                                        handleOrganizerChange(index, "name", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    className="w-1/2 bg-[#21272e] text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                                    placeholder="Organizer Contact"
                                    value={o.cont}
                                    onChange={(e) =>
                                        handleOrganizerChange(index, "cont", e.target.value)
                                    }
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addOrganizer}
                            className="px-4 py-2 mt-2 rounded-md bg-[#0DB276] hover:bg-[#0aa46c]"
                        >
                            + Add another organizer
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#0DB276] text-white px-4 py-2 rounded-md font-medium"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default EventForm;
