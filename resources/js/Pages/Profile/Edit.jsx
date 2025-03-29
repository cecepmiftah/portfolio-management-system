import { useForm, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";
import avatarImg from "../../../img/person.png";

export default function Edit({ user }) {
    const fileInputRef = useRef(null);
    const { flash } = usePage().props;

    const [message, setMessage] = useState(flash.message);

    const { data, setData, patch, post, processing, errors } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: null,
    });

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    let avatar = "";
    if (user.avatar !== null && user?.avatar.startsWith("http")) {
        avatar = user.avatar;
    } else if (user?.avatar !== null) {
        avatar = `/storage/${user.avatar}`;
    } else if (user?.avatar === null) {
        avatar = avatarImg;
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("avatar", file);

            fetch(`/user/avatar/${user.id}`, {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            }).then(() => {
                window.location.reload();
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
                <div role="alert" className="alert alert-success mx-6 my-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
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
                <fieldset className="fieldset w-1/2 bg-base-200 border border-base-300 p-4 rounded-box">
                    <div className="p-6 text-center border-b">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <img
                            src={avatar}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mx-auto border border-gray-300 cursor-pointer hover:opacity-75 transition"
                            onClick={handleAvatarClick}
                        />
                    </div>

                    <legend className="fieldset-legend">Profile Edit</legend>
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
