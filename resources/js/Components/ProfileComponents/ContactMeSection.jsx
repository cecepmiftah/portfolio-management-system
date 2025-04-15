import { router } from "@inertiajs/react";
import { useState } from "react";

export default function ContactMeSection({ setMessage, user }) {
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post(`/contact/${user.id}`, contactForm, {
            preserveScroll: true,
            onSuccess: () => {
                setContactForm({ name: "", email: "", message: "" });
                setMessage("Your message has been sent successfully!");
                setTimeout(() => setMessage(null), 5000);
                //Scroll Up
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            },
            onError: () => {
                setMessage("Failed to send your message. Please try again.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };
    return (
        <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
                <h2 className="card-title text-xl">Contact Me</h2>
                <form onSubmit={handleContactSubmit} className="space-y-4 mt-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input
                            type="text"
                            value={contactForm.name}
                            onChange={(e) =>
                                setContactForm({
                                    ...contactForm,
                                    name: e.target.value,
                                })
                            }
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) =>
                                setContactForm({
                                    ...contactForm,
                                    email: e.target.value,
                                })
                            }
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Message</span>
                        </label>
                        <textarea
                            value={contactForm.message}
                            onChange={(e) =>
                                setContactForm({
                                    ...contactForm,
                                    message: e.target.value,
                                })
                            }
                            className="textarea textarea-bordered h-24"
                            required
                        ></textarea>
                    </div>
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className={`btn btn-primary ${
                                isSubmitting ? "loading" : ""
                            }`}
                            disabled={isSubmitting}
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
