export default function Register() {
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content w-full flex-col lg:flex-row">
                    <div className="text-center w-1/3 lg:text-left">
                        <figure className="diff aspect-16/9" tabIndex={0}>
                            <div className="diff-item-1" role="img">
                                <div className="bg-primary text-primary-content grid place-content-center text-6xl font-black">
                                    Register
                                </div>
                            </div>
                            <div
                                className="diff-item-2"
                                role="img"
                                tabIndex={0}
                            >
                                <div className="bg-base-200 grid place-content-center text-6xl font-black">
                                    Register
                                </div>
                            </div>
                            <div className="diff-resizer"></div>
                        </figure>
                    </div>
                    <div className="rounded-tl-2xl rounded-bl-2xl bg-base-100 shadow-2xl hover:shadow-accent-content hover:transition duration-500 w-1/2">
                        <div className="card-body w-full">
                            <form className="flex flex-col space-y-4 mx-6 my-4">
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    className="input w-full"
                                    placeholder="Email"
                                />
                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    className="input w-full"
                                    placeholder="Password"
                                />
                                <div>
                                    <a className="link link-hover">
                                        Forgot password?
                                    </a>
                                </div>
                                <button className="btn btn-primary w-full mt-4">
                                    Login
                                </button>
                            </form>
                            <div className="divider">OR</div>
                            <button className="btn bg-white mx-6 my-4 text-black border-[#e5e5e5]">
                                <svg
                                    aria-label="Google logo"
                                    width="16"
                                    height="16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <g>
                                        <path
                                            d="m0 0H512V512H0"
                                            fill="#fff"
                                        ></path>
                                        <path
                                            fill="#34a853"
                                            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                                        ></path>
                                        <path
                                            fill="#4285f4"
                                            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                                        ></path>
                                        <path
                                            fill="#fbbc02"
                                            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                                        ></path>
                                        <path
                                            fill="#ea4335"
                                            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                                        ></path>
                                    </g>
                                </svg>
                                Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
