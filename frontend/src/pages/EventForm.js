import React, { useState } from "react";

const EventForm = () => {
    const [organizers, setOrganizers] = useState([{ name: "", contact: "" }]);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.tokene || null;

    const addOrganizer = () => {
        setOrganizers([...organizers, { name: "", contact: "" }]);
    };

    const handleOrganizerChange = (index, field, value) => {
        const newOrganizers = [...organizers];
        newOrganizers[index][field] = value;
        setOrganizers(newOrganizers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            title: e.target[0].value, // Title input
            desc: e.target[1].value, // Description textarea
            contactDetails: e.target[2].value, // Contact Details input
            deadline: e.target[3].value, // Deadline input
            organizers, // Organizers array
        };

        try {
            const response = await fetch("http://localhost:4000/auth/addevents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Event created successfully:", data);

                // Show success alert
                alert("Event created successfully!");

                // Clear all useStates after successful submission
                e.target.reset(); // Clear the form inputs
                setOrganizers([{ name: "", contact: "" }]);
            } else {
                const errorData = await response.json();
                console.error("Error creating event:", errorData);
                alert("Failed to create event. Please try again.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("An error occurred. Please check your network and try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#181C21] text-slate-300">
            {/* Page Header */}
            <header className="px-8 pt-8 pb-4 bg-[#181C21]">
                <h1 className="text-3xl font-bold text-[#0DB276] text-center">
                    Event Registration
                </h1>
            </header>

            {/* Form Section */}
            <main className="px-8 py-8">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                    <div>
                        <label className="block text-m font-medium mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full bg-gray-800 text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                            placeholder="Event Title"
                        />
                    </div>
                    <div>
                        <label className="block text-m font-medium mb-2">Description</label>
                        <textarea
                            rows="4"
                            className="w-full bg-gray-800 text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                            placeholder="Event Description"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-m font-medium mb-2">Contact Details</label>
                        <input
                            type="text"
                            className="w-full bg-gray-800 text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                            placeholder="Contact Email/Phone"
                        />
                    </div>
                    <div>
                        <label className="block text-m font-medium mb-2">Deadline</label>
                        <input
                            type="datetime-local"
                            className="w-full bg-gray-800 text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                            placeholder="Select Deadline"
                        />
                    </div>
                    <div>
                        <label className="block text-m font-medium mb-2">Organizers</label>
                        {organizers.map((organizer, index) => (
                            <div key={index} className="flex gap-4 mb-2">
                                <input
                                    type="text"
                                    className="w-1/2 bg-gray-800 text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                                    placeholder="Organizer Name"
                                    value={organizer.name}
                                    onChange={(e) =>
                                        handleOrganizerChange(index, "name", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    className="w-1/2 bg-gray-800 text-slate-300 px-4 py-2 rounded-md focus:outline-none"
                                    placeholder="Organizer Contact"
                                    value={organizer.contact}
                                    onChange={(e) =>
                                        handleOrganizerChange(index, "contact", e.target.value)
                                    }
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addOrganizer}
                            className="px-4 py-2 mt-2 rounded-md bg-[#0DB276] hover:bg-[#0aa46c] "
                        >
                            + Add Organizer
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#0DB276] hover:bg-[#0aa46c] px-4 py-2 rounded-md "
                    >
                        Submit
                    </button>
                </form>
            </main>
        </div>
    );
};

export default EventForm;
