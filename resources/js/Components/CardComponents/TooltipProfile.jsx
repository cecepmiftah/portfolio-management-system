export default function TooltipProfile({ user }) {
    const year = new Date(user.created_at).getFullYear();
    return (
        <div className="absolute z-10 left-0 bottom-full mb-2 w-64 p-3 bg-white shadow-lg rounded-md opacity-0 invisible group-hover/owner:opacity-100 group-hover/owner:visible transition-all duration-200">
            <div className="flex items-center space-x-3">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={user.avatar} alt="Profile Owner" />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold">{user.username}</h4>
                    <p className="text-xs text-gray-500">Member since {year}</p>
                    <p className="text-sm mt-1">{user.occupation}</p>
                </div>
            </div>
        </div>
    );
}
