import Button from "@/app/_components/Button/button";
import { useState } from "react";

export default function ProfileUpload({
  defaultImage,
}: {
  defaultImage: string;
}) {
  const [fileName, setFileName] = useState<string | null>(defaultImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name); // 파일 이름 저장
    }
  };

  return (
    <div className="">
      <input
        id={"profile-image"}
        name={"profile-image"}
        type="file"
        accept={"image/*"}
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="profile-image"
        className="flex items-center gap-2 cursor-pointer"
      >
        <span className="text-sm text-grayscale-14 bg-main-2 rounded-sm px-4 py-2 hover:bg-main-3">
          파일선택
        </span>
        <span className="text-sm text-grayscale-6">{fileName}</span>
      </label>
    </div>
  );
}
