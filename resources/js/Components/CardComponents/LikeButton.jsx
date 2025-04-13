import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function LikeButton({ portfolio }) {
    const { auth } = usePage().props;
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showHeart, setShowHeart] = useState(false);

    function handleLike(e) {
        e.preventDefault();

        if (!auth.user) {
            router.visit("/login");
            return;
        }

        setLoading(true);
        setIsAnimating(true);

        router.post(
            `/portfolios/user/${auth.user?.username}/like`,
            {
                portfolio_id: portfolio.id,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setIsLiked(!isLiked);
                    setLoading(false);
                    // Show floating heart only when liking
                    if (!isLiked) {
                        setShowHeart(true);
                        setTimeout(() => setShowHeart(false), 1000);
                    }
                },
                onError: () => {
                    setLoading(false);
                },
            }
        );
    }

    useEffect(() => {
        if (auth.user) {
            const isPortfolioLiked = portfolio.likes.some(
                (like) => like.user_id === auth.user.id
            );
            setIsLiked(isPortfolioLiked);
        }
    }, [auth.user, portfolio.likes]);

    // Heart burst animation variants
    const heartVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: {
            scale: [1, 1.5, 1],
            opacity: 1,
            transition: { duration: 0.5 },
        },
        exit: { scale: 0, opacity: 0 },
    };

    // Floating hearts animation
    const floatingHeart = {
        hidden: { y: 0, opacity: 1 },
        visible: {
            y: -20,
            opacity: 0,
            transition: { duration: 1, ease: "easeOut" },
        },
    };

    return (
        <div className="relative">
            {/* Floating hearts animation */}
            <AnimatePresence>
                {showHeart && (
                    <motion.div
                        className="absolute -top-8 left-0"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={floatingHeart}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-red-500"
                            fill="red"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main like button */}
            <motion.button
                onClick={handleLike}
                className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                disabled={loading}
                whileTap={{ scale: 0.9 }}
            >
                <AnimatePresence mode="wait">
                    {isLiked ? (
                        <motion.div
                            key="liked"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={heartVariants}
                            className="flex items-center"
                            onAnimationComplete={() => setIsAnimating(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-red-500"
                                fill="red"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <motion.span
                                className="text-red-500"
                                initial={{ scale: 1 }}
                                animate={
                                    isAnimating ? { scale: [1, 1.2, 1] } : {}
                                }
                                transition={{ duration: 0.3 }}
                            >
                                {portfolio.likes_count !== 0
                                    ? portfolio.likes_count
                                    : ""}
                            </motion.span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="not-liked"
                            className="flex items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <span>
                                {portfolio.likes_count !== 0
                                    ? portfolio.likes_count
                                    : ""}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
