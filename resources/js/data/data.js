import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import CodeBlock from "@tiptap/extension-code-block";
import { Extension } from "@tiptap/core";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

import Heading from "@tiptap/extension-heading";
import FontFamily from "@tiptap/extension-font-family";
import {
    FontSize,
    Indent,
    Image,
} from "reactjs-tiptap-editor/extension-bundle";
import "reactjs-tiptap-editor/style.css";

export const VIEWER_EXTENSIONS = [
    StarterKit.configure({
        heading: { levels: [1, 2] },
    }),
    TextStyle,
    Color.configure({
        types: ["textStyle", "highlight"],
    }),
    Link.configure({
        HTMLAttributes: { class: "text-blue-500 hover:underline" },
    }),
    Image.configure({
        allowBase64: false,
        HTMLAttributes: {
            class: "max-w-full h-auto rounded-lg",
            loading: "lazy",
        },
    }),
    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),
    BulletList.configure({
        HTMLAttributes: { class: "list-disc pl-5" },
    }),
    OrderedList.configure({
        HTMLAttributes: { class: "list-decimal pl-5" },
    }),
    CodeBlock.configure({
        HTMLAttributes: { class: "bg-gray-100 p-4 rounded" },
    }),
    HorizontalRule.configure({
        HTMLAttributes: { class: "my-4 border-t-2" },
    }),
    FontFamily,
    FontSize,
    Heading,
    Indent,
];

export const themes = [
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
];
