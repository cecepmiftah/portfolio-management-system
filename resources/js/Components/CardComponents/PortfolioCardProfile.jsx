import { Link, router } from "@inertiajs/react";
import ConfirmationModal from "../ConfirmationModal";
import { useState } from "react";

export default function PortfolioCardProfile({ item, user }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setShowDeleteModal(true);
        router.delete(`/portfolios/${item.id}`, {
            onSuccess: () => {
                setShowDeleteModal(false);
            },
            onFinish: () => setIsDeleting(false),
        });
    };

    return (
        <div key={item.id} className="relative group">
            {/* Link untuk mengakses detail portfolio */}
            <Link
                href={`/portfolios/${item.slug}`}
                className="card image-full hover:scale-[1.02] transition-transform"
            >
                <figure className="aspect-[4/3] w-full">
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                    />
                </figure>
                <div className="card-body justify-end">
                    <h3 className="card-title text-white">{item.title}</h3>
                    <p className="text-white/80">
                        {item.category || "Portfolio"}
                    </p>
                </div>
            </Link>

            {/* Tombol Delete dengan Confirmation Modal */}
            {user && user.id === item.user_id && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="btn btn-circle btn-sm btn-error"
                        title="Delete Portfolio"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            )}

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Delete Portfolio"
                description="Are you sure you want to delete this portfolio?. Data will be permanently removed. This action cannot be undone."
                confirmText="Delete Portfolio"
                isDestructive={true}
                isLoading={isDeleting}
            />
        </div>
    );
}
