import { Link } from "@inertiajs/react";
import TooltipProfile from "./CardComponents/TooltipProfile";
import LikeButton from "./CardComponents/LikeButton";
import ViewCount from "./CardComponents/ViewCount";
import avatarImg from "../../img/person.png";
import { useState } from "react";

export default function PortfolioCard({ portfolio }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isTapped, setIsTapped] = useState(false);

    // Handler untuk mobile touch
    const handleTouch = () => {
        setIsTapped(!isTapped);
    };

    return (
        <div
            className="card w-full sm:w-80 bg-base-100 shadow-xl group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouch}
        >
            <figure className="relative overflow-hidden h-64">
                <Link href={`/portfolios/${portfolio.slug}`} legacyBehavior>
                    <a>
                        <img
                            src={portfolio.thumbnail}
                            alt="Thumbnail"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay yang muncul saat hover/tap */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end
                            ${
                                isHovered || isTapped
                                    ? "opacity-100"
                                    : "opacity-0 sm:opacity-0"
                            }
                            transition-opacity duration-300`}
                        >
                            <h3 className="text-xl font-bold text-white mb-2">
                                {portfolio.title}
                            </h3>
                            <p className="text-gray-300">
                                {portfolio.description &&
                                portfolio.description.length > 100
                                    ? `${portfolio.description.slice(
                                          0,
                                          100
                                      )}...`
                                    : portfolio.description}
                            </p>
                        </div>
                    </a>
                </Link>
            </figure>

            <div className="card-body p-4">
                <div className="flex items-center justify-between">
                    {/* Bagian owner */}
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/user/${portfolio.user.username}`}
                            className="flex items-center space-x-2"
                            legacyBehavior
                        >
                            <a className="card-title text-sm hover:text-primary transition-colors duration-200 relative group/owner">
                                <div className="avatar">
                                    <div className="w-8 rounded-full">
                                        <img
                                            src={
                                                portfolio.user.avatar ||
                                                avatarImg
                                            }
                                            alt="Profile Owner"
                                        />
                                    </div>
                                </div>
                                <span className="hidden sm:inline">
                                    {portfolio.user.username}
                                </span>
                                <TooltipProfile user={portfolio.user} />
                            </a>
                        </Link>
                    </div>

                    {/* Bagian like dan view */}
                    <div className="flex items-center space-x-4">
                        <LikeButton portfolio={portfolio} />
                        <ViewCount count={portfolio.views} />
                    </div>
                </div>

                {/* Judul dan deskripsi yang selalu terlihat di mobile */}
                <div className="sm:hidden mt-2">
                    <h3 className="text-lg font-bold">{portfolio.title}</h3>
                    {portfolio.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {portfolio.description.length > 100
                                ? `${portfolio.description.slice(0, 100)}...`
                                : portfolio.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
