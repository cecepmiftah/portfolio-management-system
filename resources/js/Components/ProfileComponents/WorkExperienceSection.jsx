import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkExperienceSection({ experiences }) {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
                <h2 className="card-title text-xl">Work Experience</h2>

                {experiences.length === 0 ? (
                    <p className="text-gray-500">
                        No work experience added yet
                    </p>
                ) : (
                    <div className="space-y-2 mt-4">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="border-b border-base-300 pb-2 last:border-0"
                            >
                                <button
                                    onClick={() => toggleExpand(index)}
                                    className="w-full text-left flex justify-between items-center p-2 hover:bg-base-300 rounded-lg transition-colors"
                                >
                                    <div>
                                        <h3 className="font-medium">
                                            {exp.company}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {exp.position}
                                        </p>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 transform transition-transform ${
                                            expandedIndex === index
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {expandedIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 space-y-2">
                                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                    <svg
                                                        className="w-4 h-4 mr-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    {formatDate(exp.start_date)}{" "}
                                                    -{" "}
                                                    {exp.is_current
                                                        ? "Present"
                                                        : formatDate(
                                                              exp.end_date
                                                          )}
                                                </div>
                                                {exp.description && (
                                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                                        {exp.description}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper function to format date
function formatDate(dateString) {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
