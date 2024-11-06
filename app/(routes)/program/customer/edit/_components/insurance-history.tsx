"use client";

import Icon from "@/app/_components/Icon";
import { ClientDTO } from "@/app/_models/client";
import { useState } from "react";

export default function InsuranceHistory({
  formData, 
  setFormData,
}: {
  formData: Partial<ClientDTO> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ClientDTO> | null>>;
}) {
  const handleInsuranceRecordChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      insuranceRecord: value, 
    }));
  };
  return (
    <div className="flex flex-col bg-grayscale-13 p-4 rounded-sm gap-2">
      <div className="flex items-center font-medium text-grayscale-5 gap-2">
        <Icon type="folderOutline" className="w-6 h-6 fill-grayscale-5" />
        <div className="flex gap-2 items-center">보험 내역</div>
      </div>
      <textarea
        placeholder="보험 내역 메모"
        className="h-32 p-4 border border-grayscale-11 rounded-sm resize-none"
        value={formData?.insuranceRecord || ""} 
        onChange={handleInsuranceRecordChange} 
      />
    </div>
  );
}
