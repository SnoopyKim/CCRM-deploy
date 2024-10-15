"use client";

import PrimaryButton from "@/app/_components/Button/button";
import ColorButton from "../_components/color-button";
import InfoForm from "../_components/info-form";
import Icon from "@/app/_components/Icon";
import FamilyForm from "./_components/family-form";
import AccountForm from "./_components/account-form";
import FileForm from "./_components/file-form";
import MemoForm from "./_components/memo-form";

export default function CustomerEditPage() {
  return (
    <div className="w-full p-6">
      <div className="flex justify-end gap-4 font-normal">
        <ColorButton color="sub-5" title="고객정보 내려받기" />
        <PrimaryButton
          color="secondary"
          title="저장"
          className="w-40 text-lg"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-6 w-1/2">
          <h2 className="text-2xl font-medium">고객 기본 정보</h2>
          <InfoForm />
          <FamilyForm />
        </div>
        <div className="flex flex-col gap-6 w-1/2">
          <h2 className="text-2xl font-medium">보험 및 기타정보</h2>
          <AccountForm />
          <FileForm />
          <MemoForm />
        </div>
      </div>
    </div>
  );
}
