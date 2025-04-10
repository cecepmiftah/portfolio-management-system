import { useState } from "react";
import { format } from "date-fns";

export default function WorkExperienceInput({ experiences = [], onChange }) {
    const [newExperience, setNewExperience] = useState({
        job_title: "",
        company_name: "",
        start_date: "",
        end_date: "",
        is_current: false,
        description: "",
    });

    const handleAddExperience = () => {
        if (
            !newExperience.job_title ||
            !newExperience.company_name ||
            !newExperience.start_date
        )
            return;

        const updatedExperiences = [...experiences, newExperience];
        onChange(updatedExperiences);
        setNewExperience({
            title: "",
            company: "",
            start_date: "",
            end_date: "",
            is_current: false,
            description: "",
        });
    };

    const handleRemoveExperience = (index) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        onChange(updatedExperiences);
    };

    const handleCurrentJobChange = (e) => {
        const isChecked = e.target.checked;
        setNewExperience((prev) => ({
            ...prev,
            is_current: isChecked,
            end_date: isChecked ? "" : prev.end_date,
        }));
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Work Experience</h2>

            <div className="grid grid-cols-1">
                {/* Existing Experiences */}
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="mb-4 p-4 border rounded-lg w-full"
                    >
                        <div className="flex justify-between">
                            <div>
                                <p className="font-medium">
                                    {exp.title} at {exp.company}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {format(
                                        new Date(exp.start_date),
                                        "MMM yyyy"
                                    )}{" "}
                                    -{" "}
                                    {exp.is_current
                                        ? "Present"
                                        : format(
                                              new Date(exp.end_date),
                                              "MMM yyyy"
                                          )}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveExperience(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add New Experience Form */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Job Title*
                        </label>
                        <input
                            type="text"
                            value={newExperience.title}
                            onChange={(e) =>
                                setNewExperience({
                                    ...newExperience,
                                    title: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Company Name*
                        </label>
                        <input
                            type="text"
                            value={newExperience.company_name}
                            onChange={(e) =>
                                setNewExperience({
                                    ...newExperience,
                                    company: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Start Date*
                        </label>
                        <input
                            type="date"
                            value={newExperience.start_date}
                            onChange={(e) =>
                                setNewExperience({
                                    ...newExperience,
                                    start_date: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={newExperience.end_date}
                            onChange={(e) =>
                                setNewExperience({
                                    ...newExperience,
                                    end_date: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded"
                            disabled={newExperience.is_current}
                        />
                        <div className="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                id={`current-job`}
                                checked={newExperience.is_current}
                                onChange={handleCurrentJobChange}
                                className="mr-2"
                            />
                            <label htmlFor={`current-job`} className="text-sm">
                                I currently work here
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        value={newExperience.description}
                        onChange={(e) =>
                            setNewExperience({
                                ...newExperience,
                                description: e.target.value,
                            })
                        }
                        className="w-full p-2 border rounded"
                        rows={3}
                    />
                </div>

                <button
                    type="button"
                    onClick={handleAddExperience}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={
                        !newExperience.job_title ||
                        !newExperience.company_name ||
                        !newExperience.start_date
                    }
                >
                    Add Experience
                </button>
            </div>
        </div>
    );
}
