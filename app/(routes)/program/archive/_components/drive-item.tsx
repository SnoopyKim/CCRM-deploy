"use client";

import Icon from "@/app/_components/Icon";
import { DriveDirectory, DriveItem } from "@/app/_models/drive";
import { deleteDriveFile, getDriveFiles } from "@/app/_services/google/drive";
import { useGoogleDriveStore } from "@/app/_utils/gdrive/store";
import { useState } from "react";
import { flushSync } from "react-dom";

export default function DriveItemRow({ item }: { item: DriveItem }) {
  const loadDirectory = useGoogleDriveStore((state) => state.loadDirectory);
  const deleteFile = useGoogleDriveStore((state) => state.deleteFile);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    flushSync(() => setLoading(true));
    const { data: items, error } = await getDriveFiles(item.id);
    setLoading(false);
    if (error || !items) {
      console.error(error);
      return;
    }

    const newDirectory: DriveDirectory = {
      id: item.id,
      name: item.name,
      parents: item.parents,
      items,
    };
    loadDirectory(newDirectory);
  };

  const handleDownload = async () => {
    window.open(item.webContentLink, "_blank"); // 새 탭에서 링크 열기
  };

  const handleDelete = async () => {
    flushSync(() => setLoading(true));
    const success = await deleteDriveFile(item.id);
    setLoading(false);
    if (success) {
      deleteFile(item.id);
    }
  };

  const getTypeString = (type: string) => {
    if (type === "application/vnd.google-apps.folder") {
      return "폴더";
    }
    if (type === "application/vnd.google-apps.document") {
      return "문서";
    }
    if (type.startsWith("image")) {
      return "이미지";
    }
    if (type.startsWith("video")) {
      return "비디오";
    }
    if (type.startsWith("audio")) {
      return "음성";
    }
    return "파일";
  };

  const getByteString = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const formattedBytes = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
    return `${formattedBytes} ${sizes[i]}`;
  };

  return (
    <tr
      key={item.id}
      className="border-b border-grayscale-11 hover:bg-grayscale-13"
    >
      <td className="px-4 font-normal">
        <Icon
          type={
            item.mimeType !== "application/vnd.google-apps.folder"
              ? "document"
              : "folderOutline"
          }
          className=""
        />
      </td>
      <td className="">{item.name}</td>
      <td className="">{getTypeString(item.mimeType ?? "")}</td>
      <td className="">{item.size ? getByteString(Number(item.size)) : "-"}</td>
      <td className="">
        {item.modifiedTime?.slice(0, 10) ??
          new Date().toISOString().slice(0, 10)}
      </td>
      <td className="p-2">
        {loading ? (
          <div className="w-6 h-6 mx-auto border-4 border-main-2 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <div className="flex gap-2 justify-end">
            {item.mimeType === "application/vnd.google-apps.folder" ? (
              <Icon
                type="folderOpen"
                className="w-10 h-10 p-2 stroke-[1.5] rounded hover:bg-sub-2 hover:bg-opacity-10 hover:stroke-sub-2"
                onClick={handleOpen}
              />
            ) : item.webContentLink ? (
              <Icon
                type="download"
                className="w-10 h-10 p-2 rounded hover:bg-sub-2 hover:bg-opacity-10 hover:fill-sub-2"
                onClick={handleDownload}
              />
            ) : null}
            <Icon
              type="delete"
              className="w-10 h-10 p-2 rounded hover:bg-sub-1 hover:bg-opacity-10 hover:fill-sub-1"
              onClick={handleDelete}
            />
          </div>
        )}
      </td>
    </tr>
  );
}
