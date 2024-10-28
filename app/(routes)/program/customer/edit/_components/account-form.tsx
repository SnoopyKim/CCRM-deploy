"use client";

import Icon from "@/app/_components/Icon";
import AddButton from "./add-button";
import useDialogStore from "@/app/_utils/dialog/store";
import { useEffect, useState } from "react";
import AddAccountDialog from "@/app/_components/Dialog/customer/account";
import FormContainer from "./form-container";
import { Account, ClientDTO } from "@/app/_models/client";


export default function AccountForm({
  formData, 
  setFormData,
}: {
  formData: Partial<ClientDTO> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ClientDTO> | null>>;
}) {
  const openCustom = useDialogStore((state) => state.openCustom);

  // bankAccountInfo를 formData에서 가져오기
  const accountList = formData?.bankAccountInfo || [];

  const openNewAccountDialog = async () => {
    const newAccount = await openCustom<any>(<AddAccountDialog />);
  
    if (newAccount) {
      const nextId =
        accountList.length > 0
          ? Math.max(...accountList.map((acc: Account) => acc.id)) + 1
          : 0;

      const updatedAccountList = [
        ...accountList, 
        { id: nextId, name: newAccount.name, number: newAccount.number, isPrimary: newAccount.isPrimary }, 
      ];

      // bankAccountInfo 업데이트
      setFormData((prevFormData) => ({
        ...prevFormData,
        bankAccountInfo: updatedAccountList,
      }));
    }
  };

  return (
    <FormContainer
      icon="bank"
      title="계좌 정보"
      actionComponent={<AddButton onAdd={openNewAccountDialog} />}
    >
      <div className="border border-grayscale-11 rounded-sm p-4 space-y-2">
        {(accountList||[]).map((item: Account) => (
          <div key={item.id} className="flex gap-4 items-center ">
            <div className="flex-1 font-semibold">{item.name}</div>
            <div className="flex-1">{item.number}</div>
            <div className="border border-grayscale-11 rounded-sm">
              <Icon
                type="delete"
                className="fill-grayscale-9 cursor-pointer"
                onClick={() =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    bankAccountInfo: accountList.filter((acc: Account) => acc.id !== item.id),
                  }))
                }
              />
            </div>
          </div>
        ))}
      </div>
    </FormContainer>
  );
}