import { useForm, usePage } from "@inertiajs/react";
import { memo, Suspense, useEffect, useState } from "react";
import TextEditor from "reactjs-tiptap-editor";

import "reactjs-tiptap-editor/style.css";
import { useDebouncedCallback } from "use-debounce";
import CategoryInput from "../../Components/PortfolioComponents/InputCategory";
import PortfolioEditor from "../../Components/PortfolioComponents/PortfolioEditor";

const Create = memo(({ categories }) => {
    const [content, setContent] = useState(null);
    const { flash } = usePage().props;

    const [message, setMessage] = useState(flash.message);
    const [availableCategories, setAvailableCategories] = useState(categories);

    const { data, setData, post, processing, errors, transform } = useForm({
        title: "",
        description: "",
        content: "",
        project_url: "",
        project_date: "",
        thumbnail: null,
        category: "",
    });

    const debounceUpdate = useDebouncedCallback((value) => {
        setContent(value);
        setData("content", value);
    }, 300);

    transform((data) => ({
        ...data,
        category: data.category.toLowerCase(),
    }));

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/portfolios", {
            forceFormData: true, // penting agar thumbnail bisa terkirim
            onSuccess: () => {
                setMessage("Portfolio created successfully!");
            },
            // onError: (errors) => {
            //     console.error(errors);
            // },
        });
    };

    return (
        <div className="p-4 max-w-5xl mx-auto mt-4">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    Create Your Portfolio
                </h1>
                <p className="text-lg text-base-content/80">
                    Showcase your work with a beautiful portfolio
                </p>
            </div>
            {/* Notification */}
            {(errors.upload || message) && (
                <div
                    className={`alert ${
                        errors.upload ? "alert-error" : "alert-success"
                    } mb-6 transition-all duration-300`}
                >
                    <span>{errors.upload || message}</span>
                </div>
            )}
            <Suspense fallback={<div>Loading...</div>}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label
                        htmlFor="title"
                        className="label w-full flex flex-col"
                    >
                        <span className="label-text self-start">Title</span>
                        <input
                            type="text"
                            name="title"
                            placeholder="Lorem ipsum dolor sit amet"
                            className="input input-bordered w-full"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        {errors.title && (
                            <p className="text-red-500">{errors.title}</p>
                        )}
                    </label>
                    <label
                        htmlFor="description"
                        className="label w-full flex flex-col"
                    >
                        <span className="label-text self-start">
                            Short description about your project
                        </span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Lorem ipsum dolor sit amet"
                            className="input input-bordered w-full"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        {errors.description && (
                            <p className="text-red-500">{errors.description}</p>
                        )}
                    </label>
                    <label
                        htmlFor="thumbnail"
                        className="label w-full flex flex-col"
                    >
                        <span className="label-text self-start">
                            Image For Project Thumbnail
                        </span>
                        <input
                            type="file"
                            name="thumbnail"
                            className="file-input w-full"
                            accept="image/*"
                            onChange={(e) =>
                                setData("thumbnail", e.target.files[0])
                            }
                        />
                        {errors.thumbnail && (
                            <p className="text-red-500">{errors.thumbnail}</p>
                        )}

                        {data.thumbnail && (
                            <img
                                src={URL.createObjectURL(data.thumbnail)}
                                alt="Thumbnail Preview"
                                className="mt-2 w-32 h-32 rounded object-cover"
                            />
                        )}
                    </label>

                    <CategoryInput
                        categories={availableCategories}
                        selectedCategory={data.category}
                        onCategoryChange={(value) => setData("category", value)}
                        error={errors.category}
                    />

                    <PortfolioEditor
                        content={content}
                        onChangeContent={debounceUpdate}
                        error={errors.content}
                    />

                    {/* Additional Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Project URL</span>
                            </label>
                            <input
                                type="url"
                                name="project_url"
                                placeholder="https://example.com"
                                className="input input-bordered"
                                value={data.project_url}
                                onChange={(e) =>
                                    setData("project_url", e.target.value)
                                }
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Project Date</span>
                            </label>
                            <input
                                type="date"
                                name="project_date"
                                className="input input-bordered"
                                value={data.project_date}
                                onChange={(e) =>
                                    setData("project_date", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* submit */}
                    <div className="flex justify-end mt-8">
                        <button
                            type="submit"
                            className={`btn btn-primary btn-wide ${
                                processing ? "loading" : ""
                            }`}
                            disabled={processing}
                        >
                            {processing ? "Publishing..." : "Publish Portfolio"}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </Suspense>
            {/* Tips Section */}
            <div className="mt-12 bg-base-200 rounded-box p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-info"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Portfolio Creation Tips
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Use high-quality images for better presentation</li>
                    <li>Write a clear and concise description</li>
                    <li>Highlight your key contributions to the project</li>
                    <li>Include relevant links (GitHub, live demo, etc.)</li>
                </ul>
            </div>
        </div>
    );
});

export default Create;
