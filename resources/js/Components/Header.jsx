import { Link, router, usePage } from "@inertiajs/react";
import React from "react";

export default function Header() {
    const { auth } = usePage().props;

    console.log(auth);
    function logout(e) {
        e.preventDefault();

        router.post("/logout");
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="drawer lg:hidden z-10">
                <input id="mobile-menu" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex items-center">
                    <label
                        for="mobile-menu"
                        class="btn btn-square btn-ghost drawer-button lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="inline-block h-5 w-5 stroke-current"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </label>
                </div>
                <div className="drawer-side">
                    <label for="mobile-menu" className="drawer-overlay"></label>
                    <ul class="menu gap-3 p-4 w-64 min-h-full bg-base-200 text-base-content">
                        {auth.user && (
                            <li>
                                <div className="flex items-center">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn btn-ghost btn-circle avatar"
                                    >
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                            />
                                        </div>
                                    </div>
                                    <a href="#">{auth.user.name}</a>
                                </div>
                            </li>
                        )}
                        <li>
                            <Link href="#">Home</Link>
                        </li>
                        <li>
                            <Link href="#">Your Portfolio</Link>
                        </li>
                        {!auth.user && (
                            <>
                                <li>
                                    <Link>Settings</Link>
                                </li>
                                <li>
                                    <Link
                                        href="/register"
                                        className="btn btn-sm btn-primary"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/login"
                                        className="btn btn-sm btn-outline btn-secondary"
                                    >
                                        Log In
                                    </Link>
                                </li>
                            </>
                        )}
                        {auth.user && (
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">
                    daisyUI
                </Link>
            </div>

            <div className="flex gap-2">
                <ul class="hidden lg:flex menu menu-horizontal px-1 font-light items-center gap-x-3">
                    <li>
                        <Link href="#">Home</Link>
                    </li>
                    <li>
                        <Link href="#">Your Portfolio</Link>
                    </li>
                    {!auth.user && (
                        <>
                            <li>
                                <Link
                                    href="/register"
                                    className="btn btn-sm btn-primary"
                                >
                                    Sign Up
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/login"
                                    className="btn btn-sm btn-outline btn-secondary"
                                >
                                    Log In
                                </Link>
                            </li>
                        </>
                    )}
                    {auth.user && (
                        <div className="dropdown dropdown-end mx-2">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link className="justify-between">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link>Settings</Link>
                                </li>
                                <li>
                                    <button onClick={logout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}
