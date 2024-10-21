import Dropdown from "@/app/_components/Dropdown";
import cn from "@/app/_utils/cn";
import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import { useCallback, useRef } from "react";

export default function BubbleMenuBox() {
  const { editor } = useCurrentEditor();

  const setLink = useCallback(() => {
    if (!editor) {
      return;
    }
    const previousUrl = editor.getAttributes("link").href;
    let url = window.prompt("URL을 입력하세요", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return;
  }

  return (
    <BubbleMenu editor={editor} tippyOptions={{ placement: "top-start" }}>
      <div className="flex items-center bg-grayscale-13 shadow rounded">
        {editor.getAttributes("image").src ? (
          <>
            <ImageOption
              onChange={(base64) =>
                editor.chain().focus().setImage({ src: base64 }).run()
              }
            />
            <BubbleOption
              title="삭제"
              onClick={() => editor.chain().focus().deleteSelection().run()}
            />
          </>
        ) : (
          <>
            <BubbleOption
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor?.isActive("bold")}
              className={"font-bold"}
              title="B"
            />
            <BubbleOption
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor?.isActive("italic")}
              className={"italic"}
              title="I"
            />
            <BubbleOption
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor?.isActive("underline")}
              className={"underline underline-offset-2"}
              title="U"
            />
            <BubbleOption
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor?.isActive("strike")}
              className={"line-through"}
              title="S"
            />
            <BubbleOption
              onClick={setLink}
              isActive={editor?.isActive("link")}
              title="링크"
            />
            <Dropdown
              options={[
                {
                  label: "기본",
                  color: "#1e1e1e",
                  onClick: () => editor.chain().focus().unsetColor().run(),
                },
                {
                  label: "회색",
                  color: "#777",
                  onClick: () => editor.chain().focus().setColor("#777").run(),
                },
                {
                  label: "갈색",
                  color: "#6B4226",
                  onClick: () =>
                    editor.chain().focus().setColor("#6B4226").run(),
                },
                {
                  label: "주황색",
                  color: "#FF6B35",
                  onClick: () =>
                    editor.chain().focus().setColor("#FF6B35").run(),
                },
                {
                  label: "노란색",
                  color: "#D1B000",
                  onClick: () =>
                    editor.chain().focus().setColor("#D1B000").run(),
                },
                {
                  label: "초록색",
                  color: "#4F8A10",
                  onClick: () =>
                    editor.chain().focus().setColor("#4F8A10").run(),
                },
                {
                  label: "파란색",
                  color: "#1F6FBE",
                  onClick: () =>
                    editor.chain().focus().setColor("#1F6FBE").run(),
                },
                {
                  label: "보라색",
                  color: "#6A0DAD",
                  onClick: () =>
                    editor.chain().focus().setColor("#6A0DAD").run(),
                },
                {
                  label: "분홍색",
                  color: "#D474A2",
                  onClick: () =>
                    editor.chain().focus().setColor("#D474A2").run(),
                },
                {
                  label: "빨간색",
                  color: "#C62828",
                  onClick: () =>
                    editor.chain().focus().setColor("#C62828").run(),
                },
              ]}
            >
              <div
                className="m-2.5 w-5 h-5 rounded-full"
                style={{
                  backgroundColor:
                    editor.getAttributes("textStyle").color || "#1E1E1E",
                }}
              ></div>
            </Dropdown>
          </>
        )}
      </div>
    </BubbleMenu>
  );
}

const BubbleOption = ({
  title,
  isActive,
  className,
  onClick,
}: {
  title: string;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-w-10 px-3 py-2 rounded text-center",
        isActive
          ? "bg-main-2 text-grayscale-14 hover:bg-main-3"
          : "hover:bg-grayscale-13",
        className
      )}
    >
      {title}
    </button>
  );
};

const ImageOption = ({ onChange }: { onChange: (base64: string) => void }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        onChange(base64 as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <BubbleOption title="변경" onClick={() => inputRef.current?.click()} />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};
