"use client";

import PrimaryButton from "@/app/_components/Button/button";
import GroupDialog from "@/app/_components/Dialog/group/group";
import GroupMemberDialog from "@/app/_components/Dialog/group/member";
import Dropdown from "@/app/_components/Dropdown";
import Icon from "@/app/_components/Icon";
import { Input, SearchField } from "@/app/_components/Text";
import { ClientDTO } from "@/app/_models/client";
import ManagementGroupModel, {
  ManagementGroupDTO,
} from "@/app/_models/managementGroup";
import cn from "@/app/_utils/cn";
import { ClientManagementGroupDao } from "@/app/_utils/database/dao/clientManagementGroupDao";
import { ManagementGroupDao } from "@/app/_utils/database/dao/managementGroupDao";
import useDialogStore from "@/app/_utils/dialog/store";
import { useEffect, useState } from "react";

export default function GroupManagementPage() {
  const openCustom = useDialogStore((state) => state.openCustom);
  const [groupData, setGroupData] = useState<
    Partial<ManagementGroupDTO>[] | null
  >(null);
  const [selectedGroup, setSelectedGroup] =
    useState<Partial<ManagementGroupDTO> | null>(null);
  const [selectedClients, setSelectedClients] = useState<Partial<
    ClientDTO[]
  > | null>(null);
  const [filteredClients, setFilteredClients] = useState<Partial<
    ClientDTO[]
  > | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const managementGroupDao = new ManagementGroupDao();
  const clientManagementGroupDao = new ClientManagementGroupDao();

  useEffect(() => {
    if (!groupData) {
      setupGroupData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupData, selectedGroup, filteredClients]);

  const setupGroupData = async () => {
    try {
      const managementGroups =
        await managementGroupDao.getAllManagementGroups();
      // const managementGroupDTOs = await Promise.all(
      //   managementGroups.map(async (group) => ({
      //     ...group.toDTO(),
      //     clients: (await group.getClients()).map(client => {
      //       return {
      //         ...client.toDTO(),//클라이언트 아이디를 각각 가져온다.
      //         id:client.id
      //       }
      //     })
      //   }))
      // );
      const managementGroupDTOs = managementGroups.map((group) =>
        group.toDTO()
      );
      setGroupData(managementGroupDTOs);
    } catch (error) {
      console.error(error);
    }
  };

  const addGroup = async () => {
    const groupName = await openCustom<string | undefined>(<GroupDialog />);
    if (!groupName) return;

    await managementGroupDao.insertManagementGroup(
      ManagementGroupModel.fromDTO({
        groupName: groupName,
      })
    );
    setupGroupData();
  };

  const editGroupName = async () => {
    const newName = await openCustom<string | undefined>(
      <GroupDialog groupName={selectedGroup?.groupName || ""} />
    );
    if (!newName) return;
    if (selectedGroup) {
      selectedGroup.groupName = newName;
      await managementGroupDao.updateManagementGroup(
        selectedGroup.id || -1,
        ManagementGroupModel.fromDTO(selectedGroup)
      );
      setupGroupData();
    }
  };

  const deleteGroup = async () => {
    if (selectedGroup) {
      await managementGroupDao.deleteManagementGroupTransaction(
        selectedGroup.id || -1
      );
      setupGroupData();
      setSelectedGroup(null);
    }
  };

  const addCustomer = async () => {
    const result: ClientDTO[] | undefined = await openCustom(
      <GroupMemberDialog />
    );
    if (!result) return;
    //고객의 아이디 목록을 뽑아서 추가
    if (selectedGroup) {
      const clientIds = result.map((client) => client.id || -1);
      await clientManagementGroupDao.addClientsToManagementGroup(
        selectedGroup?.id || -1,
        clientIds
      );

      // 수정된 그룹만 다시 조회
      const clientModelList = await ManagementGroupModel.fromDTO(
        selectedGroup
      ).getClients();
      const clientData = clientModelList.map((client) => {
        return {
          ...client.toDTO(), //클라이언트 아이디를 각각 가져온다.
          id: client.id,
        };
      });
      setSelectedClients(clientData);
      setFilteredClients(clientData);
      setSelectedGroup(selectedGroup);
    }
  };

  const deleteCustomer = async (id: number) => {
    if (id >= 0 && selectedGroup) {
      await clientManagementGroupDao.removeClientsFromManagementGroup(
        selectedGroup?.id || -1,
        [id]
      );

      // 수정된 그룹만 다시 조회
      const clientModelList = await ManagementGroupModel.fromDTO(
        selectedGroup
      ).getClients();
      const clientData = clientModelList.map((client) => {
        return {
          ...client.toDTO(), //클라이언트 아이디를 각각 가져온다.
          id: client.id,
        };
      });
      setSelectedClients(clientData);
      setFilteredClients(clientData);
      setSelectedGroup(selectedGroup);
    }
  };

  //그룹 선택
  const selectGroup = async (group: Partial<ManagementGroupDTO>) => {
    setSelectedGroup(group);
    const clientModelList = await ManagementGroupModel.fromDTO(
      group
    ).getClients();
    const clientData = clientModelList.map((client) => {
      return {
        ...client.toDTO(), //클라이언트 아이디를 각각 가져온다.
        id: client.id,
      };
    });
    setSelectedClients(clientData);
    setFilteredClients(clientData);
  };

  //서칭(고객)
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    if (selectedClients) {
      const filteredData = selectedClients.filter((client) =>
        client?.name?.includes(searchTerm)
      );
      setFilteredClients(filteredData);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto my-10">
      <h1 className="text-3xl font-normal">그룹 관리</h1>
      <div className="flex max-lg:flex-col gap-4 mt-8 max-lg:mt-4">
        <div className="flex flex-col lg:border-r max-lg:border-b max-lg:pb-4 border-grayscale-11 px-4">
          <PrimaryButton
            title="그룹 추가"
            color="primary"
            className="rounded font-normal text-lg"
            onClick={addGroup}
          />
          <ul className="mt-2 grid grid-cols-1 gap-2 max-lg:grid-cols-2">
            {(groupData || []).map((item) => (
              <li key={item.id}>
                <div
                  className={cn(
                    "px-4 py-3 rounded hover:bg-grayscale-12 truncate cursor-pointer",
                    selectedGroup?.id === item.id
                      ? "bg-grayscale-13 font-medium"
                      : "font-normal"
                  )}
                  onClick={() =>
                    selectedGroup?.id !== item.id && selectGroup(item)
                  }
                >
                  {item.groupName}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {selectedGroup ? (
            <div>
              <div className="flex items-center gap-4">
                <div className="flex-1 ">
                  <h2 className="text-2xl font-medium">
                    {selectedGroup.groupName}
                    <span className="ml-2 text-grayscale-6 text-xl font-normal">
                      ({selectedClients?.length || 0}명)
                    </span>
                  </h2>
                </div>
                <PrimaryButton
                  title="그룹명 변경"
                  color="primary"
                  className="w-28 h-12 rounded font-normal text-base max-lg:w-24 max-lg:h-10 max-lg:text-sm"
                  onClick={editGroupName}
                />
                <PrimaryButton
                  title="그룹 삭제"
                  color="primary"
                  className="w-28 h-12 rounded font-normal text-base max-lg:w-24 max-lg:h-10 max-lg:text-sm"
                  onClick={deleteGroup}
                />
              </div>
              <div className="flex mt-6 mb-4 items-center gap-4">
                <div className="flex-1">
                  <SearchField
                    placeholder="고객명을 검색하세요"
                    onSearch={handleSearch}
                    className="max-lg:h-12"
                  />
                </div>
                <PrimaryButton
                  title="고객 추가"
                  color="primary"
                  className="w-24 h-14 rounded font-normal text-base max-lg:h-12"
                  onClick={addCustomer}
                />
              </div>
              <ul className="text-lg font-normal">
                {(filteredClients || []).map((item) => (
                  <li
                    key={item?.id}
                    className="w-full p-3 rounded hover:bg-grayscale-12 justify-between flex items-center"
                  >
                    <span>{item?.name}</span>
                    <Icon
                      type="delete"
                      className="w-10 h-10 p-2 rounded hover:bg-sub-1 hover:bg-opacity-10 hover:fill-sub-1 cursor-pointer"
                      onClick={() => {
                        deleteCustomer(item?.id || -1);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-2xl">그룹를 선택하십시오.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
