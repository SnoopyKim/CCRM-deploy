"use client";

import PrimaryButton from "@/app/_components/Button/button";
import { CheckBox } from "@/app/_components/CheckBox";
import SmsGroupDialog from "@/app/_components/Dialog/group/group";
import { Select } from "@/app/_components/Select";
import { SearchField } from "@/app/_components/Text";
import useDialogStore from "@/app/_utils/dialog/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomerSelection() {
  const router = useRouter();
  const openCustom = useDialogStore((state) => state.openCustom);
  const [customerCount, setCustomerCount] = useState(0);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-normal">고객 선택</h3>
      <div className="flex gap-2">
        <div className="flex-1">
          <Select
            id="group-selection"
            options={[
              { text: "그룹1", value: "3" },
              { text: "그룹2", value: "0" },
              { text: "그룹3", value: "20" },
            ]}
            placeholder={"그룹없음"}
            className="h-12 py-2"
            onChange={(e) => setCustomerCount(Number(e.target.value))}
          />
        </div>
        <PrimaryButton
          title="그룹관리"
          color="tertiary"
          className="w-[5.5rem] h-12 rounded-sm text-base font-normal p-0"
          onClick={() => router.push("/program/group")}
        />
      </div>
      <div className="p-4 bg-grayscale-13 space-y-2">
        <p className="font-normal">
          고객 {customerCount}명<span className="mx-3">|</span>선택{" "}
          {customerCount}명
        </p>
        <SearchField
          placeholder="이름을 입력하세요"
          className="h-12"
          onSearch={() => {}}
        />
      </div>
      {customerCount === 0 ? (
        <div className="py-4 flex items-center justify-center border border-grayscale-11 text-grayscale-6">
          찾으시는 고객이 없으면,
          <Link
            href="/program/customer/new"
            className="ml-2 mr-1 font-medium underline underline-offset-4"
          >
            고객등록
          </Link>
          을 이용하세요.
        </div>
      ) : (
        <table className="border border-grayscale-11">
          <thead>
            <tr className="table w-full talbe-fized bg-grayscale-13 border-b border-grayscale-11">
              <th className="w-10"></th>
              <th className="py-2 text-left">이름</th>
              <th className="text-left">호칭</th>
              <th className="text-left w-36">전화번호</th>
            </tr>
          </thead>
          <tbody className="block max-h-80 overflow-y-scroll">
            {Array.from({ length: customerCount }).map((_, index) => (
              <tr className="table w-full table-fixed" key={index}>
                <td className="w-10 py-2">
                  <div className="flex items-center justify-center">
                    <CheckBox name={`customer-${index}`} checked={true} />
                  </div>
                </td>
                <td className="font-medium">이름 {index}</td>
                <td className="text-sub-2">호칭{index}</td>
                <td className="w-36 text-grayscale-6">010-0000-0000</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
