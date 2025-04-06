import { Link } from "@inertiajs/react";
import TooltipProfile from "./CardComponents/TooltipProfile";
import LikeButton from "./CardComponents/LikeButton";
import ViewCount from "./CardComponents/ViewCount";

export default function PortfolioCard({ portfolio }) {
    return (
        <div className="card w-80 bg-base-100 shadow-xl group">
            <figure className="relative overflow-hidden h-64">
                {/* Gambar yang bisa diklik ke halaman detail */}
                <Link href={`/portfolios/${portfolio.slug}`}>
                    <img
                        src={portfolio.thumbnail}
                        alt="Thumbnail"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay yang muncul saat hover */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-bold text-white mb-2">
                            {portfolio.title}
                        </h3>
                        <p className="text-gray-300">
                            {portfolio.description.length > 100
                                ? `${portfolio.description.slice(0, 100)}...`
                                : portfolio.description}
                        </p>
                    </div>
                </Link>
            </figure>

            <div className="card-body">
                <div className="flex items-center justify-between">
                    {/* Bagian owner yang bisa diklik ke profile */}
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/user/${portfolio.user.username}`}
                            className="card-title text-sm hover:text-primary transition-colors duration-200 relative group/owner"
                        >
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img
                                        src="https://placehold.co/50x50"
                                        alt="Profile Owner"
                                    />
                                </div>
                            </div>
                            {portfolio.user.username}
                            {/* Tooltip profile owner yang muncul saat hover */}
                            <TooltipProfile user={portfolio.user} />
                        </Link>
                    </div>

                    {/* Bagian like dan view */}
                    <div className="flex items-center space-x-4">
                        {/* Like Button */}
                        <LikeButton />

                        {/* View Count */}
                        <ViewCount />
                    </div>
                </div>
            </div>
        </div>
    );
}
