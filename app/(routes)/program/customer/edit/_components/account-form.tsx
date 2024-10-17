import Icon from "@/app/_components/Icon";
import AddButton from "./add-button";
import useDialogStore from "@/app/_utils/dialog/store";
import { useState } from "react";
import AddAccountDialog from "@/app/_components/Dialog/customer/account";
import FormContainer from "./form-container";

const mockAccount = [
  {
    name: "기업은행",
    number: "0000-0000-0000",
  },
  {
    name: "신한은행",
    number: "0000-0000-0000",
  },
];

export default function AccountForm() {
  const openCustom = useDialogStore((state) => state.openCustom);
  const [accountList, setAccountList] = useState(mockAccount);

  const openNewAccountDialog = async () => {
    const data = await openCustom<any>(<AddAccountDialog />);

    if (data) {
      setAccountList([...accountList, data]);
    }
  };

  return (
    <FormContainer
      icon="bank"
      title="계좌 정보"
      actionComponent={<AddButton onAdd={openNewAccountDialog} />}
    >
      {accountList.map((item) => (
        <div key={item.name} className="flex gap-4 items-center ">
          <div className="flex-1 font-semibold">{item.name}</div>
          <div className="flex-1">{item.number}</div>
          <div className="border border-grayscale-11 rounded-sm">
            <Icon type="delete" className="fill-grayscale-9" />
          </div>
        </div>
      ))}
    </FormContainer>
  );
}
