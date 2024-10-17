"use client";

import { Select } from "@/app/_components/Select";
import FormContainer from "./form-container";
import AddButton from "./add-button";
import { useState } from "react";

export default function CarForm() {
  const [cars, setCars] = useState<any[]>([]);
  return (
    <FormContainer icon="folderOutline" title="자동차보험 만기">
      <CarItem onAddCar={(car) => setCars([...cars, car])} />
      {cars.map((item, i) => (
        <CarItem
          key={i}
          car={item}
          action={
            <button
              type="button"
              className="bg-grayscale-14 text-main-1 border border-main-1 px-4 py-1 rounded-sm"
              onClick={() => setCars(cars.filter((_, j) => j !== i))}
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
  car,
  onAddCar,
  disabled = false,
  action,
}: {
  car?: any;
  onAddCar?: (car: any) => void;
  disabled?: boolean;
  action?: React.ReactNode;
}) => {
  const [editable, setEditable] = useState(!disabled);
  const [company, setCompany] = useState(car?.company || "보험사 선택");
  const [year, setYear] = useState<number>(car?.year || undefined);
  const [month, setMonth] = useState<number>(car?.month || undefined);
  const [day, setDay] = useState<number>(car?.day || undefined);
  const [memo, setMemo] = useState(car?.memo || "");

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-1 flex-col gap-2">
        <Select
          placeholder="보험사 선택"
          options={[{ value: "AIG손해보험", text: "AIG손해보험" }]}
          value={company}
          className="h-12 py-2"
          disabled={!editable}
          onChange={(e) => setCompany(e.target.value)}
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <Select
              placeholder="년"
              value={year}
              options={[
                { value: 2024, text: "2024" },
                { value: 2025, text: "2025" },
                { value: 2026, text: "2026" },
                { value: 2027, text: "2027" },
              ]}
              className="h-12 py-2"
              disabled={!editable}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <Select
              placeholder="월"
              options={Array.from({ length: 12 }, (_, i) => ({
                value: i + 1,
                text: `${i + 1}월`,
              }))}
              value={month}
              className="h-12 py-2"
              disabled={!editable}
              onChange={(e) => setMonth(Number(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <Select
              placeholder="일"
              value={day}
              options={Array.from({ length: 31 }, (_, i) => ({
                value: i + 1,
                text: `${i + 1}일`,
              }))}
              className="h-12 py-2"
              disabled={!editable}
              onChange={(e) => setDay(Number(e.target.value))}
            />
          </div>
        </div>
        <textarea
          placeholder="자동차보험 특이사항 메모"
          className="w-full h-20 p-4 border border-grayscale-11 rounded-sm resize-none disabled:bg-grayscale-12 disabled:text-grayscale-6"
          disabled={!editable}
          onChange={(e) => setMemo(e.target.value)}
          value={memo}
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
              const newCar = { company, year, month, day, memo };
              onAddCar(newCar);
            }}
          />
        )}
        {action}
      </div>
    </div>
  );
};
