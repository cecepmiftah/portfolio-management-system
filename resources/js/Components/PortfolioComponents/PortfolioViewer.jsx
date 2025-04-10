import { useEditor, EditorContent } from "@tiptap/react";
import "reactjs-tiptap-editor/style.css";
import { VIEWER_EXTENSIONS } from "../../data/data";

export default function PortfolioViewer({ content }) {
    const editor = useEditor({
        extensions: VIEWER_EXTENSIONS,
        content: content,
        editable: false, // Mode read-only
    });

    return <EditorContent editor={editor} />;
}
