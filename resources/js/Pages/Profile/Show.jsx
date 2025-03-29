import { Link, usePage } from "@inertiajs/react";

export default function Show({ user }) {
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="shadow-lg shadow-accent-content rounded-lg overflow-hidden w-full max-w-lg">
                <div className="p-6 text-center border-b">
                    <img
                        src={user?.avatar || "https://via.placeholder.com/100"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto border border-gray-300"
                    />
                    <h2 className="text-xl font-semibold mt-3">{user?.name}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                </div>
                <div className="p-6">
                    <table className="table w-full border-collapse">
                        <tbody>
                            <tr className="border-b">
                                <th className="p-3 text-left w-1/3">Name</th>
                                <td className="p-3">{user?.name}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="p-3 text-left w-1/3">
                                    Username
                                </th>
                                <td className="p-3">{user?.username}</td>
                            </tr>
                            <tr className="border-b">
                                <th className="p-3 text-left w-1/3">Email</th>
                                <td className="p-3">{user?.email}</td>
                            </tr>
                            <tr className="">
                                <th className="p-3 text-left w-1/3"></th>

                                <td className="text-right">
                                    <Link
                                        href={`/user/${user?.id}/edit`}
                                        className="btn btn-outline btn-info px-8"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
