"use client";

import Icon from "@/app/_components/Icon";
import AddButton from "./add-button";
import { Input } from "@/app/_components/Text";
import { Select } from "@/app/_components/Select";
import useDialogStore from "@/app/_utils/dialog/store";
import { useState } from "react";
import AddFamilyDialog from "@/app/_components/Dialog/customer/family";

const mockFamily = [
  {
    name: "테스트 고객",
    phone: "010-0000-0000",
    relation: "부모",
  },
  {
    name: "테스트 고객",
    phone: "010-0000-0000",
    relation: "형제/자매",
  },
];

export default function FamilyForm() {
  const openCustom = useDialogStore((state) => state.openCustom);
  const [familyList, setFamilyList] = useState(mockFamily);
  const [anniversaryList, setAnniversaryList] = useState<number[]>([]);

  const openAddFamilyDialog = async () => {
    const data = await openCustom<any>(<AddFamilyDialog />);

    if (data) {
      setFamilyList([...familyList, data]);
    }
  };

  return (
    <div className="flex flex-col bg-grayscale-13 p-6 gap-4">
      <div className="text-xl font-normal">가족 및 일정 등록</div>
      <div className="flex flex-col border border-grayscale-11 p-4 rounded-sm gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center font-medium text-grayscale-5">
            <Icon type="accountPlus" className="w-6 h-6 fill-grayscale-6" />
            가족
          </div>
          <AddButton onAdd={openAddFamilyDialog} />
        </div>
        <div className="border border-grayscale-11 rounded-sm p-4 space-y-2">
          {mockFamily.map((item) => (
            <div key={item.name} className="flex gap-4 items-center ">
              <div className="flex-1 font-semibold">{item.name}</div>
              <div className="flex-1">{item.phone}</div>
              <div className="flex flex-1 justify-end font-semibold">
                {item.relation}
              </div>
              <div className="border border-grayscale-11 rounded-sm">
                <Icon type="delete" className="fill-grayscale-9" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col border border-grayscale-11 p-4 rounded-sm gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center font-medium text-grayscale-5">
            <Icon type="heart" className="w-5 h-5 fill-grayscale-6" />
            기념일
          </div>
        </div>
        <div className="border border-grayscale-11 rounded-sm p-4 space-y-2">
          {anniversaryList.map((item) => (
            <div key={item} className="flex gap-4 items-center ">
              <input
                type="text"
                placeholder="기념일 명"
                className="flex-1 border border-grayscale-11 rounded-sm px-4 py-2 h-10"
              />
              <div className="flex-1">
                <Select
                  options={Array.from({ length: 12 }, (_, i) => ({
                    value: String(i + 1),
                    text: `${i + 1}월`,
                  }))}
                  className="px-4 py-2 h-10"
                />
              </div>
              <div className="flex-1">
                <Select
                  options={Array.from({ length: 31 }, (_, i) => ({
                    value: String(i + 1),
                    text: `${i + 1}일`,
                  }))}
                  className="px-4 py-2 h-10"
                />
              </div>
              <button
                type="button"
                className="bg-grayscale-14 text-main-1 border border-main-1 px-4 py-1 rounded "
                onClick={() =>
                  setAnniversaryList(anniversaryList.filter((i) => i !== item))
                }
              >
                삭제
              </button>
            </div>
          ))}
          <div className="flex gap-4 items-center ">
            <input
              type="text"
              placeholder="기념일 명"
              className="flex-1 border border-grayscale-11 rounded-sm px-4 py-2 h-10"
            />
            <div className="flex-1">
              <Select
                options={Array.from({ length: 12 }, (_, i) => ({
                  value: String(i + 1),
                  text: `${i + 1}월`,
                }))}
                className="px-4 py-2 h-10"
              />
            </div>
            <div className="flex-1">
              <Select
                options={Array.from({ length: 31 }, (_, i) => ({
                  value: String(i + 1),
                  text: `${i + 1}일`,
                }))}
                className="px-4 py-2 h-10"
              />
            </div>
            <AddButton
              onAdd={() => {
                setAnniversaryList([
                  ...anniversaryList,
                  anniversaryList.length,
                ]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
