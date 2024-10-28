"use client";

import { Select } from "@/app/_components/Select";
import FormContainer from "./form-container";
import AddButton from "./add-button";
import { useEffect, useState } from "react";
import { ClientDTO, FireInsurance } from "@/app/_models/client"; // assuming this is the path for ClientDTO and FireInsurance

export default function FireForm({
  formData, 
  setFormData,
}: {
  formData: Partial<ClientDTO> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ClientDTO> | null>>;
}) {
  const fires = formData?.fireInsuranceExpiration || [];

  useEffect(() => {
    if (!formData?.fireInsuranceExpiration || formData?.fireInsuranceExpiration?.length === 0) {
      setFormData((prev) => ({
        ...prev,
        fireInsuranceExpiration: [{ id: 0, company: "보험사 선택", year: undefined, month: undefined, day: undefined, memo: "" }],
      }));
    }
  }, [formData, setFormData]);

  const handleAddFire = (fire: Omit<FireInsurance, "id">) => {
    const updatedFires = [
      ...fires,
      {
        ...fire,
        id: fires.length > 0 ? Math.max(...fires.map((fire) => fire.id)) + 1 : 0,
      },
    ];
    setFormData((prev) => ({
      ...prev,
      fireInsuranceExpiration: updatedFires,
    }));
  };

  const handleDeleteFire = (index: number) => {
    const updatedFires = fires.filter((_) => _.id !== index);
    setFormData((prev) => ({
      ...prev,
      fireInsuranceExpiration: updatedFires,
    }));
  };

  return (
    <FormContainer icon="folderOutline" title="화재보험 만기">
      <FireItem
        fireIndex={fires[0]?.id || 0}
        formData={formData}
        setFormData={setFormData}
        onAddFire={handleAddFire}
      />
      {fires.slice(1).map((_) => (
        <FireItem
          key={_.id}
          fireIndex={_.id} 
          formData={formData}
          setFormData={setFormData}
          action={
            <button
              type="button"
              className="bg-grayscale-14 text-main-1 border border-main-1 px-4 py-1 rounded-sm"
              onClick={() => handleDeleteFire(_.id)}
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


const FireItem = ({
  fireIndex,
  formData,
  setFormData,
  disabled = false,
  action,
  onAddFire,
}: {
  fireIndex?: number;
  formData: Partial<ClientDTO> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ClientDTO> | null>>;
  disabled?: boolean;
  action?: React.ReactNode;
  onAddFire?: (fire: Omit<FireInsurance, "id">) => void;
}) => {
  const fire = formData?.fireInsuranceExpiration?.find((f) => f.id === fireIndex) || {
    company: "보험사 선택",
    year: undefined,
    month: undefined,
    day: undefined,
    memo: "",
  };

  const [editable, setEditable] = useState(!disabled);

  const handleChange = (field: keyof FireInsurance, value: any) => {
    const updatedFires = formData?.fireInsuranceExpiration?.map((f) =>
      f.id === fireIndex ? { ...f, [field]: value } : f
    ) || [];
    
    setFormData((prev) => ({
      ...prev,
      fireInsuranceExpiration: updatedFires,
    }));
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-1 flex-col gap-2">
        <Select
          placeholder="보험사 선택"
          options={[{ value: "AIG손해보험", text: "AIG손해보험" }]}
          value={fire.company}
          className="h-12 py-2"
          disabled={!editable}
          onChange={(e) => handleChange("company", e.target.value)}
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <Select
              placeholder="년"
              value={fire.year}
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
              value={fire.month}
              className="h-12 py-2"
              disabled={!editable}
              onChange={(e) => handleChange("month", Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <Select
              placeholder="일"
              options={Array.from({ length: 31 }, (_, i) => ({
                value: i + 1,
                text: `${i + 1}일`,
              }))}
              value={fire.day}
              className="h-12 py-2"
              disabled={!editable}
              onChange={(e) => handleChange("day", Number(e.target.value))}
            />
          </div>
        </div>
        <textarea
          placeholder="화재보험 특이사항 메모"
          className="w-full h-20 p-4 border border-grayscale-11 rounded-sm resize-none disabled:bg-grayscale-12 disabled:text-grayscale-6"
          disabled={!editable}
          onChange={(e) => handleChange("memo", e.target.value)}
          value={fire.memo}
        />
      </div>
      <div className="flex flex-col gap-2">
        {!onAddFire &&
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
        {onAddFire && editable && (
          <AddButton
            onAdd={() => {
              const newFire = {
                company: "",
                memo: "",
              };
              onAddFire(newFire);
            }}
          />
        )}
        {action}
      </div>
    </div>
  );
};
