import { Head, useForm, usePage } from "@inertiajs/react";

export default function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });
    const { message } = usePage().props.flash;

    const submit = (e) => {
        e.preventDefault();
        post("/forgot-password");
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <Head title="Forgot Password" />

            <div className="card bg-base-100 shadow-md w-full max-w-md">
                <div className="card-body">
                    <h1 className="card-title text-2xl mb-4">
                        Forgot Password
                    </h1>

                    {message && (
                        <div className="alert alert-success mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
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

                    <p className="mb-6 text-gray-600 dark:text-gray-400">
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link.
                    </p>

                    <form onSubmit={submit}>
                        <div className="form-control space-x-2">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                className={`input input-bordered ${
                                    errors.email ? "input-error" : ""
                                }`}
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                autoFocus
                            />
                            {errors.email && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.email}
                                    </span>
                                </label>
                            )}
                        </div>

                        <div className="flex items-center justify-end mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary ${
                                    processing ? "loading" : ""
                                }`}
                                disabled={processing}
                            >
                                Email Password Reset Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
