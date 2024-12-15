import React, { useState } from "react";

const EventForm = () => {
    const [tit, setTit] = useState(""); // Schema: 'tit' for Title
    const [desc, setDesc] = useState(""); // Schema: 'desc' for Description
    const [ctEmail, setCtEmail] = useState(""); // Schema: 'contactEmail'
    const [ctPhone, setCtPhone] = useState(""); // Schema: 'contactPhone'
    const [deadline, setDeadline] = useState(""); // Schema: 'deadline' for Deadline
    const [org, setOrg] = useState([{ name: "", cont: "" }]); // Schema: 'org' array
    const [eType, setEType] = useState(""); // Schema: 'eType' for Event Type

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.tokene || null;

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

        // Basic Validation
        if (!tit || !desc || !ctEmail || !ctPhone || !deadline || !eType) {
            alert("Please fill in all required fields.");
            return;
        }

        if (org.some((o) => !o.name || !o.cont)) {
            alert("Please fill in all organizer details.");
            return;
        }

        // Form data according to schema
        const formData = {
            tit,
            desc,
            eType,
            ctEmail,
            ctPhone,
            deadline,
            org,
        };

        try {
            const response = await fetch("http://localhost:4000/auth/addevents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token, // Include token for authenticated requests
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Event created successfully!");
                // Reset form fields
                setTit("");
                setDesc("");
                setCtEmail("");
                setCtPhone("");
                setDeadline("");
                setOrg([{ name: "", cont: "" }]);
                setEType("");
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
            {/* Page Header */}
            <header className="px-8 pt-8 pb-4 bg-[#181C21]">
                <h1 className="text-3xl font-bold text-[#0DB276] text-center">Event Registration</h1>
            </header>

            {/* Form Section */}
            <main className="px-8 py-8">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
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
                    <div>
                        <label className="block text-m font-medium mb-2">Event Type</label>
                        <div className="flex gap-4 bg-[#21272e] p-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="eType"
                                    value="Contest"
                                    checked={eType === "Contest"}
                                    onChange={(e) => setEType(e.target.value)}
                                    className="bg-[#21272e] focus:ring-[#0DB276]"
                                />
                                Contest
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="eType"
                                    value="Hackathon"
                                    checked={eType === "Hackathon"}
                                    onChange={(e) => setEType(e.target.value)}
                                    className="bg-[#21272e] focus:ring-[#0DB276]"
                                />
                                Hackathon
                            </label>
                        </div>
                    </div>
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
                    <div>
                        <label className="block text-m font-medium mb-2">Deadlines</label>
                        <input
                            type="text"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full bg-[#21272e] text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                            placeholder="Deadline (e.g., 2024-12-20)"
                        />
                    </div>
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
                            + Add Organizer
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#0DB276] hover:bg-[#0aa46c] px-4 py-2 rounded-md"
                    >
                        Submit
                    </button>
                </form>
            </main>
        </div>
    );
};

export default EventForm;
