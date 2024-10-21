"use client";

import { Button, LinkButton } from "@/app/_components/Button";
import PrimaryButton from "@/app/_components/Button/button";
import { Input, TextArea } from "@/app/_components/Text";
import Link from "next/link";
import Icon from "@/app/_components/Icon";
import SmsGroupMemberDialog from "@/app/_components/Dialog/sms/group-member";
import useDialogStore from "@/app/_utils/dialog/store";
import MemoEditor from "../_components/editor";
import { useState } from "react";

export default function MemoEditPage({ params }: { params: { id: string } }) {
  const [memo, setMemo] = useState("");
  const openAlert = useDialogStore((state) => state.openAlert);

  return (
    <div className="flex flex-col gap-4 w-full max-w-screen-lg max-h-[calc(100vh-11rem)] mx-auto py-4">
      <Link
        href={"/program/message/sms"}
        className="underline underline-offset-2 text-grayscale-6"
      >
        {"< 뒤로가기"}
      </Link>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">업무일지 작성</h1>
        <PrimaryButton
          color="primary"
          title="저장"
          className="w-28 h-12 rounded"
          onClick={() =>
            openAlert({
              title: "메모 내용",
              description: memo,
            })
          }
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <MemoEditor onChange={setMemo} />
      </div>
    </div>
  );
}
