"use client";

import PrimaryButton from "@/app/_components/Button/button";
import { TextField } from "@/app/_components/Text";
import Link from "next/link";
import Icon from "@/app/_components/Icon";
import useDialogStore from "@/app/_utils/dialog/store";
import MemoEditor from "../_components/editor";
import { useEffect, useState } from "react";
import TextLabel from "@/app/_components/Text/label";
import {
  getMemoData,
  updateMemoFile,
  uploadMemoFile,
} from "@/app/_services/google/memo";
import { useRouter } from "next/navigation";

export default function MemoEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const openAlert = useDialogStore((state) => state.openAlert);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id !== "new") {
      const fetchMemo = async () => {
        const { data, error } = await getMemoData(params.id);
        if (error || !data) {
          await openAlert({
            title: "데이터 불러오기 실패",
            description:
              "해당 파일을 찾지 못했습니다. 목록 화면으로 이동합니다.",
          });
          router.replace("/program/memo");
          return;
        }
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      };
      fetchMemo();
    }
  }, [params.id]);

  const handleSave = async () => {
    if (!title) {
      openAlert({
        title: "제목",
        description: "제목를 입력하십시오.",
      });
      return;
    }

    updateMemo();
  };

  const updateMemo = async () => {
    const { data, error } = await updateMemoFile(params.id, title, content);
    if (error || !data) {
      openAlert({
        title: "저장 실패",
        description: "알 수 없는 오류가 발생했습니다",
      });
      return;
    }

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

        <h1 className="text-2xl font-medium">업무일지 작성</h1>
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
        {loading ? (
          <div className="mx-auto mt-10 w-10 h-10 rounded-full border-4 border-t-transparent border-main-2 animate-spin"></div>
        ) : (
          <MemoEditor content={content || ""} onChange={setContent} />
        )}{" "}
      </div>
    </div>
  );
}
