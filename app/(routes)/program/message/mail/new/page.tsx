"use client";

import { Button, LinkButton } from "@/app/_components/Button";
import PrimaryButton from "@/app/_components/Button/button";
import { Input, TextArea } from "@/app/_components/Text";

export default function MailSendPage() {
  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto my-10">
      <h1 className="text-3xl font-normal">메일 발송</h1>
      <div className="flex flex-col flex-grow gap-2 mt-6">
        <div>
          <Input placeholder="받는 이" />
        </div>
        <div>
          <Input placeholder="제목" />
        </div>
        <TextArea placeholder="메일 내용을 입력해주세요" className="flex-1" />
        <div className="flex justify-between">
          <LinkButton
            href={"/program/message/mail"}
            title="취소"
            color="gray"
            className="w-28 font-medium text-lg"
          />
          <PrimaryButton title="보내기" color="primary" className="w-28" />
        </div>
      </div>
    </div>
  );
}
