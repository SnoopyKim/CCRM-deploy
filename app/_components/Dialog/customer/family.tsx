"use client";

import { useEffect, useState } from "react";
import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import { Select } from "../../Select";
import { SearchField } from "../../Text";
import { ClientDTO, Family } from "@/app/_models/client";
import { ClientDao } from "@/app/_utils/database/dao/clientDao";

export default function AddFamilyDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const [allFamilyData, setAllFamilyData] = useState<Family[] | null>(null);
  const [familyData, setFamilyData] = useState<Family[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!allFamilyData) {
      const clientDao = new ClientDao();

      const fetchData = async () => {
        try {
          const clientDatas = await clientDao.getAllClients();
          const allFamilyData = clientDatas.map((client) => ({
            id: client.id!,
            name: client.name!,
            phone: client.contactNumber!,
            relation: "부모",
          }));
          setAllFamilyData(allFamilyData);
          setFamilyData(allFamilyData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [allFamilyData]);

  // 검색어에 따라 familyData를 필터링하는 함수
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    if (allFamilyData) {
      const filteredData = allFamilyData.filter(
        (family) =>
          family.name?.includes(searchTerm) ||
          family.phone?.includes(searchTerm)
      );
      setFamilyData(filteredData);
    }
  };

  const handleRelationChange = (id: number, value: string) => {
    if (familyData) {
      setFamilyData((prev) =>
        (prev || []).map((item) =>
          item.id === id ? { ...item, relation: value } : item
        )
      );
    }
  };

  const onAdd = () => {
    if (familyData) {
      const selectedFamily = familyData.filter((family) => {
        const checkbox = document.querySelector<HTMLInputElement>(
          `#p_check${family.id}`
        );
        return checkbox?.checked;
      });

      // 선택된 가족 데이터를 부모 컴포넌트로 전달
      closeDialog?.(selectedFamily);
    }
  };

  return (
    <div className="flex flex-col w-[720px] items-stretch p-8 gap-6">
      <h1 className="text-2xl font-medium">가족 등록: 고객 선택</h1>
      <SearchField
        placeholder="이름, 연락처를 입력하세요"
        onSearch={handleSearch}
      />
      <table className="w-full">
        <thead>
          <tr className="table w-full table-fixed bg-grayscale-13 border-b border-grayscale-11">
            <th className="text-left w-12 p-4"></th>
            <th className="py-2 text-left font-normal">고객명</th>
            <th className="text-left font-normal">연락처</th>
            <th className="text-left font-normal">관계</th>
          </tr>
        </thead>
        <tbody className="block max-h-64 overflow-y-scroll">
          {(familyData || []).map((item) => (
            <tr
              key={item.id}
              className="table w-full table-fixed border-b border-grayscale-11"
            >
              <td className="w-12 p-4">
                <input
                  type="checkbox"
                  name="p_check"
                  id={`p_check${item.id}`}
                />
              </td>
              <td className="font-semibold">{item.name}</td>
              <td>{item.phone}</td>
              <td>
                <Select
                  options={[
                    { value: "부모", text: "부모" },
                    { value: "자녀", text: "자녀" },
                    { value: "형제/자매", text: "형제/자매" },
                  ]}
                  className="h-12 py-3"
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    handleRelationChange(item.id, event.target.value)
                  }
                />
              </td>
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
