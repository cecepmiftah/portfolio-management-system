import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import avatarImg from "../../../img/person.png";
import WorkExperienceInput from "../../Components/ProfileComponents/WorkExperienceInput";
import ConfirmationModal from "../../Components/ConfirmationModal";

const experiences = [
    {
        id: 1,
        start_date: "2020-01-01",
        end_date: "2020-12-31",
        is_current: false,
        position: "Junior Developer",
        company: "PT. ABC",
        description:
            "Membangun aplikasi web menggunakan teknologi React dan Node.js",
    },
    {
        id: 2,
        start_date: "2021-01-01",
        end_date: "2022-06-30",
        is_current: false,
        position: "Senior Developer",
        company: "PT. DEF",
        description:
            "Mengembangkan aplikasi mobile menggunakan teknologi React Native",
    },
    {
        id: 3,
        start_date: "2022-07-01",
        end_date: null,
        is_current: true,
        position: "Lead Developer",
        company: "PT. GHI",
        description:
            "Mengembangkan aplikasi web menggunakan teknologi Next.js dan GraphQL",
    },
    {
        id: 4,
        start_date: "2018-01-01",
        end_date: "2019-12-31",
        is_current: false,
        position: "Intern",
        company: "PT. JKL",
        description:
            "Membantu mengembangkan aplikasi web menggunakan teknologi PHP dan MySQL",
    },
    {
        id: 5,
        start_date: "2019-01-01",
        end_date: "2020-06-30",
        is_current: false,
        position: "Junior QA",
        company: "PT. MNO",
        description: "Menguji aplikasi web menggunakan teknologi Selenium",
    },
];
export default function Edit({ user }) {
    const { flash } = usePage().props;

    const [message, setMessage] = useState(flash.message);
    const [preview, setPreview] = useState(user.avatar ?? avatarImg);
    const [loadingImage, setLoadingImage] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
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

    const handleDeleteAccount = () => {
        setIsDeleting(true);
        router.delete(`/user/${user.id}`, {
            preserveScroll: true,
            onSuccess: () => setShowDeleteModal(false),
            onFinish: () => setIsDeleting(false),
        });
    };

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
                        <h2 className="text-xl font-semibold mb-4">
                            Basic Personal Information
                        </h2>

                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* First Name */}
                            <div className="form-control grid grid-template-areas='label input'">
                                <label className="label grid-area-label">
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
                                    className={`input input-bordered grid-area-input ${
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
                            <div className="form-control grid grid-template-areas='label input'">
                                <label className="label grid-area-label">
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
                                    className="input input-bordered grid-area-input"
                                />
                            </div>

                            {/* Username */}
                            <div className="form-control grid grid-template-areas='label input'">
                                <label className="label grid-area-label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.username}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                    className={`input input-bordered grid-area-input ${
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
                            <div className="form-control grid grid-template-areas='label input'">
                                <label className="label grid-area-label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className={`input input-bordered grid-area-input ${
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
                            <div className="form-control grid grid-template-areas='label input'">
                                <label className="label grid-area-label">
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
                                    className="input input-bordered grid-area-input"
                                />
                            </div>

                            {/* Company */}
                            <div className="form-control grid grid-template-areas='label input'">
                                <label className="label grid-area-label">
                                    <span className="label-text">Company</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.company}
                                    onChange={(e) =>
                                        setData("company", e.target.value)
                                    }
                                    className="input input-bordered grid-area-input"
                                />
                            </div>

                            {/* Location */}
                            <div className="form-control grid grid-template-areas='label input'">
                                <label className="label grid-area-label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                    className="input input-bordered grid-area-input"
                                />
                            </div>

                            {/* City */}
                            <div className="form-control grid grid-template-areas='label input'">
                                <label className="label grid-area-label">
                                    <span className="label-text">City</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                    className="input input-bordered grid-area-input"
                                />
                            </div>

                            {/* Website */}
                            <div className="form-control grid grid-template-areas='label input'">
                                <label className="label grid-area-label">
                                    <span className="label-text">Website</span>
                                </label>
                                <input
                                    type="url"
                                    value={data.website}
                                    onChange={(e) =>
                                        setData("website", e.target.value)
                                    }
                                    className="input input-bordered grid-area-input"
                                    placeholder="https://example.com"
                                />
                            </div>

                            {/* About */}
                            <div className="form-control md:col-span-2 lg:col-span-3 grid grid-template-areas='label input'">
                                <label className="label grid-area-label">
                                    <span className="label-text">
                                        About yourself
                                    </span>
                                </label>
                                <textarea
                                    value={data.about}
                                    onChange={(e) =>
                                        setData("about", e.target.value)
                                    }
                                    className="textarea textarea-bordered h-32 w-full grid-area-input"
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
                    {/* Work Experience */}
                    <div className="w-full">
                        <WorkExperienceInput
                            user={user}
                            setMessage={setMessage}
                        />
                    </div>
                </div>
                <hr />
            </div>
            {/* Delete Account */}
            <div className="mt-8 border border-red-500 hover:border-red-400 shadow-lg p-6 mx-auto text-center">
                <h2 className="text-xl font-semibold mb-4">
                    Delete Account Section
                </h2>
                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="btn btn-error"
                >
                    Delete Account
                </button>
            </div>

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccount}
                title="Delete Account"
                description="Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone."
                confirmText="Delete Account"
                isDestructive={true}
                isLoading={isDeleting}
            />
        </div>
    );
}
