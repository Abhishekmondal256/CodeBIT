import React, { useEffect, useState } from 'react';

const HackathonmanagePage = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch('/api/students') // Replace with your API route
            .then((res) => res.json())
            .then((data) => setStudents(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-green-400 text-center mb-6 sm:mb-8">
                Registered Teams
            </h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full max-w-5xl mx-auto bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-green-400 text-sm sm:text-base">
                               SNo.
                            </th>
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-green-400 text-sm sm:text-base">
                                Team Name
                            </th>
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-green-400 text-sm sm:text-base">
                                Hackathon Theme
                            </th>
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-green-400 text-sm sm:text-base">
                                Team Leader
                            </th>
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-green-400 text-sm sm:text-base">
                                Team Members
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr
                                key={student._id}
                                className={`border-b border-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'
                                    }`}
                            >
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base">
                                    {student.teamName}
                                </td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base">
                                    {student.hackathonTheme}
                                </td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base">
                                    {student.teamLeader}
                                </td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base">
                                    {student.teamMembers.join(', ')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HackathonmanagePage;