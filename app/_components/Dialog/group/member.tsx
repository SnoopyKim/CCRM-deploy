"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import { SearchField, TextField } from "../../Text";
import TextLabel from "../../Text/label";
import { CheckBox } from "../../CheckBox";
import { useEffect, useState } from "react";
import ClientModel, { ClientDTO } from "@/app/_models/client";
import { ClientDao } from "@/app/_utils/database/dao/clientDao";

export default function GroupMemberDialog() {
  const [allClientData, setAllClientData] = useState<ClientDTO[] | null>(null);
  const [clientData, setClientData] = useState<ClientDTO[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!allClientData) {
      const clientDao = new ClientDao();

      const fetchData = async () => {
        try {
          const clientDatas = await clientDao.getAllClients();
          const allClientData = await Promise.all(
            clientDatas.map(async (client) => ({
              id: client.id!,
              name: client.name!,
              phone: client.contactNumber!,
              checked: false,
              groupString: await client.getManagementGroupsString(),
            }))
          );
          setAllClientData(allClientData);
          setClientData(allClientData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [allClientData]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    if (allClientData) {
      const filteredData = allClientData.filter(
        (client) =>
          client.name?.includes(searchTerm) ||
          client.phone?.includes(searchTerm)
      );
      setClientData(filteredData);
    }
  };

  const addGroupMember = () => {
    const selectedClientData = (clientData || []).filter(
      (client) => client.checked
    );
    closeDialog(selectedClientData);
  };

  const handleCheckboxChange = (id: number) => {
    setClientData((prevClientData) =>
      (prevClientData || []).map((client) =>
        client.id === id ? { ...client, checked: !client.checked } : client
      )
    );
  };

  const closeDialog = useDialogStore((state) => state.closeDialog);

  return (
    <div className="flex flex-col w-[640px] max-md:w-96 gap-4">
      <div className="px-6 py-4 border-b border-b-grayscale-11">
        <h2 className="text-xl font-normal">그룹 고객 추가</h2>
      </div>
      <div className="px-6">
        <SearchField
          placeholder="고객명을 검색하세요"
          onSearch={handleSearch}
        />
      </div>
      <div className="px-6">
        <table className="w-full ">
          <thead>
            <tr className="table w-full table-fixed bg-grayscale-12">
              <th className="text-left  w-12"></th>
              <th className="py-2 text-left">
                <span>고객명</span>
              </th>
              <th className="text-left">
                <span>연락처</span>
              </th>
              <th className="text-left">
                <span>그룹</span>
              </th>
            </tr>
          </thead>
          <tbody className="block max-h-64 overflow-y-scroll">
            {(clientData || []).map((customer) => (
              <tr key={customer.name} className="table w-full table-fixed">
                <td className="p-2 w-12">
                  <CheckBox
                    name={customer?.id?.toString() || ""}
                    checked={customer.checked}
                    onChecked={() => handleCheckboxChange(customer.id!)}
                  />
                </td>
                <td className="">{customer?.name || ""}</td>
                <td className="">{customer?.phone || ""}</td>
                <td className="">{customer?.groupString || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between px-6 pb-6">
        <PrimaryButton
          title="취소"
          color="gray"
          className="w-20 h-10 rounded text-base"
          onClick={() => closeDialog(null)}
        />
        <PrimaryButton
          title="추가"
          color="primary"
          className="w-20 h-10 rounded text-base"
          onClick={() => addGroupMember()}
        />
      </div>
    </div>
  );
}
