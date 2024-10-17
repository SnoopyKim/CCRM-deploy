"use client";

import Icon from "@/app/_components/Icon";
import AddButton from "./add-button";
import { useState } from "react";
import FormContainer from "./form-container";

export default function CustomerFileForm() {
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
    <FormContainer
      icon="folderAccount"
      title="고객파일 등록"
      actionComponent={
        <AddButton<{
          name: string;
          date: string;
        }>
          type="file"
          onAdd={addFile}
        />
      }
    >
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
    </FormContainer>
  );
}
