import { useState, useEffect, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import avatarImg from "../../../img/person.png";

export default function CommentSection({ portfolioId }) {
    const { auth } = usePage().props;
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    const commentFormRef = useRef(null);
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

    // Fungsi untuk handle reply dengan scroll dan animasi
    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId);

        // Scroll ke form setelah state diupdate
        setTimeout(() => {
            commentFormRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            // Fokus ke textarea
            const textarea = commentFormRef.current?.querySelector("textarea");
            textarea?.focus();
        }, 100);
    };

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

            <motion.div
                ref={commentFormRef}
                initial={false}
                animate={{
                    backgroundColor: replyingTo
                        ? "rgba(236, 72, 153, 0.05)"
                        : "transparent",
                    borderColor: replyingTo
                        ? "rgba(236, 72, 153, 0.2)"
                        : "transparent",
                }}
                transition={{ duration: 0.3 }}
                className="rounded-lg p-4 border"
            >
                <form onSubmit={handleSubmit}>
                    {replyingTo && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-between mb-3 bg-pink-50 dark:bg-pink-900/20 rounded-full px-4 py-2"
                        >
                            <div className="flex items-center text-sm text-pink-600 dark:text-pink-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                                    />
                                </svg>
                                Replying to comment #{replyingTo}
                            </div>
                            <button
                                type="button"
                                onClick={() => setReplyingTo(null)}
                                className="text-pink-600 dark:text-pink-300 hover:text-pink-800 dark:hover:text-pink-100 text-sm flex items-center"
                            >
                                Cancel
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </motion.div>
                    )}

                    <motion.textarea
                        layout // Animasi layout saat ada/muncul reply header
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={
                            replyingTo
                                ? "Write your reply..."
                                : "Add a comment..."
                        }
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        rows={3}
                        animate={{
                            borderColor: replyingTo
                                ? "rgba(236, 72, 153, 0.5)"
                                : "#e5e7eb",
                        }}
                    />

                    <motion.div
                        animate={{
                            x: replyingTo ? [0, -5, 5, -3, 3, 0] : 0,
                        }}
                        transition={{
                            duration: 0.6,
                            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                            when: "onMount",
                        }}
                        className="flex justify-end mt-2"
                    >
                        <button
                            type="submit"
                            disabled={!content.trim()}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 transition-colors flex items-center cursor-pointer"
                        >
                            {replyingTo ? (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                                        />
                                    </svg>
                                    Post Reply
                                </>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Post Comment
                                </>
                            )}
                        </button>
                    </motion.div>
                </form>
            </motion.div>

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
                            onReply={handleReplyClick}
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
                        src={comment.user.avatar || avatarImg}
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                </div>
                <div className="flex-grow">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-medium">
                                {comment.user.username}
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
