import { Head, useForm } from "@inertiajs/react";

export default function ResetPassword({ email, token }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/reset-password");
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <Head title="Reset Password" />

            <div className="card bg-base-100 shadow-md w-full max-w-md">
                <div className="card-body">
                    <h1 className="card-title text-2xl mb-4">Reset Password</h1>

                    <form onSubmit={submit}>
                        <input type="hidden" name="token" value={data.token} />

                        <div className="form-control flex flex-col">
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
                            />
                            {errors.email && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.email}
                                    </span>
                                </label>
                            )}
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input
                                type="password"
                                className={`input input-bordered ${
                                    errors.password ? "input-error" : ""
                                }`}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            {errors.password && (
                                <label className="label">
                                    <span className="label-text-alt text-error">
                                        {errors.password}
                                    </span>
                                </label>
                            )}
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                type="password"
                                className={`input input-bordered ${
                                    errors.password_confirmation
                                        ? "input-error"
                                        : ""
                                }`}
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="flex items-center justify-end mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary ${
                                    processing ? "loading" : ""
                                }`}
                                disabled={processing}
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
