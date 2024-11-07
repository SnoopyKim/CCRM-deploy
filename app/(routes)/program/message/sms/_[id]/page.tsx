"use client";

import { Button, LinkButton } from "@/app/_components/Button";
import PrimaryButton from "@/app/_components/Button/button";
import { Input, TextArea } from "@/app/_components/Text";
import Link from "next/link";
import ColorButton from "../../../customer/_components/color-button";
import Icon from "@/app/_components/Icon";
import GroupMemberDialog from "@/app/_components/Dialog/group/member";
import useDialogStore from "@/app/_utils/dialog/store";

// 실제 알리고 API 응답 객체
const mockMessages = [
  {
    mid: "123456789",
    type: "SMS",
    sender: "025114560",
    sms_count: "2",
    reserve_state: "예약대기중",
    msg: "안녕하세요!",
    fail_count: "0",
    reg_date: "2024-10-18 16:05:06",
    reserve: "2024-10-18 17:40:06",
  },
  {
    mid: "123456788",
    type: "SMS",
    sender: "025114560",
    sms_count: "1",
    reserve_state: "전송완료",
    msg: "A little bit of effort into learning and building on Bubble can go a long way. Our no-code platform empowers you to transform any product idea into an impactful solution, thereby reducing budget, time, and resource constraints. See below for how Bubble can support you, from MVP launch all the way through scale.",
    fail_count: "0",
    reg_date: "2024-10-18 15:40:06",
    reserve: "",
  },
];

export default function MailSendPage({ params }: { params: { id: string } }) {
  const openCustom = useDialogStore((state) => state.openCustom);
  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-lg mx-auto my-4">
      <Link
        href={"/program/message/sms"}
        className="underline underline-offset-2 text-grayscale-6"
      >
        {"< 뒤로가기"}
      </Link>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium">채팅 그룹 이름 1</h1>
          <p>1 멤버</p>
        </div>
        <div
          className="px-4 py-3 border border-sub-2 text-sub-2 cursor-pointer"
          onClick={() => openCustom(<GroupMemberDialog />)}
        >
          멤버 추가하기
        </div>
      </div>
      <div className="flex flex-col flex-grow gap-2 mt-6">
        <div className="flex flex-col flex-1 gap-2 justify-end items-end pb-6">
          {[...mockMessages].reverse().map((message) => (
            <div
              key={message.mid}
              className="flex flex-col w-1/2 p-3 bg-sub-1 bg-opacity-10  rounded"
            >
              {message.msg}
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="문자를 입력하세요"
            className="h-12 focus:border-main-2 focus-visible:border-main-2"
          />
          <Icon
            type="message"
            className="fill-grayscale-6 hover:fill-main-2 w-12 h-12 p-3 rounded cursor-pointer hover:bg-grayscale-12"
          />
        </div>
      </div>
    </div>
  );
}
