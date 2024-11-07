"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import { Input, SearchField, TextField } from "../../Text";
import TextLabel from "../../Text/label";
import { useState } from "react";

export default function GroupDialog({ groupName }: { groupName?: string }) {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const [inputValue, setInputValue] = useState(groupName);

  return (
    <div className="flex flex-col w-[640px] max-md:w-96 gap-4">
      <div className="px-6 py-4 border-b border-b-grayscale-11">
        <h2 className="text-xl font-normal">
          {groupName ? "그룹명 수정" : "그룹 추가"}
        </h2>
      </div>
      <div className="px-6">
        <Input
          placeholder="그룹 이름"
          value={inputValue || ""}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="flex justify-between px-6 pb-6">
        <PrimaryButton
          title="취소"
          color="gray"
          className="w-20 h-10 rounded text-base"
          onClick={() => closeDialog(null)}
        />
        <PrimaryButton
          title="저장"
          color="primary"
          className="w-20 h-10 rounded text-base"
          onClick={() => closeDialog(inputValue)}
        />
      </div>
    </div>
  );
}
