"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import ColorButton from "@/app/(routes)/program/customer/_components/color-button";
import { useState } from "react";
import cn from "@/app/_utils/cn";
import SmsChargeHistoryDialog from "./charge-history";

const options = [
  { amount: 200, cost: 9900 },
  { amount: 500, cost: 19900 },
  { amount: 1000, cost: 27900 },
];

export default function SmsChargeDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const openCustom = useDialogStore((state) => state.openCustom);

  const [selectIdx, setSelectIdx] = useState(0);

  return (
    <div className="flex flex-col md:w-[720px] items-stretch p-8 gap-4">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-medium">문자 충전</h1>
        <PrimaryButton
          color="primary"
          title="충전/사용내역"
          className="text-base font-normal h-12"
          onClick={() => openCustom(<SmsChargeHistoryDialog />)}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {options.map((opt, i) => (
          <div
            key={opt.amount}
            className={cn(
              "border rounded p-4 cursor-pointer text-grayscale-6",
              selectIdx === i
                ? "text-sub-2 font-normal border-sub-2 bg-sub-2 bg-opacity-10"
                : "border-grayscale-11"
            )}
            onClick={() => setSelectIdx(i)}
          >
            {opt.amount}건 / {opt.cost.toLocaleString()}원
          </div>
        ))}
      </div>
      <h2 className="text-xl font-medium">
        결제금액: {options[selectIdx].cost.toLocaleString()}원
      </h2>

      <PrimaryButton color="primary" title="카드 결제" onClick={closeDialog} />
      <PrimaryButton color="gray" title="닫기" onClick={closeDialog} />
    </div>
  );
}
