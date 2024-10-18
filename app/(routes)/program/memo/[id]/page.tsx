"use client";

import { Button, LinkButton } from "@/app/_components/Button";
import PrimaryButton from "@/app/_components/Button/button";
import { Input, TextArea } from "@/app/_components/Text";
import Link from "next/link";
import Icon from "@/app/_components/Icon";
import SmsGroupMemberDialog from "@/app/_components/Dialog/sms/group-member";
import useDialogStore from "@/app/_utils/dialog/store";
import MemoEditor from "../_components/editor";

export default function MailSendPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-screen-lg mx-auto my-4">
      <Link
        href={"/program/message/sms"}
        className="underline underline-offset-2 text-grayscale-6"
      >
        {"< 뒤로가기"}
      </Link>

      <h1 className="text-2xl font-medium">업무일지 작성</h1>

      <div className="flex flex-col flex-grow gap-2">
        <div className="flex flex-col flex-1 gap-2 justify-end items-end pb-6">
          <MemoEditor />
        </div>
        <div className="flex justify-between">
          <PrimaryButton color="gray" title="취소" className="w-28" />
          <PrimaryButton color="primary" title="저장" className="w-28" />
        </div>
      </div>
    </div>
  );
}
