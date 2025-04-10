import { Link, usePage, Head, router } from "@inertiajs/react";
import avatarImg from "../../../img/person.png";
import { useState } from "react";
import PortfolioCardProfile from "../../Components/CardComponents/PortfolioCardProfile";

export default function Show({ user }) {
    const { auth, flash } = usePage().props;
    const [message, setMessage] = useState(flash.message);

    // function handleDelete(e) {
    //     e.preventDefault();
    //     console.log(e.target.value);
    //     // router.delete(`/portfolios/${e.target.value}`, {
    //     //     onSuccess: () => {
    //     //         setMessage("Portfolio deleted successfully.");
    //     //     },
    //     //     onError: () => {
    //     //         setMessage("Failed to delete portfolio.");
    //     //     },
    //     // });
    // }

    return (
        <div className="min-h-screen bg-base-100">
            {message && (
                <div
                    role="alert"
                    className="alert alert-success alert-soft mb-4"
                >
                    <span>{message}</span>
                </div>
            )}
            {/* Cover Photo */}
            <div className="h-64 bg-gradient-to-r from-primary to-secondary relative">
                <div className="absolute -bottom-16 left-8">
                    <div className="avatar">
                        <div className="w-32 h-32 rounded-full ring-4 ring-base-100 bg-base-100">
                            <img
                                src={user.avatar ?? avatarImg}
                                alt={user.username}
                                className="object-cover"
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
                                    {user.first_name} {user.last_name} |
                                    <span className="text-primary">
                                        {" "}
                                        @{user.username}
                                    </span>
                                </h1>

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

                                {user.about && (
                                    <p className="text-base-content/80">
                                        {user.about}
                                    </p>
                                )}

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
                                    Jan 1st - Feb 1st
                                </div>
                            </div>
                        </div>
                        {auth.user && auth.user.id === user.id && (
                            <div className="p-4 shadow bg-base-200 w-full">
                                <Link
                                    href={`/user/${user.username}/edit`}
                                    className="link"
                                >
                                    <div className="text-lg font-bold">
                                        Edit your profile
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-2/3">
                        <div className="card bg-base-200 shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title text-2xl">
                                    Portfolio Works
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    {user.portfolios.map((item) => (
                                        <PortfolioCardProfile
                                            key={item.id}
                                            item={item}
                                            userId={auth.user}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
