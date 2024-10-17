"use client";

import { Select } from "@/app/_components/Select";
import FormContainer from "./form-container";
import AddButton from "./add-button";
import { useState } from "react";

export default function FireForm() {
  const [fires, setFires] = useState<any[]>([]);
  return (
    <FormContainer icon="folderOutline" title="화재보험 만기">
      <FireItem onAddFire={(fire) => setFires([...fires, fire])} />
      {fires.map((item, i) => (
        <FireItem
          key={i}
          fire={item}
          action={
            <button
              type="button"
              className="bg-grayscale-14 text-main-1 border border-main-1 px-4 py-1 rounded-sm"
              onClick={() => setFires(fires.filter((_, j) => j !== i))}
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
  fire,
  onAddFire,
  disabled = false,
  action,
}: {
  fire?: any;
  onAddFire?: (fire: any) => void;
  disabled?: boolean;
  action?: React.ReactNode;
}) => {
  const [editable, setEditable] = useState(!disabled);
  const [company, setCompany] = useState(fire?.company || "보험사 선택");
  const [year, setYear] = useState<number>(fire?.year || undefined);
  const [month, setMonth] = useState<number>(fire?.month || undefined);
  const [day, setDay] = useState<number>(fire?.day || undefined);

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
              const newFire = { company, year, month, day };
              onAddFire(newFire);
            }}
          />
        )}
        {action}
      </div>
    </div>
  );
};
