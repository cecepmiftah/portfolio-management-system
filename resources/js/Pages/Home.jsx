import { Head, Link } from "@inertiajs/react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Home({ portfolios }) {
    const controls = useAnimation();

    // Animate elements when they come into view
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll(".scroll-animate");
            elements.forEach((el) => {
                const elementTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (elementTop < windowHeight - 100) {
                    controls.start("visible");
                    el.classList.add("animated");
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, [controls]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    const featureCardVariants = {
        hover: {
            y: -10,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        },
    };

    const portfolioItemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
            },
        },
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.3,
            },
        },
    };

    const floatingCircleVariants = {
        float: {
            y: [-10, 10, -10],
            rotate: [0, 5, 0],
            transition: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <>
            <Head>
                <title>FolioSnap - Showcase Your Creative Portfolio</title>
            </Head>

            {/* Hero Section */}
            <section className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white/10"
                            style={{
                                width: `${Math.random() * 100 + 50}px`,
                                height: `${Math.random() * 100 + 50}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            variants={floatingCircleVariants}
                            animate="float"
                            initial="float"
                            transition={{
                                duration: Math.random() * 10 + 10,
                                delay: Math.random() * 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    className="container mx-auto px-6 z-10 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Main Logo/Title with Enhanced Contrast */}
                    <motion.div className="mb-8" variants={itemVariants}>
                        <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
                            <motion.span
                                className="bg-gradient-to-r from-accent via-pink-500 to-yellow-400 bg-clip-text text-transparent"
                                style={{
                                    textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                                    letterSpacing: "-0.05em",
                                    lineHeight: 1.1,
                                }}
                                animate={{
                                    backgroundPosition: [
                                        "0% 50%",
                                        "100% 50%",
                                        "0% 50%",
                                    ],
                                }}
                                transition={{
                                    duration: 8, // Slower animation for better readability
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                FolioSnap
                            </motion.span>
                        </motion.h1>

                        {/* Subtle Tagline */}
                        <motion.p
                            className="text-lg md:text-xl text-white/80 font-medium"
                            variants={itemVariants}
                        >
                            Your Portfolio. Your Story.
                        </motion.p>
                    </motion.div>

                    {/* Main Description with Better Typography */}
                    <motion.p
                        className="text-xl md:text-2xl lg:text-3xl text-white font-medium mb-10 max-w-3xl mx-auto leading-relaxed"
                        variants={itemVariants}
                        style={{
                            textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                        }}
                    >
                        The{" "}
                        <span className="font-bold text-white">
                            premium platform
                        </span>{" "}
                        to showcase your creative work and{" "}
                        <span className="font-bold text-white">connect</span>{" "}
                        with potential clients
                    </motion.p>

                    {/* CTA Buttons with Improved Visual Weight */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
                        variants={itemVariants}
                    >
                        <Link
                            href="/portfolios/create"
                            className="btn btn-accent btn-lg rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
                        >
                            <motion.span
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center justify-center gap-2 font-semibold"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Get Started
                            </motion.span>
                        </Link>
                        <Link
                            href="/portfolios"
                            className="btn btn-outline btn-lg text-white border-white/30 rounded-full px-8 hover:bg-white/10 hover:border-white/40 transition-all"
                        >
                            <motion.span
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center justify-center gap-2 font-medium"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Explore Creatives
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Additional Trust Indicators */}
                    <motion.div
                        className="mt-12 text-white/70 text-sm md:text-base"
                        variants={itemVariants}
                    >
                        {/* <p>Trusted by thousands of creatives worldwide</p> */}
                        <div className="flex justify-center gap-6 mt-4 opacity-80">
                            {[
                                "Designers",
                                "Photographers",
                                "Developers",
                                "Artists",
                            ].map((profession, i) => (
                                <span key={i} className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1 text-accent"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {profession}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{
                        y: [0, 10, 0],
                        opacity: [1, 0.5, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-white mt-2 rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-base-100">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16 scroll-animate"
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6 },
                            },
                        }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why Choose{" "}
                            <span className="text-primary">FolioSnap</span>?
                        </h2>
                        <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                            Professional tools for creative minds to showcase
                            their best work
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        {[
                            {
                                icon: "🎨",
                                title: "Stunning Portfolios",
                                desc: "Showcase your work with our beautiful, customizable templates.",
                            },
                            {
                                icon: "⚡",
                                title: "Lightning Fast",
                                desc: "Built for speed so your work gets the attention it deserves.",
                            },
                            {
                                icon: "🔒",
                                title: "Secure & Private",
                                desc: "Full control over your content and visibility settings.",
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="card bg-base-200 shadow-xl overflow-hidden"
                                variants={itemVariants}
                                whileHover="hover"
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div
                                    className="card-body items-center text-center p-8"
                                    variants={featureCardVariants}
                                >
                                    <div className="text-4xl mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="card-title text-xl">
                                        {feature.title}
                                    </h3>
                                    <p className="text-base-content/80">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Showcase Section */}
            <section className="py-20 bg-gradient-to-br from-base-100 to-base-200">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16 scroll-animate"
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6 },
                            },
                        }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Featured{" "}
                            <span className="text-secondary">Portfolios</span>
                        </h2>
                        <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                            Discover inspiring work from our creative community
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        {portfolios &&
                            portfolios.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className="group relative overflow-hidden rounded-2xl shadow-xl"
                                    variants={portfolioItemVariants}
                                    whileHover="hover"
                                >
                                    <div className="aspect-[4/3] bg-neutral/10 relative">
                                        <img
                                            src={item.thumbnail}
                                            alt={`Portfolio ${item.slug}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.div
                                                className="text-white"
                                                initial={{ y: 20 }}
                                                whileHover={{ y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <h3 className="font-bold text-xl">
                                                    Project {item.title}
                                                </h3>
                                                <p className="text-white/80">
                                                    by Creative Designer
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                    </motion.div>

                    <motion.div
                        className="text-center mt-12 scroll-animate"
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6 },
                            },
                        }}
                    >
                        <Link
                            href="/portfolios"
                            className="btn btn-primary btn-wide rounded-full"
                        >
                            View More
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-content">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        className="max-w-3xl mx-auto scroll-animate"
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6 },
                            },
                        }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Showcase Your Work?
                        </h2>
                        <p className="text-xl mb-8">
                            Join thousands of creatives already sharing their
                            best work on FolioSnap
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/portfolios/create"
                                className="btn btn-accent btn-lg rounded-full px-10"
                            >
                                Create Your Portfolio Now
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
