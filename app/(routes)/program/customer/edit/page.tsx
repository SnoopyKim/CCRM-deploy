"use client";

import PrimaryButton from "@/app/_components/Button/button";
import ColorButton from "../_components/color-button";
import InfoForm from "../_components/info-form";
import Icon from "@/app/_components/Icon";
import FamilyForm from "./_components/family-form";
import AccountForm from "./_components/account-form";
import CustomerFileForm from "./_components/customer-file-form";
import MemoForm from "./_components/memo-form";
import HospitalHistory from "./_components/hospital-history";
import InsuranceForm from "./_components/insurance-form";
import CarForm from "./_components/car-form";
import FireForm from "./_components/fire-form";
import WaiverForm from "./_components/waiver-form";

export default function CustomerEditPage() {
  return (
    <div className="w-full p-6">
      <div className="flex justify-end gap-4 font-normal">
        <ColorButton color="sub-5" title="고객정보 내려받기" />
        <PrimaryButton
          color="secondary"
          title="저장"
          className="w-36 text-lg"
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
          <CustomerFileForm />
          <MemoForm />
          <h1 className="text-xl font-normal">보험정보</h1>
          <HospitalHistory />
          <InsuranceForm />
          <CarForm />
          <FireForm />
          <WaiverForm />
        </div>
      </div>
    </div>
  );
}
