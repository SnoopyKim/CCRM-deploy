"use client";

import Icon from "@/app/_components/Icon";
import AddButton from "./add-button";
import { Input } from "@/app/_components/Text";
import { Select } from "@/app/_components/Select";
import useDialogStore from "@/app/_utils/dialog/store";
import { useEffect, useState } from "react";
import AddFamilyDialog from "@/app/_components/Dialog/customer/family";
import { Anniversary, ClientDTO, Family } from "@/app/_models/client";

export default function FamilyForm({
  formData,
  setFormData,
}: {
  formData: Partial<ClientDTO> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ClientDTO> | null>>;
}) {
  const openCustom = useDialogStore((state) => state.openCustom);

  const familyList = formData?.family || [];
  const anniversaryList = formData?.anniversary || [];

  useEffect(() => {
    if (!formData?.anniversary || formData?.anniversary?.length === 0) {
      setFormData((prev) => ({
        ...prev,
        anniversary: [{ id: 0, month: 1, day: 1, name: "" }],
      }));
    }
  }, [formData, setFormData]);

  const openAddFamilyDialog = async () => {
    const selectedFamily = await openCustom<any>(<AddFamilyDialog />);

    if (selectedFamily) {
      const filteredSelectedFamily = selectedFamily.filter(
        (newFamily: Family) =>
          !familyList.some(
            (existingFamily) => existingFamily.id === newFamily.id
          )
      );

      setFormData((prev) => ({
        ...prev,
        family: [...(prev?.family || []), ...filteredSelectedFamily],
      }));
    }
  };

  return (
    <div className="flex flex-col bg-grayscale-13 p-6 gap-4">
      <div className="text-xl font-normal">가족 및 일정 등록</div>

      {/* 가족 목록 */}
      <div className="flex flex-col border border-grayscale-11 p-4 rounded-sm gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center font-medium text-grayscale-5">
            <Icon type="accountPlus" className="w-6 h-6 fill-grayscale-6" />
            가족
          </div>
          <AddButton onAdd={openAddFamilyDialog} />
        </div>
        <div className="border border-grayscale-11 rounded-sm p-4 space-y-2">
          {familyList.map((item) => (
            <div key={item.id} className="flex gap-4 items-center ">
              <div className="flex-1 font-semibold">{item.name}</div>
              <div className="flex-1">{item.phone}</div>
              <div className="flex flex-1 justify-end font-semibold">
                {item.relation}
              </div>
              <div className="border border-grayscale-11 rounded-sm">
                <Icon
                  type="delete"
                  className="fill-grayscale-9 cursor-pointer"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      family: familyList.filter((fam) => fam.id !== item.id),
                    }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 기념일 목록 */}
      <div className="flex flex-col border border-grayscale-11 p-4 rounded-sm gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center font-medium text-grayscale-5">
            <Icon type="heart" className="w-5 h-5 fill-grayscale-6" />
            기념일
          </div>
        </div>
        <div className="border border-grayscale-11 rounded-sm p-4 space-y-2">
          {anniversaryList.map((item, index) => (
            <div
              key={item.id}
              className="flex max-lg:flex-col max-lg:items-stretch gap-4 max-lg:gap-2 items-center"
            >
              <input
                type="text"
                placeholder="기념일 명"
                value={item.name}
                className="flex-1 border border-grayscale-11 rounded-sm px-4 py-2 h-10"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    anniversary:
                      formData?.anniversary?.map((a) =>
                        a.id === item.id
                          ? { ...a, ["name"]: e.target.value }
                          : a
                      ) || [],
                  }))
                }
              />
              <div className="flex-1">
                <Select
                  options={Array.from({ length: 12 }, (_, i) => ({
                    value: i + 1,
                    text: `${i + 1}월`,
                  }))}
                  value={item.month}
                  className="px-4 py-2 h-10"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      anniversary:
                        formData?.anniversary?.map((a) =>
                          a.id === item.id
                            ? { ...a, ["month"]: Number(e.target.value) }
                            : a
                        ) || [],
                    }))
                  }
                />
              </div>
              <div className="flex-1">
                <Select
                  options={Array.from({ length: 31 }, (_, i) => ({
                    value: i + 1,
                    text: `${i + 1}일`,
                  }))}
                  value={item.day}
                  className="px-4 py-2 h-10"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      anniversary:
                        formData?.anniversary?.map((a) =>
                          a.id === item.id
                            ? { ...a, ["day"]: Number(e.target.value) }
                            : a
                        ) || [],
                    }))
                  }
                />
              </div>
              {index === anniversaryList.length - 1 ? (
                // 마지막 값은 추가 버튼
                <AddButton
                  onAdd={() => {
                    setFormData((prev) => ({
                      ...prev,
                      anniversary: [
                        ...(prev?.anniversary || []),
                        {
                          id:
                            anniversaryList.length > 0
                              ? Math.max(
                                  ...anniversaryList.map((item) => item.id)
                                ) + 1
                              : 0,
                          name: "",
                          month: 1,
                          day: 1,
                        },
                      ],
                    }));
                  }}
                />
              ) : (
                // 마지막 요소가 아닌 경우 삭제 버튼
                <button
                  type="button"
                  className="bg-grayscale-14 text-main-1 border border-main-1 px-4 py-1 rounded"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      anniversary: anniversaryList.filter(
                        (i) => i.id !== item.id
                      ),
                    }))
                  }
                >
                  삭제
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
