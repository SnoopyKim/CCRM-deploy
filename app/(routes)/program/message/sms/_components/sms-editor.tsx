"use client";

import CheckBox from "@/app/_components/CheckBox/default";
import Icon from "@/app/_components/Icon";
import { Select } from "@/app/_components/Select";
import { SearchField, TextArea } from "@/app/_components/Text";
import TextLabel from "@/app/_components/Text/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SmsEditor() {
  const [isReserve, setIsReserve] = useState(false);
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-normal">내용 작성</h3>
      <div className="ml-2 flex items-center">
        <h3 className="text-lg font-normal">발신번호</h3>
        <p className="ml-2">010-0000-0000</p>
      </div>
      <div className="p-4 bg-grayscale-13 space-y-4">
        <TextArea
          id="content"
          label="문구"
          placeholder="문자 내용을 작성하세요."
          className="h-60"
        />
        <div className="space-y-2">
          <TextLabel title="설정" />
          <div className="p-4 border border-grayscale-11 bg-grayscale-14">
            <CheckBox name="nickname" label="호칭적용" />
          </div>
          <div className="p-4 border border-grayscale-11 bg-grayscale-14">
            <CheckBox
              name="reserve"
              label="예약 발송"
              checked={isReserve}
              onChecked={setIsReserve}
            />
            {isReserve && (
              <input
                type="datetime-local"
                className="text-base mt-4 px-4 py-2 border border-grayscale-11"
                value={new Date().toISOString().substring(0, 16)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
