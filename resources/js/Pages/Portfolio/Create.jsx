import { memo, Suspense, useState } from "react";
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
        HTMLAttributes: {
            class: "rounded-lg mx-auto",
        },
        upload: (files) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(URL.createObjectURL(files));
                }, 500);
            });
        },
    }),
];

const Create = memo(() => {
    const [content, setContent] = useState(null);

    const debounceUpdate = useDebouncedCallback((value) => {
        setContent(value);
    }, 300);

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
        </div>
    );
});

export default Create;
