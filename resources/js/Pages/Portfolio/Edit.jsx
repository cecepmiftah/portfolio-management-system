import { useForm, usePage } from "@inertiajs/react";
import { memo, useState } from "react";

import "reactjs-tiptap-editor/style.css";
import { useDebouncedCallback } from "use-debounce";
import PortfolioEditor from "../../Components/PortfolioComponents/PortfolioEditor";
import CategoryInput from "../../Components/PortfolioComponents/InputCategory";

const Edit = memo(({ portfolio, content, categories }) => {
    const { flash } = usePage().props;

    const [data, setData] = useState({
        title: portfolio.title,
        description: portfolio.description,
        project_url: portfolio.project_url,
        project_date: portfolio.project_date,
        category: "",
    });
    const [contentState, setContentState] = useState(content);
    const [thumbnail, setThumbnail] = useState(data.thumbnail);

    const [availableCategories, setAvailableCategories] = useState(categories);

    const [message, setMessage] = useState(flash.message);
    const [errors, setErrors] = useState(flash.errors || "");
    const [loading, setLoading] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState(
        portfolio.thumbnail || null
    );

    const debounceUpdate = useDebouncedCallback((value) => {
        setContentState(value);
    }, 300);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);

        formData.append("project_url", data.project_url);

        formData.append("project_date", data.project_date);

        // Kalau content adalah objek (JSON editor), harus diubah jadi string dulu
        formData.append("content", JSON.stringify(contentState));

        // Tambahkan file jika ada perubahan
        if (thumbnail instanceof File) {
            formData.append("thumbnail", thumbnail);
        }

        // Tambahkan kategori yang dipilih
        if (data.category) {
            formData.append("category", data.category);
        }

        formData.append("_method", "PATCH");

        try {
            const response = await fetch(`/portfolios/${portfolio.slug}`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                    // Jangan set Content-Type, biar browser otomatis jadi multipart/form-data
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Portfolio updated successfully!");
            } else {
                // Tampilkan error dari Laravel
                console.error(result.errors);
                setErrors("Something went wrong. Please try again.");
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrors({ upload: "Failed to update portfolio." });
            console.error("Update error:", error);
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    Make changes to your project
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
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-4"
            >
                <label htmlFor="title" className="label w-full flex flex-col">
                    <span className="label-text self-start">Title</span>
                    <input
                        type="text"
                        name="title"
                        placeholder="Lorem ipsum dolor sit amet"
                        className="input input-bordered w-full"
                        value={data.title}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleThumbnailChange}
                    />
                    {errors.thumbnail && (
                        <p className="text-red-500">{errors.thumbnail}</p>
                    )}

                    {(thumbnailPreview || portfolio.thumbnail) && (
                        <img
                            src={thumbnailPreview || portfolio.thumbnail}
                            alt="Thumbnail Preview"
                            className="mt-2 w-32 h-32 rounded object-cover"
                        />
                    )}
                </label>

                <CategoryInput
                    categories={availableCategories}
                    selectedCategory={data.category}
                    onCategoryChange={(value) =>
                        setData({ ...data, category: value })
                    }
                    error={errors.category}
                    previousCategory={portfolio.categories[0]?.name}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* submit */}
                <div className="flex justify-end mt-8">
                    <button
                        type="submit"
                        className={`btn btn-primary btn-wide ${
                            loading ? "loading" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Portfolio"}
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

export default Edit;
