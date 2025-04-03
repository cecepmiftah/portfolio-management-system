// resources/js/Pages/Portfolio/components/FloatingHeader.jsx
import { useState, useEffect } from "react";

export default function FloatingHeader({ title, user }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-6"
            }`}
        >
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                <h1
                    className={`font-bold transition-all ${
                        isScrolled ? "text-xl" : "text-2xl"
                    }`}
                >
                    {title}
                </h1>
                <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
                        Like
                    </button>
                    <div className="flex items-center">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="ml-2 hidden md:inline">
                            {user.name}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
