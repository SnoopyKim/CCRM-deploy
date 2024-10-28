"use client";

import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import LinkMark from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";

import BubbleMenuBox from "./bubble";
import FloatingMenuBox from "./floating";

import "./editor.css";

const extensions = [
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: "py-1.5",
      },
    },
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: "font-semibold",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc pl-6",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal pl-6",
      },
    },
  }),
  LinkMark.configure({
    defaultProtocol: "https",
    HTMLAttributes: {
      class:
        "cursor-pointer underline underline-offset-2 text-[#1E90FF] hover:text-[#104E8B]",
    },
  }),
  Underline,
  TextStyle,
  Color,
  Image.configure({
    allowBase64: true,
    HTMLAttributes: {
      class: "my-1",
    },
  }),
];

export default function MemoEditor({
  content,
  onChange,
}: {
  content?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <EditorProvider
      extensions={extensions}
      immediatelyRender={false}
      editorContainerProps={{
        className: "border border-main-2 rounded py-4 px-6 w-full h-full",
      }}
      editorProps={{
        attributes: {
          class:
            "appearance-none h-full text-main-1 text-base font-normal overflow-y-auto leading-tight focus:outline-none focus:shadow-outline",
        },
        handleKeyDown: (view, event) => {
          if (event.key === "Tab") {
            event.preventDefault();
            view.dispatch(
              view.state.tr.insertText("    ") // 4 spaces for Tab
            );
            return true;
          }
          return false;
        },
      }}
      content={content}
      onUpdate={({ editor }) => {
        onChange?.(editor.getHTML());
      }}
    >
      <div>
        <BubbleMenuBox />
        <FloatingMenuBox />
      </div>
    </EditorProvider>
  );
}
