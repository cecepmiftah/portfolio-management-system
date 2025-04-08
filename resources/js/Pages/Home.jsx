import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";

export default function Home() {
    // Animasi scroll
    useEffect(() => {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll(".animate-fade-in");
            elements.forEach((el) => {
                const elementPosition = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementPosition < windowHeight - 100) {
                    el.classList.add("opacity-100", "translate-y-0");
                }
            });
        };

        window.addEventListener("scroll", animateOnScroll);
        animateOnScroll(); // Trigger initial check
        return () => window.removeEventListener("scroll", animateOnScroll);
    }, []);

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
                        <div
                            key={i}
                            className="absolute rounded-full bg-white/10 animate-float"
                            style={{
                                width: `${Math.random() * 100 + 50}px`,
                                height: `${Math.random() * 100 + 50}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${
                                    Math.random() * 20 + 10
                                }s`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-6 z-10">
                    <div className="text-center animate-fade-in opacity-0 translate-y-10 transition-all duration-500">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            <span className="animate-text-gradient bg-gradient-to-r from-accent via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                                FolioSnap
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                            The ultimate platform to showcase your creative work
                            and connect with potential clients
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href="/register"
                                className="btn btn-accent btn-lg rounded-full px-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/portfolios"
                                className="btn btn-outline btn-lg text-white border-white/20 rounded-full px-8 hover:bg-white/10 hover:border-white/30"
                            >
                                Explore Creatives
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Animated Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-white mt-2 rounded-full animate-scroll-indicator"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-base-100">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-fade-in opacity-0 translate-y-10 transition-all duration-500">
                        Why Choose{" "}
                        <span className="text-primary">FolioSnap</span>?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                            <div
                                key={index}
                                className="card bg-base-200 hover:bg-base-300 transition-all duration-300 hover:-translate-y-2 shadow-xl animate-fade-in opacity-0 translate-y-10"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="card-body items-center text-center">
                                    <div className="text-4xl mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="card-title text-xl">
                                        {feature.title}
                                    </h3>
                                    <p className="text-base-content/80">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcase Section */}
            <section className="py-20 bg-gradient-to-br from-base-100 to-base-200">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-fade-in opacity-0 translate-y-10 transition-all duration-500">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Featured{" "}
                            <span className="text-secondary">Portfolios</span>
                        </h2>
                        <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                            Discover inspiring work from our creative community
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in opacity-0 translate-y-10"
                                style={{ transitionDelay: `${item * 50}ms` }}
                            >
                                <div className="aspect-[4/3] bg-neutral/10 relative">
                                    <img
                                        src={`https://picsum.photos/800/600?random=${item}`}
                                        alt={`Portfolio ${item}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <div className="text-white translate-y-5 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="font-bold text-xl">
                                                Project {item}
                                            </h3>
                                            <p className="text-white/80">
                                                by Creative Designer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12 animate-fade-in opacity-0 translate-y-10 transition-all duration-500">
                        <Link
                            href="/portfolios"
                            className="btn btn-primary btn-wide rounded-full"
                        >
                            View More
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-content">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-3xl mx-auto animate-fade-in opacity-0 translate-y-10 transition-all duration-500">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Showcase Your Work?
                        </h2>
                        <p className="text-xl mb-8">
                            Join thousands of creatives already sharing their
                            best work on FolioSnap
                        </p>
                        <Link
                            href="/portfolios/create"
                            className="btn btn-accent btn-lg rounded-full px-10 animate-pulse hover:animate-none"
                        >
                            Create Your Portfolio Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Custom Animations */}
            <style jsx global>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                }
                @keyframes text-gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                @keyframes scroll-indicator {
                    0% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(10px);
                        opacity: 0.5;
                    }
                }
                .animate-float {
                    animation: float 10s ease-in-out infinite;
                }
                .animate-text-gradient {
                    background-size: 300% 300%;
                    animation: text-gradient 6s ease infinite;
                }
                .animate-scroll-indicator {
                    animation: scroll-indicator 1.5s ease infinite;
                }
            `}</style>
        </>
    );
}
