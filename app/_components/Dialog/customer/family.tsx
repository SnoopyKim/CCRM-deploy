"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import { Select } from "../../Select";
import { SearchField } from "../../Text";

const mockFamily = [
  {
    name: "고객1",
    phone: "010-1234-5678",
  },
  {
    name: "고객2",
    phone: "010-1234-5678",
  },
];

export default function AddFamilyDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const onAdd = () => {
    closeDialog?.();
  };

  return (
    <div className="flex flex-col w-[720px] items-stretch p-8 gap-6">
      <h1 className="text-2xl font-medium">가족 등록: 고객 선택</h1>
      <SearchField
        placeholder="이름, 연락처를 입력하세요"
        onSearch={() => {}}
      />
      <table className="w-full">
        <colgroup>
          <col width="60px" />
          <col width="*" />
          <col width="*" />
          <col width="120px" />
        </colgroup>

        <thead>
          <tr className="bg-grayscale-13 border-b border-grayscale-11">
            <th className="py-3">
              <input type="checkbox" name="all_select" id="all_select" />
            </th>
            <th className="text-left font-normal">고객명</th>
            <th className="text-left font-normal">연락처</th>
            <th className="text-left font-normal">관계</th>
          </tr>
        </thead>
        <tbody>
          {mockFamily.map((item) => (
            <tr key={item.name} className="border-b border-grayscale-11">
              <td className="py-4">
                <div className="flex justify-center">
                  <input type="checkbox" name="p_check" id="p_check1" />
                </div>
              </td>
              <td className="font-semibold">{item.name}</td>
              <td>{item.phone}</td>
              <Select
                options={[
                  { value: "부모", text: "부모" },
                  { value: "자녀", text: "자녀" },
                  { value: "형제/자매", text: "형제/자매" },
                ]}
              />
            </tr>
          ))}
        </tbody>
      </table>

      <PrimaryButton
        color="primary"
        title="추가하기"
        className="w-full text-lg font-medium"
        onClick={onAdd}
      />
    </div>
  );
}
