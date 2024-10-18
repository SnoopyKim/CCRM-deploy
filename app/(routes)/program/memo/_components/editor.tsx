"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Link from "@tiptap/extension-link";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import cn from "@/app/_utils/cn";

export default function MemoEditor({
  onChange,
}: {
  onChange?: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: "py-1",
        },
      }),
      Image,
      // ListItem,
      Heading.configure({
        HTMLAttributes: {
          class: "font-semibold",
          levels: [1, 2, 3],
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-4",
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "text-sub-2 underline",
        },
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "shadow appearance-none border rounded w-full h-full py-3 px-4 bg-grayscale-14 text-main-1 text-base font-normal mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline",
      },
    },
    content: "<p>Hi</p>",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch w-full h-full">
      {editor && (
        <div className="flex items-center gap-2">
          <EditorOption
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor?.isActive("bold") ? "bg-grayscale-12" : ""}
            title="B"
          />
          <EditorOption
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor?.isActive("italic") ? "bg-grayscale-12" : ""}
            title="I"
          />
          <EditorOption
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "bg-grayscale-12" : ""
            }
            title="H1"
          />
          <EditorOption
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "bg-grayscale-12" : ""
            }
            title="H2"
          />
          <EditorOption
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "bg-grayscale-12" : ""
            }
            title="H3"
          />
          <EditorOption
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-grayscale-12" : ""}
            title="Bullet List"
          />
          <EditorOption
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-grayscale-12" : ""}
            title="Ordered List"
          />
        </div>
      )}
      <EditorContent editor={editor} className="flex-1" />
    </div>
  );
}

const EditorOption = ({
  title,
  className,
  onClick,
}: {
  title: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("p-2 rounded", className)}
      title={title}
    >
      {title}
    </button>
  );
};
