import { useForm, usePage } from "@inertiajs/react";
import { memo, Suspense, useEffect, useState } from "react";
import TextEditor from "reactjs-tiptap-editor";
import {
    BaseKit,
    Link,
    Image,
    Color,
    TextAlign,
    BulletList,
    OrderedList,
    CodeBlock,
    HorizontalRule,
    FontFamily,
    FontSize,
    Heading,
    Indent,
    SlashCommand,
} from "reactjs-tiptap-editor/extension-bundle";
import "reactjs-tiptap-editor/style.css";
import { useDebouncedCallback } from "use-debounce";

const ALL_EXTENSIONS = [
    BaseKit.configure({
        heading: {
            levels: [1, 2],
        },
        dropcursor: { color: "#0066FF" },

        characterCount: false,
    }),
    Link.configure({}),

    SlashCommand.configure({}),

    Color.configure({
        types: ["textStyle", "highlight"],
    }),
    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),
    BulletList.configure({}),
    OrderedList.configure({}),
    Indent,
    CodeBlock.configure({}),
    HorizontalRule.configure({}),
    FontFamily,
    FontSize,
    Heading,
    Image.configure({
        allowBase64: false,
        upload: async (file) => {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch("/upload-image", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: formData,
            });

            const result = await response.json();
            return result.url; // Kembalikan URL dari backend
        },
    }),
];

const Create = memo(() => {
    const [content, setContent] = useState(null);
    const { flash } = usePage().props;

    const [message, setMessage] = useState(flash.message);

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        content: "",
        project_url: "",
        project_date: "",
        thumbnail: null,
    });

    const debounceUpdate = useDebouncedCallback((value) => {
        setContent(value);
        setData("content", value);
    }, 300);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/portfolios", {
            forceFormData: true, // penting agar thumbnail bisa terkirim
            onSuccess: () => {
                setMessage("Portfolio created successfully!");
            },
        });
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            {errors.upload ||
                (message && (
                    <div role="alert" className="alert alert-error alert-soft">
                        <span>{errors.upload || message}</span>
                    </div>
                ))}
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

                    <TextEditor
                        output="json"
                        content={content}
                        onChangeContent={debounceUpdate}
                        extensions={ALL_EXTENSIONS}
                        dark={true}
                        maxWidth="100%"
                        bubbleMenu={true}
                        floatingMenu={true}
                        useEditorOptions={{
                            editorProps: {
                                attributes: {
                                    class: "prose dark:prose-invert max-w-none min-h-[300px] p-4 border rounded",
                                },
                            },
                        }}
                        toolbar={[
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "|",
                            "Heading",
                            "|",
                            "fontSize",
                            "fontFamily",
                            "|",
                            "link",
                            "image",
                            "|",
                            "textAlign",
                            "|",
                            "bulletList",
                            "orderedList",
                            "indent",
                            "|",
                            "codeBlock",
                            "|",
                            "horizontalRule",
                            "|",
                            "color",
                            "highlight",
                            "|",
                            "undo",
                            "redo",
                        ]}
                    />
                    {errors.content && (
                        <p className="text-red-500">{errors.content}</p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary mt-4"
                        disabled={processing}
                    >
                        Submit
                    </button>
                </form>
            </Suspense>
        </div>
    );
});

export default Create;
