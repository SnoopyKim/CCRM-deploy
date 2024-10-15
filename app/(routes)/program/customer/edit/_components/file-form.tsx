"use client";

import Icon from "@/app/_components/Icon";
import AddButton from "./add-button";
import { useState } from "react";

export default function FileForm() {
  const [selectedFile, setSelectedFile] = useState<
    | {
        name: string;
        date: string;
      }
    | undefined
  >();

  const addFile = (data?: { name: string; date: string }) => {
    setSelectedFile(data);
  };

  return (
    <div className="flex flex-col bg-grayscale-13 p-4 rounded-sm gap-2">
      <div className="flex justify-between items-center font-medium text-grayscale-5">
        <div className="flex gap-2 items-center">
          <Icon type="folderAccount" className=" fill-grayscale-6" />
          고객 파일 등록
        </div>
        <AddButton<{
          name: string;
          date: string;
        }>
          type="file"
          onAdd={addFile}
        />
      </div>
      <div className="border border-grayscale-11 rounded-sm p-4 space-y-2">
        {selectedFile && (
          <div className="flex gap-4 items-center ">
            <div className="flex-1">
              <div className="font-semibold">{selectedFile.name}</div>
              <div className="">{selectedFile.date}</div>
            </div>
            <div
              className="border border-grayscale-11 rounded-sm cursor-pointer"
              onClick={() => setSelectedFile(undefined)}
            >
              <Icon type="delete" className="fill-grayscale-9" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
