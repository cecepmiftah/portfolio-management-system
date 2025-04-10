import { format } from "date-fns";

export default function WorkExperienceSection({ experiences }) {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Work Experience
            </h2>

            {experiences?.length > 0 ? (
                <div className="space-y-6">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-medium">
                                        {exp.job_title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {exp.company_name}
                                    </p>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
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
                                </div>
                            </div>

                            {exp.description && (
                                <div className="mt-4 text-gray-700 dark:text-gray-300">
                                    {exp.description}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">
                    No work experience added yet.
                </p>
            )}
        </div>
    );
}
