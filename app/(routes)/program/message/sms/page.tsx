"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import CustomerSelection from "./_components/customer-selection";
import SmsEditor from "./_components/sms-editor";
import GroupDialog from "@/app/_components/Dialog/group/group";
import Link from "next/link";
import ColorButton from "../../customer/_components/color-button";
import SmsChargeDialog from "@/app/_components/Dialog/sms/charge";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/app/_components/Button/button";

export default function SmsPage() {
  const router = useRouter();
  const openCustom = useDialogStore((state) => state.openCustom);
  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto my-10">
      <div className="flex max-lg:flex-col justify-between lg:items-end">
        <div>
          <h1 className="text-3xl font-normal">문자 발송</h1>
          <h3 className="text-lg font-normal text-sub-1 mt-2">
            잔여문자 300건
            <span className="ml-1 text-grayscale-6 text-base">
              (매달 300건 무료제공)
            </span>
          </h3>
        </div>
        <div className="flex gap-2 max-lg:mt-4">
          <div className="max-lg:flex-1">
            <ColorButton
              icon="cartPlus"
              color="sub-2"
              title="문자 충전"
              onClick={() => openCustom(<SmsChargeDialog />)}
            />
          </div>
          <div className="max-lg:flex-1">
            <ColorButton
              icon="folderOutline"
              color="sub-2"
              title="전송 내역"
              onClick={() => router.push("/program/message/sms/history")}
            />
          </div>
          <div className="max-lg:flex-1">
            <ColorButton
              icon="clock"
              color="sub-2"
              title="예약 내역"
              onClick={() => router.push("/program/message/sms/reserve")}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* 고객 선택 */}
        <div className="col-span-1">
          <CustomerSelection />
        </div>
        {/* 내용 작성 */}
        <div className="col-span-2 max-lg:mt-4">
          <SmsEditor />
        </div>
      </div>
    </div>
  );
}
