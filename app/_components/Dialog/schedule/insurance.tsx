"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import Icon from "../../Icon";
import { SearchField } from "../../Text";

export default function ScheduleInsuranceDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  return (
    <div className="flex flex-col w-[800px] 2xl:w-[1000px] p-8 gap-6">
      <div className="flex items-center gap-2">
        <Icon type="flag" className="w-8 h-8 fill-sub-3" />
        <h1 className="text-2xl font-normal">보험만기 등록</h1>
      </div>
      <SearchField
        placeholder="이름, 연락처를 입력하세요"
        onSearch={() => {}}
      />
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-grayscale-12">
            <th className="text-left px-4 py-2">고객명</th>
            <th className="text-left ">연락처</th>
            <th className="text-left w-28"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-grayscale-12">
            <td className="px-4 font-normal">홍길동</td>
            <td className="">010-8513-3549</td>
            <td className="px-2 py-3">
              <button
                className="bg-grayscale-14 text-grayscale-6 w-full py-1 text-sm rounded font-normal border border-grayscale-6"
                onClick={closeDialog}
              >
                등록
              </button>
            </td>
          </tr>
          <tr className="border-b border-grayscale-12">
            <td className="px-4 font-normal">홍길동</td>
            <td className="">010-3987-4566</td>
            <td className="px-2 py-3">
              <button
                className="bg-grayscale-14 text-grayscale-6 w-full px-4 py-1 text-sm rounded font-normal border border-grayscale-6"
                onClick={closeDialog}
              >
                등록
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <PrimaryButton
        color="gray"
        title="닫기"
        className="w-full text-lg font-medium"
        onClick={closeDialog}
      />
    </div>
  );
}
