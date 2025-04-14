import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommentSection({ portfolioId }) {
    const { auth } = usePage().props;
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    const [replyingTo, setReplyingTo] = useState(null);

    // Fetch comments
    useEffect(() => {
        async function getData() {
            const response = await fetch(`/portfolios/${portfolioId}/comments`);
            const data = await response.json();
            setComments(data);
        }
        getData();
    }, [portfolioId, comments]);

    // Handle submit comment
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        router.post(
            `/comments`,
            {
                portfolio_id: portfolioId,
                content,
                parent_id: replyingTo,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setContent("");
                    setReplyingTo(null);
                    setComments([]);
                },
            }
        );
    };

    // Handle delete comment
    const handleDelete = (commentId) => {
        if (confirm("Are you sure you want to delete this comment?")) {
            router.delete(`/comments/${commentId}`, {
                preserveScroll: true,
                // onSuccess: () => {
                //     // Refresh comments
                //     fetch(`/portfolios/${portfolioId}/comments`)
                //         .then((res) => res.json())
                //         .then((data) => setComments(data));
                // },
            });
        }
    };

    return (
        <div className="mt-12 border-t pt-8">
            <h3 className="text-xl font-semibold mb-6">
                Comments (
                {comments.reduce(
                    (acc, comment) => acc + 1 + comment.replies.length,
                    0
                )}
                )
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <img
                            src={
                                auth.user?.avatar ||
                                "/images/default-avatar.png"
                            }
                            alt={auth.user?.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                    <div className="flex-grow">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={
                                replyingTo
                                    ? `Reply to comment...`
                                    : "Add a comment..."
                            }
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            rows={3}
                        />
                        <div className="flex justify-between items-center mt-2">
                            {replyingTo && (
                                <div className="text-sm text-gray-500">
                                    Replying to comment #{replyingTo}
                                    <button
                                        type="button"
                                        onClick={() => setReplyingTo(null)}
                                        className="ml-2 text-primary hover:underline"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={!content.trim()}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                            >
                                {replyingTo ? "Post Reply" : "Post Comment"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length === 0 ? (
                    <p className="text-gray-500">
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onReply={setReplyingTo}
                            onDelete={handleDelete}
                            currentUserId={auth.user?.id}
                            portfolioId={portfolioId}
                            depth={0}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

// Recursive Comment Component
function CommentItem({
    comment,
    onReply,
    onDelete,
    currentUserId,
    portfolioId,
    depth,
}) {
    const [showReplies, setShowReplies] = useState(true);
    const hasReplies = comment.replies?.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`border rounded-lg p-4 ${
                depth > 0 ? "ml-8 bg-gray-50 dark:bg-gray-800" : ""
            }`}
        >
            <div className="flex gap-3">
                <div className="flex-shrink-0">
                    <img
                        src={
                            comment.user.avatar || "/images/default-avatar.png"
                        }
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                </div>
                <div className="flex-grow">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-medium">
                                {comment.user.name}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                                {new Date(comment.created_at).toLocaleString()}
                            </span>
                        </div>
                        {currentUserId === comment.user.id && (
                            <button
                                onClick={() => onDelete(comment.id)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">
                        {comment.content}
                    </p>

                    <div className="mt-3 flex gap-4">
                        <button
                            onClick={() => onReply(comment.id)}
                            className="text-sm text-primary hover:underline"
                        >
                            Reply
                        </button>
                        {hasReplies && (
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className="text-sm text-gray-500 hover:underline"
                            >
                                {showReplies
                                    ? "Hide replies"
                                    : `Show replies (${comment.replies.length})`}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Nested Replies */}
            <AnimatePresence>
                {showReplies && hasReplies && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 space-y-4"
                    >
                        {comment.replies.map((reply) => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                onReply={onReply}
                                onDelete={onDelete}
                                currentUserId={currentUserId}
                                portfolioId={portfolioId}
                                depth={depth + 1}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
