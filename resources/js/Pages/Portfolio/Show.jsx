import { Link, usePage } from "@inertiajs/react";
import PortfolioViewer from "../../Components/PortfolioComponents/PortfolioViewer";
import CommentSection from "../../Components/PortfolioComponents/CommentSection";
import Pagination from "../../Components/Pagination";
import avatarImg from "../../../img/person.png";

export default function Show({ portfolio, content }) {
    const { auth } = usePage().props;
    const contentParsed =
        typeof content === "string" ? JSON.parse(content) : content;
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{portfolio.title}</h1>

                {/* Portfolio Metadata */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {portfolio.project_date && (
                        <div className="flex items-center">
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
                            {new Date(
                                portfolio.project_date
                            ).toLocaleDateString()}
                        </div>
                    )}

                    {portfolio.project_url && (
                        <div className="flex items-center">
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
                            <a
                                href={portfolio.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                View Project
                            </a>
                        </div>
                    )}

                    {portfolio.categories && (
                        <div className="flex items-center">
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
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                            </svg>
                            {portfolio.categories.map((category) => (
                                <span
                                    key={category.id}
                                    className="text-gray-600 dark:text-gray-400"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {portfolio.likes && portfolio.likes_count > 0 && (
                        <div className="flex items-center group relative">
                            <div
                                className="tooltip tooltip-left"
                                data-tip={portfolio.likes
                                    .map((like) => like.user.username)
                                    .join(", ")}
                            >
                                <svg
                                    className="w-5 h-5 mr-1 text-pink-500"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {portfolio.likes_count}
                            </span>

                            {/* Custom Tooltip for better styling */}
                            <div className="absolute z-20 hidden group-hover:block left-full mb-2 px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-sm whitespace-nowrap">
                                <div className="flex flex-col space-y-2">
                                    <span className="font-semibold mb-1">
                                        Liked by:
                                    </span>
                                    {portfolio.likes.slice(0, 5).map((like) => (
                                        <div
                                            key={like.id}
                                            className="flex items-center space-x-2 px-4"
                                        >
                                            <img
                                                src={
                                                    like.user.avatar ||
                                                    avatarImg
                                                }
                                                alt={like.user.username}
                                                className="w-5 h-5 rounded-full object-cover"
                                            />
                                            <span>{like.user.username}</span>
                                        </div>
                                    ))}
                                    {portfolio.likes_count > 5 && (
                                        <span className="text-xs text-gray-400">
                                            +{portfolio.likes_count - 5} more
                                        </span>
                                    )}
                                </div>
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800 rotate-45"></div>
                            </div>
                        </div>
                    )}

                    {/* Edit Link */}

                    {auth.user && auth.user.id === portfolio.user_id && (
                        <Link
                            href={`/portfolios/${portfolio.slug}/edit`}
                            className="flex items-center hover:text-blue-500 dark:hover:text-blue-400"
                        >
                            <svg
                                className="w-4 h-4 mr-1 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                            Edit
                        </Link>
                    )}
                </div>

                {portfolio.description && (
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {portfolio.description}
                    </p>
                )}
            </div>

            {/* Portfolio Content */}
            <div className="bg-white p-6 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <PortfolioViewer content={contentParsed} />
            </div>

            <div className="mt-8">
                {/* Comment Section Component */}
                <CommentSection portfolioId={portfolio.id} />
            </div>
        </div>
    );
}
