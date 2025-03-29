import { useForm, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function Edit({ user }) {
    const fileInputRef = useRef(null);
    const { flash } = usePage().props;

    const [message, setMessage] = useState(flash.message);

    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: null,
    });

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData("avatar", file);
            post("/profile/avatar", {
                onSuccess: () => window.location.reload(),
            });
        }
    };

    function submit(e) {
        e.preventDefault();

        patch(`/user/${user.id}`, {
            onSuccess: (page) => {
                setMessage(page.props.flash.message);
            },
        });
    }

    return (
        <>
            {message && (
                <div role="alert" class="alert alert-info mx-6 my-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="h-6 w-6 shrink-0 stroke-current"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span>{message}</span>
                </div>
            )}
            {errors.error && (
                <div
                    role="alert"
                    className="alert alert-error alert-soft mx-6 my-4"
                >
                    <span>{errors.error}</span>
                </div>
            )}
            <div className="w-full flex justify-center">
                <fieldset class="fieldset w-1/2 bg-base-200 border border-base-300 p-4 rounded-box">
                    <div className="p-6 text-center border-b">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            // onChange={handleFileChange}
                        />
                        <img
                            src={
                                user?.avatar ||
                                "https://via.placeholder.com/100"
                            }
                            alt="Profile"
                            className="w-24 h-24 rounded-full mx-auto border border-gray-300 cursor-pointer hover:opacity-75 transition"
                            onClick={handleAvatarClick}
                        />
                    </div>

                    <legend class="fieldset-legend">Profile Edit</legend>
                    <form onSubmit={submit} className="space-y-2 w-full">
                        <label className="input w-full">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input
                                type="input"
                                required
                                placeholder="Name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                        </label>
                        <label className="input w-full">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input
                                type="input"
                                required
                                placeholder="Username"
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                            />
                        </label>
                        <label className="input w-full">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect
                                        width="20"
                                        height="16"
                                        x="2"
                                        y="4"
                                        rx="2"
                                    ></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input
                                type="email"
                                placeholder="mail@site.com"
                                required
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </label>

                        <button
                            type="submit"
                            className="btn btn-sm btn-primary mt-4 w-full"
                            disabled={processing}
                        >
                            Update
                        </button>
                    </form>
                </fieldset>
            </div>
        </>
    );
}
