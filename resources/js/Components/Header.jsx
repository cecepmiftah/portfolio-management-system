import { Link, router, usePage } from "@inertiajs/react";
import avatarImg from "../../img/person.png";

export default function Header() {
    const { auth } = usePage().props;

    function logout(e) {
        e.preventDefault();

        router.post("/logout");
    }

    let avatar = "";
    if (
        auth.user !== null &&
        auth.user.avatar !== null &&
        auth.user.avatar.startsWith("http")
    ) {
        avatar = auth.user.avatar;
    } else if (auth.user !== null && auth.user.avatar !== null) {
        avatar = `/storage/${auth.user.avatar}`;
    } else {
        avatar = avatarImg;
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="drawer lg:hidden z-10">
                <input
                    id="mobile-menu"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex items-center">
                    <label
                        htmlFor="mobile-menu"
                        className="btn btn-square btn-ghost drawer-button lg:hidden"
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
                            ></path>
                        </svg>
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="mobile-menu"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu gap-3 p-4 w-64 min-h-full bg-base-200 text-base-content">
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
                                                src={avatar}
                                            />
                                        </div>
                                    </div>
                                    <Link href={`/user/${auth.user.id}`}>
                                        {auth.user.name}
                                    </Link>
                                </div>
                            </li>
                        )}
                        <li>
                            <Link href="#">Home</Link>
                        </li>
                        <li>
                            <Link href="/portfolios">Portfolios</Link>
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
                    FolioSnap
                </Link>
            </div>

            <div className="flex gap-2">
                <ul className="hidden lg:flex menu menu-horizontal px-1 font-light items-center gap-x-3">
                    <li>
                        <Link href="#">Home</Link>
                    </li>
                    <li>
                        <Link href="/portfolios">Portfolios</Link>
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
                                        src={avatar}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link
                                        href={`/user/${auth.user.id}`}
                                        className="justify-between"
                                    >
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
