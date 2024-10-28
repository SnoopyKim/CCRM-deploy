"use client";

import { Select } from "@/app/_components/Select";
import FormContainer from "./form-container";
import AddButton from "./add-button";
import { useEffect, useState } from "react";
import { ClientDTO, ExemptionReductionEndDate } from "@/app/_models/client"; // assuming this is the path for ClientDTO and WaiverInsurance

export default function WaiverForm({
  formData, 
  setFormData,
}: {
  formData: Partial<ClientDTO> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ClientDTO> | null>>;
}) {
  const waivers = formData?.exemptionReductionEndDate || [];

  useEffect(() => {
    if (!formData?.exemptionReductionEndDate || formData?.exemptionReductionEndDate?.length === 0) {
      setFormData((prev) => ({
        ...prev,
        exemptionReductionEndDate: [{ id: 0, year: undefined, month: undefined, day: undefined, memo: "" }],
      }));
    }
  }, [formData, setFormData]);

  const handleAddWaiver = (waiver: Omit<ExemptionReductionEndDate, "id">) => {
    const updatedWaivers = [
      ...waivers,
      {
        ...waiver,
        id: waivers.length > 0 ? Math.max(...waivers.map((waiver) => waiver.id)) + 1 : 0,
      },
    ];
    setFormData((prev) => ({
      ...prev,
      exemptionReductionEndDate: updatedWaivers,
    }));
  };

  const handleDeleteWaiver = (index: number) => {
    const updatedWaivers = waivers.filter((_) => _.id !== index);
    setFormData((prev) => ({
      ...prev,
      exemptionReductionEndDate: updatedWaivers,
    }));
  };

  return (
    <FormContainer icon="folderOutline" title="면책/감액 종료일">
      <WaiverItem
        waiverIndex={waivers[0]?.id || 0}
        formData={formData}
        setFormData={setFormData}
        onAddWaiver={handleAddWaiver}
      />
      {waivers.slice(1).map((_) => (
        <WaiverItem
          key={_.id}
          waiverIndex={_.id} 
          formData={formData}
          setFormData={setFormData}
          action={
            <button
              type="button"
              className="bg-grayscale-14 text-main-1 border border-main-1 px-4 py-1 rounded-sm"
              onClick={() => handleDeleteWaiver(_.id)}
            >
              삭제
            </button>
          }
          disabled
        />
      ))}
    </FormContainer>
  );
}


const WaiverItem = ({
  waiverIndex,
  formData,
  setFormData,
  disabled = false,
  action,
  onAddWaiver,
}: {
  waiverIndex?: number;
  formData: Partial<ClientDTO> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ClientDTO> | null>>;
  disabled?: boolean;
  action?: React.ReactNode;
  onAddWaiver?: (waiver: Omit<ExemptionReductionEndDate, "id">) => void;
}) => {
  const waiver = formData?.exemptionReductionEndDate?.find((w) => w.id === waiverIndex) || {
    year: undefined,
    month: undefined,
    day: undefined,
    memo: "",
  };

  const [editable, setEditable] = useState(!disabled);

  const handleChange = (field: keyof ExemptionReductionEndDate, value: any) => {
    const updatedWaivers = formData?.exemptionReductionEndDate?.map((w) =>
      w.id === waiverIndex ? { ...w, [field]: value } : w
    ) || [];
    
    setFormData((prev) => ({
      ...prev,
      exemptionReductionEndDate: updatedWaivers,
    }));
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <Select
              placeholder="년"
              value={waiver.year}
              options={[
                { value: 2024, text: "2024" },
                { value: 2025, text: "2025" },
                { value: 2026, text: "2026" },
                { value: 2027, text: "2027" },
              ]}
              className="h-12 py-2"
              disabled={!editable}
              onChange={(e) => handleChange("year", Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <Select
              placeholder="월"
              options={Array.from({ length: 12 }, (_, i) => ({
                value: i + 1,
                text: `${i + 1}월`,
              }))}
              value={waiver.month}
              className="h-12 py-2"
              disabled={!editable}
              onChange={(e) => handleChange("month", Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <Select
              placeholder="일"
              value={waiver.day}
              options={Array.from({ length: 31 }, (_, i) => ({
                value: i + 1,
                text: `${i + 1}일`,
              }))}
              className="h-12 py-2"
              disabled={!editable}
              onChange={(e) => handleChange("day", Number(e.target.value))}
            />
          </div>
        </div>
        <textarea
          placeholder="보험 특이사항 메모"
          className="w-full h-20 p-4 border border-grayscale-11 rounded-sm resize-none disabled:bg-grayscale-12 disabled:text-grayscale-6"
          disabled={!editable}
          onChange={(e) => handleChange("memo", e.target.value)}
          value={waiver.memo}
        />
      </div>
      <div className="flex flex-col gap-2">
        {!onAddWaiver &&
          (editable ? (
            <button
              type="button"
              className="bg-main-2 text-grayscale-14 border border-main-2 px-4 py-1 rounded-sm"
              onClick={() => setEditable(false)}
            >
              저장
            </button>
          ) : (
            <button
              type="button"
              className="bg-main-2 text-grayscale-14 border border-main-2 px-4 py-1 rounded-sm"
              onClick={() => setEditable(true)}
            >
              수정
            </button>
          ))}
        {onAddWaiver && editable && (
          <AddButton
            onAdd={() => {
              const newWaiver = {
                memo: "",
              };
              onAddWaiver(newWaiver);
            }}
          />
        )}
        {action}
      </div>
    </div>
  );
};
