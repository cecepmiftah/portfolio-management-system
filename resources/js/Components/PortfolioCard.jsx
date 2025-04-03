import { Link } from "@inertiajs/react";
import TooltipProfile from "./CardComponents/TooltipProfile";
import LikeButton from "./CardComponents/LikeButton";
import ViewCount from "./CardComponents/ViewCount";

export default function PortfolioCard() {
    return (
        <div class="card w-80 bg-base-100 shadow-xl group">
            <figure class="relative overflow-hidden h-64">
                {/* Gambar yang bisa diklik ke halaman detail */}
                <Link href={`/portfolios/${1}`}>
                    <img
                        src="https://placehold.co/600x400"
                        alt="Gambar"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay yang muncul saat hover */}
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 class="text-xl font-bold text-white mb-2">
                            Judul Hover
                        </h3>
                        <p class="text-gray-300">
                            Deskripsi yang muncul dari bawah saat hover
                        </p>
                    </div>
                </Link>
            </figure>

            <div class="card-body">
                <div class="flex items-center justify-between">
                    {/* Bagian owner yang bisa diklik ke profile */}
                    <div class="flex items-center space-x-2">
                        <Link
                            href="/profile-owner"
                            class="card-title text-sm hover:text-primary transition-colors duration-200 relative group/owner"
                        >
                            <div class="avatar">
                                <div class="w-8 rounded-full">
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
                    <div class="flex items-center space-x-4">
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
