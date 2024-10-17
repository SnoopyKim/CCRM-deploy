"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import AddButton from "./add-button";
import FormContainer from "./form-container";
import AddInsuranceDialog from "@/app/_components/Dialog/customer/insurance";

export default function InsuranceForm() {
  const openCustom = useDialogStore((state) => state.openCustom);

  const openInsuranceDialog = async () => {
    const data = await openCustom<any>(<AddInsuranceDialog />);
    if (!data) return;
  };

  return (
    <FormContainer
      icon="folderOutline"
      title="보험 내역"
      actionComponent={<AddButton onAdd={openInsuranceDialog} />}
    >
      <div className="flex justify-center items-center">
        등록된 데이터가 없습니다
      </div>
    </FormContainer>
  );
}
