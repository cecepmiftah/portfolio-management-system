import { Head, useForm, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";
import avatarImg from "../../../img/person.png";

export default function Edit({ user }) {
    const { flash } = usePage().props;

    const [message, setMessage] = useState(flash.message);
    const [preview, setPreview] = useState(user.avatar ?? avatarImg);
    const [loadingImage, setLoadingImage] = useState(false);
    const fileInput = useRef(null);

    const { data, setData, patch, processing, errors } = useForm({
        first_name: user.first_name,
        last_name: user.last_name || "",
        username: user.username,
        email: user.email,
        about: user.about || "",
        occupation: user.occupation || "",
        company: user.company || "",
        location: user.location || "",
        city: user.city || "",
        website: user.website || "",
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoadingImage(true);
            const formData = new FormData();
            formData.append("avatar", file);

            fetch(`/user/avatar/${user.username}`, {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setPreview(data.avatar);

                    setLoadingImage(false);
                });
        }
    };

    const submit = (e) => {
        e.preventDefault();

        patch(`/user/${user.username}`, {
            preserveScroll: true,
            onSuccess: (page) => {
                setMessage(page.props.flash.message);
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Head title="Edit Profile" />

            <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

            {message && (
                <div
                    role="alert"
                    className="alert alert-success alert-soft mb-4"
                >
                    <span>{message}</span>
                </div>
            )}

            {errors.error && (
                <div role="alert" className="alert alert-error alert-soft mb-4">
                    <span>{errors.error}</span>
                </div>
            )}

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="avatar mb-4">
                            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={preview}
                                    alt="Profile"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInput}
                            onChange={handleAvatarChange}
                            className="hidden"
                            accept="image/*"
                        />
                        <button
                            type="button"
                            onClick={() => fileInput.current.click()}
                            className="btn btn-sm btn-outline"
                            disabled={loadingImage}
                        >
                            {loadingImage ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Change Avatar"
                            )}
                        </button>
                        {errors.avatar && (
                            <div className="text-error mt-2">
                                {errors.avatar}
                            </div>
                        )}
                    </div>
                    <form onSubmit={submit} encType="multipart/form-data">
                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        First Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                    className={`input input-bordered ${
                                        errors.first_name ? "input-error" : ""
                                    }`}
                                />
                                {errors.first_name && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {errors.first_name}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Last Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                    className="input input-bordered"
                                />
                            </div>

                            {/* Username */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.username}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                    className={`input input-bordered ${
                                        errors.username ? "input-error" : ""
                                    }`}
                                />
                                {errors.username && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {errors.username}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className={`input input-bordered ${
                                        errors.email ? "input-error" : ""
                                    }`}
                                />
                                {errors.email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">
                                            {errors.email}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Occupation */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Occupation
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={data.occupation}
                                    onChange={(e) =>
                                        setData("occupation", e.target.value)
                                    }
                                    className="input input-bordered"
                                />
                            </div>

                            {/* Company */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Company</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.company}
                                    onChange={(e) =>
                                        setData("company", e.target.value)
                                    }
                                    className="input input-bordered"
                                />
                            </div>

                            {/* Location */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                    className="input input-bordered"
                                />
                            </div>

                            {/* City */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">City</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                    className="input input-bordered"
                                />
                            </div>

                            {/* Website */}
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text">Website</span>
                                </label>
                                <input
                                    type="url"
                                    value={data.website}
                                    onChange={(e) =>
                                        setData("website", e.target.value)
                                    }
                                    className="input input-bordered"
                                    placeholder="https://example.com"
                                />
                            </div>

                            {/* About */}
                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text">About</span>
                                </label>
                                <textarea
                                    value={data.about}
                                    onChange={(e) =>
                                        setData("about", e.target.value)
                                    }
                                    className="textarea textarea-bordered h-32"
                                    placeholder="Tell us about yourself..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={processing}
                            >
                                {processing ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
