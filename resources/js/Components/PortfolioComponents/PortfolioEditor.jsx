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
export default function PortfolioEditor({ content, onChangeContent, error }) {
    const contentParsed =
        typeof content === "string" ? JSON.parse(content) : content;

    return (
        <>
            <TextEditor
                output="json"
                content={contentParsed}
                onChangeContent={onChangeContent}
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

            {error && <p className="text-red-500">{error}</p>}
        </>
    );
}
