"use client";

import { useState } from "react";
import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import { Select } from "../../Select";
import { Input } from "../../Text";
import { CheckBox } from "../../CheckBox";

const mockBank = ["국민은행", "우리은행", "신한은행", "기업은행", "하나은행"];

export default function AddAccountDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const [selectedBank, setSelectedBank] = useState(mockBank[0]);
  const [accountNumber, setAccountNumber] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

  const onAdd = () => {
    const newAccount = {
      name: selectedBank,
      number: accountNumber,
      isPrimary: isPrimary,
    };
    closeDialog?.(newAccount);
  };

  return (
    <div className="flex flex-col md:w-[720px] items-stretch p-8 gap-6">
      <h1 className="text-2xl font-medium">계좌정보 등록</h1>
      <CheckBox
        label="자주 사용하는 계좌"
        name="is_use"
        checked={isPrimary}
        onChecked={() => setIsPrimary(!isPrimary)}
      />
      <Select
        placeholder="은행선택"
        options={mockBank.map((item) => ({ text: item, value: item }))}
        value={selectedBank}
        onChange={(event) => setSelectedBank(event.target.value)}
      />
      <Input
        placeholder="계좌번호를 입력하세요."
        value={accountNumber}
        onChange={(event) => setAccountNumber(event.target.value)}
      />
      <PrimaryButton
        color="primary"
        title="추가하기"
        className="w-full text-lg font-medium"
        onClick={onAdd}
      />
    </div>
  );
}
