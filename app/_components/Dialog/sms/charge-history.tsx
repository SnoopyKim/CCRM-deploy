"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import ColorButton from "@/app/(routes)/program/customer/_components/color-button";
import { useState } from "react";
import cn from "@/app/_utils/cn";

export default function SmsChargeHistoryDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  return (
    <div className="flex flex-col md:w-[720px] items-stretch p-8 gap-4">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-medium">문자 충전</h1>
      </div>
      <div>
        <h2 className="text-xl font-medium">현재 잔여 문자: {300}건</h2>
        <p className="text-sub-1">※ 월 300건 문자를 기본 제공합니다.</p>
      </div>
      <div className="p-4">
        <p className="text-xl font-normal">구매내역이 없습니다.</p>
      </div>
      <PrimaryButton color="gray" title="닫기" onClick={closeDialog} />
    </div>
  );
}
