import { Link } from "@inertiajs/react";
import TooltipProfile from "./CardComponents/TooltipProfile";
import LikeButton from "./CardComponents/LikeButton";
import ViewCount from "./CardComponents/ViewCount";

export default function PortfolioCard() {
    return (
        <div className="card w-80 bg-base-100 shadow-xl group">
            <figure className="relative overflow-hidden h-64">
                {/* Gambar yang bisa diklik ke halaman detail */}
                <Link href={`/portfolios/${1}`}>
                    <img
                        src="https://placehold.co/600x400"
                        alt="Gambar"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay yang muncul saat hover */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-bold text-white mb-2">
                            Judul Hover
                        </h3>
                        <p className="text-gray-300">
                            Deskripsi yang muncul dari bawah saat hover
                        </p>
                    </div>
                </Link>
            </figure>

            <div className="card-body">
                <div className="flex items-center justify-between">
                    {/* Bagian owner yang bisa diklik ke profile */}
                    <div className="flex items-center space-x-2">
                        <Link
                            href="/profile-owner"
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
                            John Doe
                            {/* Tooltip profile owner yang muncul saat hover */}
                            <TooltipProfile />
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
