"use client";

import { useRef } from "react";

export default function AddButton<T>({
  type = "button",
  onAdd,
}: {
  type?: "button" | "file";
  onAdd?: (data?: T) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 창을 프로그램적으로 클릭
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onAdd?.({
        name: file.name,
        date: new Date(file.lastModified).toISOString().split("T")[0],
      } as T); // 파일 이름 저장
    }
  };

  return (
    <>
      <button
        type="button"
        className="bg-main-1 text-grayscale-14 border border-main-1 px-4 py-1 rounded "
        onClick={type === "file" ? handleFileClick : () => onAdd?.()}
      >
        추가
      </button>
      {type === "file" && (
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      )}
    </>
  );
}
