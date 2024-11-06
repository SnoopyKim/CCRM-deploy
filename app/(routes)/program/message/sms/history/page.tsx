"use client";

import PrimaryButton from "@/app/_components/Button/button";
import { SearchField } from "@/app/_components/Text";
import { useRouter } from "next/navigation";

export default function SmsHistoryPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto my-10 gap-6">
      <div>
        <h1 className="text-3xl font-normal">문자 전송 내역</h1>
        <h3 className="text-lg font-normal text-grayscale-6 mt-2">
          기간별 상담 내역 조회를 하실 수 있습니다.
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="date"
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="h-12 px-4 py-2 border border-grayscale-11"
        />
        <span>~</span>
        <input
          type="date"
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="h-12 px-4 py-2 border border-grayscale-11"
        />
        <div className="flex-1"></div>
        <SearchField
          id="search"
          placeholder="검색할 내용을 입력하세요"
          onSearch={() => {}}
          className="w-80 h-12"
        />
      </div>
      <div className="flex flex-col p-10 items-center">
        <h2 className="text-2xl text-grayscale-6 font-normal">
          문자내역 데이터가 없습니다.
        </h2>
        <p className="text-grayscale-9 text-center whitespace-pre-wrap">
          {"지금, 고객들에게 문자를 발송해보세요.\n예약문자가 가능합니다."}
        </p>
        <PrimaryButton
          color="primary"
          title="문자발송"
          className="w-40 mt-4"
          onClick={() => router.push("/program/message/sms")}
        />
      </div>
    </div>
  );
}
