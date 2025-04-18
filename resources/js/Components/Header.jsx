import { Link, router, usePage } from "@inertiajs/react";
import avatarImg from "../../img/person.png";
import ThemeController from "./ThemeController";
import { useEffect, useState } from "react";

export default function Header() {
    const { url } = usePage();
    const { auth } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    function logout(e) {
        e.preventDefault();

        router.post("/logout");
    }

    const active = "bg-base-200 text-primary";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Header */}
            <header
                className={`fixed top-0 w-full z-30 transition-all duration-300 ${
                    scrolled
                        ? "bg-base-100/90 backdrop-blur-md shadow-lg"
                        : "bg-base-100 shadow-sm"
                }`}
            >
                <div className="navbar max-w-7xl mx-auto">
                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <label
                            htmlFor="mobile-menu"
                            className="btn btn-square btn-ghost"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </label>
                    </div>

                    {/* Logo/Brand */}
                    <div className="flex-1">
                        <Link
                            href="/"
                            prefetch
                            className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                        >
                            FolioSnap
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex gap-2">
                        <ul className="menu menu-horizontal px-1 font-medium items-center gap-x-4">
                            <li>
                                <Link
                                    href="/"
                                    prefetch
                                    className={`hover:text-primary transition-colors ${
                                        url === "/"
                                            ? "bg-base-200 text-primary"
                                            : ""
                                    }`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/portfolios"
                                    prefetch
                                    className={`hover:text-primary transition-colors ${
                                        url === "/portfolios"
                                            ? "bg-base-200 text-primary"
                                            : ""
                                    }`}
                                >
                                    Explore
                                </Link>
                            </li>

                            {auth.user ? (
                                <>
                                    <li>
                                        <Link
                                            href="/portfolios/create"
                                            prefetch
                                            className="btn btn-primary btn-sm rounded-full px-6 hover:shadow-lg transition-all"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 4v16m8-8H4"
                                                />
                                            </svg>
                                            Upload
                                        </Link>
                                    </li>

                                    <li className="dropdown dropdown-end">
                                        <div
                                            tabIndex={0}
                                            className="avatar online"
                                        >
                                            <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2 hover:ring-accent transition-all">
                                                <img
                                                    src={
                                                        auth.user.avatar ||
                                                        avatarImg
                                                    }
                                                    alt={auth.user.name}
                                                />
                                            </div>
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
                                        >
                                            <li>
                                                <Link
                                                    href={`/user/${auth.user.username}`}
                                                    prefetch
                                                    className="hover:text-primary"
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
                                                            strokeWidth={2}
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                    Profile
                                                </Link>
                                            </li>

                                            <li>
                                                <button
                                                    onClick={logout}
                                                    className="text-error hover:bg-error/10"
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
                                                            strokeWidth={2}
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href="/login"
                                            prefetch
                                            className="btn btn-ghost btn-sm rounded-full hover:bg-base-200 transition-all"
                                        >
                                            Log In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/register"
                                            prefetch
                                            className="btn btn-primary btn-sm rounded-full px-6 hover:shadow-lg transition-all"
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
                    mobileMenuOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                }`}
            >
                <div
                    className={`absolute inset-0 bg-black/50 transition-opacity ${
                        mobileMenuOpen ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
                <div
                    className={`absolute left-0 top-0 h-full w-80 bg-base-100 shadow-xl transition-transform ${
                        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="p-4">
                        {auth.user && (
                            <div className="flex items-center gap-4 mb-6 p-4 bg-base-200 rounded-lg">
                                <Link
                                    href={`/user/${auth.user.username}`}
                                    prefetch
                                    className="avatar online"
                                >
                                    <div className="w-12 rounded-full">
                                        <img
                                            src={auth.user.avatar || avatarImg}
                                            alt={auth.user.name}
                                        />
                                    </div>
                                </Link>
                                <div>
                                    <Link
                                        href={`/user/${auth.user.username}`}
                                        prefetch
                                        className="font-semibold hover:text-primary"
                                    >
                                        <p className="text-sm opacity-70">
                                            @{auth.user.username}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )}

                        <ul className="menu gap-2">
                            <li>
                                <Link
                                    href="/"
                                    prefetch
                                    className={`hover:text-primary transition-colors ${
                                        url === "/"
                                            ? "bg-base-200 text-primary"
                                            : ""
                                    }`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/portfolios"
                                    prefetch
                                    className={`hover:text-primary transition-colors ${
                                        url === "/portfolios"
                                            ? "bg-base-200 text-primary"
                                            : ""
                                    }`}
                                >
                                    Explore Portfolios
                                </Link>
                            </li>

                            {auth.user && (
                                <li>
                                    <Link
                                        href="/portfolios/create"
                                        prefetch
                                        className={`hover:text-primary transition-colors ${
                                            url === "/portfolios/create"
                                                ? "bg-base-200 text-primary"
                                                : ""
                                        }`}
                                    >
                                        Upload Portfolio
                                    </Link>
                                </li>
                            )}

                            <div className="divider my-1"></div>

                            {auth.user ? (
                                <>
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="text-error hover:bg-error/10"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href="/login"
                                            prefetch
                                            className="btn btn-ghost btn-block justify-start hover:bg-base-200"
                                        >
                                            Log In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/register"
                                            prefetch
                                            className="btn btn-primary btn-block justify-start"
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Spacer untuk konten di bawah fixed header */}
            <div className="h-16"></div>
        </>
    );
}
