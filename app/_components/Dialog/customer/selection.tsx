"use client";

import { useEffect, useState } from "react";
import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import { Select } from "../../Select";
import { SearchField } from "../../Text";
import ClientModel from "@/app/_models/client";
import { ClientDao } from "@/app/_utils/database/dao/clientDao";

export default function CustomerSelectionDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const [customers, setCustomers] = useState<ClientModel[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!customers) {
      const clientDao = new ClientDao();

      const fetchData = async () => {
        try {
          const customerData = await clientDao.getAllClients();
          setCustomers(customerData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [customers]);

  return (
    <div className="flex flex-col w-[720px] items-stretch p-8 gap-6">
      <h1 className="text-2xl font-medium">고객 선택</h1>
      <SearchField
        placeholder="이름, 연락처를 입력하세요"
        onSearch={setSearchTerm}
      />
      <table className="w-full">
        <thead>
          <tr className="table w-full table-fixed bg-grayscale-13 border-b border-grayscale-11">
            <th className="text-left font-normal px-3 py-2">고객명</th>
            <th className="text-left font-normal">연락처</th>
            <th className="text-left font-normal"></th>
          </tr>
        </thead>
        <tbody className="block max-h-64 overflow-y-scroll">
          {(customers || [])
            .filter(
              (customer) =>
                customer.name?.includes(searchTerm) ||
                customer.contactNumber?.includes(searchTerm)
            )
            .map((item) => (
              <tr
                key={item.id}
                className="table w-full table-fixed border-b border-grayscale-11"
              >
                <td className="font-semibold px-3">{item.name}</td>
                <td>{item.contactNumber}</td>
                <td className="text-right pr-3 py-2">
                  <PrimaryButton
                    color="primary"
                    title="선택"
                    className="w-20 h-10 py-2 text-base font-normal"
                    onClick={() => closeDialog?.(item)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <PrimaryButton
        color="gray"
        title="닫기"
        className="w-full text-lg font-medium"
        onClick={() => closeDialog?.()}
      />
    </div>
  );
}
