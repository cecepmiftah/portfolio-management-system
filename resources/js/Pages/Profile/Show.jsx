import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioCardProfile from "@/Components/CardComponents/PortfolioCardProfile";
import WorkExperienceSection from "@/Components/ProfileComponents/WorkExperienceSection";
import ContactMeSection from "../../Components/ProfileComponents/ContactMeSection";

export default function Show({ user }) {
    const { auth, flash } = usePage().props;
    const [message, setMessage] = useState(flash.message);

    return (
        <div className="min-h-screen bg-base-100">
            {/* Flash Message */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        role="alert"
                        className="alert alert-success mb-4 mx-4 mt-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cover Photo */}
            <div className="h-64 bg-gradient-to-r from-primary to-secondary relative">
                <div className="absolute -bottom-16 left-8">
                    <div className="avatar">
                        <div className="w-32 h-32 rounded-full ring-4 ring-base-100 bg-base-100">
                            <img
                                src={
                                    user.avatar ?? "/images/default-avatar.png"
                                }
                                alt={user.username}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="container mx-auto px-4 pt-20 pb-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="card bg-base-200 shadow-sm">
                            <div className="card-body">
                                <h1 className="text-3xl font-bold">
                                    {user.first_name} {user.last_name}
                                    <span className="text-primary">
                                        {" "}
                                        @{user.username}
                                    </span>
                                </h1>

                                {/* Occupation & Location */}
                                {user.occupation && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span>{user.occupation}</span>
                                        {user.company && (
                                            <span>at {user.company}</span>
                                        )}
                                    </div>
                                )}

                                {user.location && (
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span>
                                            {user.city}, {user.location}
                                        </span>
                                    </div>
                                )}

                                <div className="divider my-2"></div>

                                {/* About Section */}
                                {user.about && (
                                    <p className="text-base-content/80">
                                        {user.about}
                                    </p>
                                )}

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {user.website && (
                                        <a
                                            href={user.website}
                                            target="_blank"
                                            rel="noopener"
                                            className="badge badge-outline hover:badge-primary transition-all"
                                        >
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
                                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                                />
                                            </svg>
                                            Website
                                        </a>
                                    )}
                                    <div className="badge badge-primary">
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
                                                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v4a2 2 0 01-2 2"
                                            />
                                        </svg>
                                        {user.provider || "Local"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="stats shadow bg-base-200 w-full">
                            <div className="stat">
                                <div className="stat-title">Projects</div>
                                <div className="stat-value">
                                    {user.portfolios.length}
                                </div>
                                <div className="stat-desc">
                                    Total portfolio works
                                </div>
                            </div>
                        </div>

                        {/* Contact Me Section */}
                        <ContactMeSection setMessage={setMessage} user={user} />

                        {/* Edit Profile Link */}
                        {auth.user && auth.user.id === user.id && (
                            <Link
                                href={`/user/${user.username}/edit`}
                                className="btn btn-outline w-full"
                            >
                                Edit Profile
                            </Link>
                        )}

                        {/* Work Experience Section */}
                        <WorkExperienceSection
                            experiences={user.work_experiences}
                        />
                    </div>

                    {/* Right Column - Portfolio Works */}
                    <div className="lg:w-2/3">
                        <div className="card bg-base-200 shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title text-2xl">
                                    Portfolio Works
                                </h2>
                                {user.portfolios.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        {user.portfolios.map((item) => (
                                            <PortfolioCardProfile
                                                key={item.id}
                                                item={item}
                                                user={auth.user}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No portfolio works yet
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
