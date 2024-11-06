"use client";

import PrimaryButton from "@/app/_components/Button/button";
import Icon from "@/app/_components/Icon";
import { TextField } from "@/app/_components/Text";
import TextLabel from "@/app/_components/Text/label";
import { uploadMemoFile } from "@/app/_services/google/memo";
import useDialogStore from "@/app/_utils/dialog/store";
import { useMemoStore } from "@/app/_utils/memo/store";
import { useState, useEffect } from "react";
import MemoEditor from "../_components/editor";
import { useRouter } from "next/navigation";

export default function NewMemoPage() {
  const router = useRouter();
  const { openAlert, openLoading, closeDialog } = useDialogStore();
  const directoryId = useMemoStore((state) => state.directory?.id);
  const loadDirectory = useMemoStore((state) => state.loadDirectory);
  const addMemo = useMemoStore((state) => state.addMemo);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!directoryId) {
      const fetchDirectory = async () => {
        openLoading("메모/기록 드라이브 연동중...");
        await loadDirectory();
        closeDialog();
      };
      fetchDirectory();
    }
  }, [directoryId]);

  const handleSave = async () => {
    if (!title) {
      openAlert({
        title: "제목",
        description: "제목를 입력하십시오.",
      });
      return;
    }

    addNewMemo();
  };

  const addNewMemo = async () => {
    openLoading("메모/기록를 저장하는 중입니다...");
    const { data, error } = await uploadMemoFile(title, content, directoryId);
    closeDialog();
    if (error || !data) {
      openAlert({
        title: "저장 실패",
        description: "알 수 없는 오류가 발생했습니다",
      });
      return;
    }

    addMemo(data);
    await openAlert({
      title: "저장 성공",
      description: "목록 화면으로 이동합니다",
    });
    router.replace("/program/memo");
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-screen-lg max-h-[calc(100vh-10rem)] mx-auto py-4">
      <div className="flex items-center gap-2">
        <Icon
          type="down"
          className="rotate-90 w-10 h-10 p-2 rounded hover:bg-grayscale-12 cursor-pointer"
          onClick={() => router.replace("/program/memo")}
        />

        <h1 className="text-2xl font-medium">메모/기록 작성</h1>
      </div>
      <div className="flex items-end gap-4 mt-2">
        <TextField
          title="제목"
          className="border-main-2 h-12 rounded"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <PrimaryButton
          color="primary"
          title="저장"
          className="w-28 h-12 rounded"
          onClick={handleSave}
        />
      </div>
      <TextLabel title="내용" className="mt-2" />
      <div className="flex-1 overflow-hidden">
        <MemoEditor onChange={setContent} />
      </div>
    </div>
  );
}
