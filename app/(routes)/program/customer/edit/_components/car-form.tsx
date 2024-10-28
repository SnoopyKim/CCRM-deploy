"use client";

import { Select } from "@/app/_components/Select";
import FormContainer from "./form-container";
import AddButton from "./add-button";
import { ClientDTO, AutoInsurance } from "@/app/_models/client";
import { useEffect, useState } from "react";


export default function CarForm({
  formData, 
  setFormData,
}: {
  formData: Partial<ClientDTO> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ClientDTO> | null>>;
}) {
  const cars = formData?.autoInsuranceExpiration || [];

  useEffect(() => {
    if (!formData?.autoInsuranceExpiration || formData?.autoInsuranceExpiration?.length === 0) {
      setFormData((prev) => ({
        ...prev,
        autoInsuranceExpiration: [{ id: 0, company: "보험사 선택", year: undefined, month: undefined, day: undefined, memo: "" }],
      }));
    }
  }, [formData, setFormData]);

  const handleAddCar = (car: Omit<AutoInsurance, "id">) => {
    const updatedCars = [
      ...cars,
      {
        ...car,
        id: cars.length > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 0,
      },
    ];
    setFormData((prev) => ({
      ...prev,
      autoInsuranceExpiration: updatedCars,
    }));
  };

  const handleDeleteCar = (index: number) => {
    const updatedCars = cars.filter((_) => _.id !== index);
    setFormData((prev) => ({
      ...prev,
      autoInsuranceExpiration: updatedCars,
    }));
  };

  return (
    <FormContainer icon="folderOutline" title="자동차보험 만기">
      <CarItem
        carIndex={cars[0]?.id||0}
        formData={formData}
        setFormData={setFormData}
        onAddCar={handleAddCar}
      />
      {cars.slice(1).map((_) => (
        <CarItem
          key={_.id}
          carIndex={_.id} 
          formData={formData}
          setFormData={setFormData}
          action={
            <button
              type="button"
              className="bg-grayscale-14 text-main-1 border border-main-1 px-4 py-1 rounded-sm"
              onClick={() => handleDeleteCar(_.id)}
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


const CarItem = ({
  carIndex,
  formData,
  setFormData,
  disabled = false,
  action,
  onAddCar,
}: {
  carIndex?: number;
  formData: Partial<ClientDTO>| null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ClientDTO> | null>>;
  disabled?: boolean;
  action?: React.ReactNode;
  onAddCar?: (car: Omit<AutoInsurance, "id">) => void;
}) => {
  const car = formData?.autoInsuranceExpiration?.find((c) => c.id === carIndex) || {
    company: "보험사 선택",
    year: undefined,
    month: undefined,
    day: undefined,
    memo: "",
  };

  const [editable, setEditable] = useState(!disabled);

  const handleChange = (field: keyof AutoInsurance, value: any) => {
    const updatedCars = formData?.autoInsuranceExpiration?.map((c) =>
      c.id === carIndex ? { ...c, [field]: value } : c
    ) || [];
    
    setFormData((prev) => ({
      ...prev,
      autoInsuranceExpiration: updatedCars,
    }));
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-1 flex-col gap-2">
        <Select
          placeholder="보험사 선택"
          options={[{ value: "AIG손해보험", text: "AIG손해보험" }]}
          value={car.company}
          className="h-12 py-2"
          disabled={!editable}
          onChange={(e) => handleChange("company", e.target.value)}
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <Select
              placeholder="년"
              value={car.month}
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
              value={car.month}
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
              value={car.day}
              className="h-12 py-2"
              disabled={!editable}
              onChange={(e) => handleChange("day", Number(e.target.value))}
            />
          </div>
        </div>
        <textarea
          placeholder="자동차보험 특이사항 메모"
          className="w-full h-20 p-4 border border-grayscale-11 rounded-sm resize-none disabled:bg-grayscale-12 disabled:text-grayscale-6"
          disabled={!editable}
          onChange={(e) => handleChange("memo", e.target.value)}
          value={car.memo}
        />
      </div>
      <div className="flex flex-col gap-2">
        {!onAddCar &&
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
        {onAddCar && editable && (
          <AddButton
            onAdd={() => {
              const newCar = {
                company: "",
                memo: "",
              };
              onAddCar(newCar); 
            }}
          />
        )}
        {action}
      </div>
    </div>
  );
};
