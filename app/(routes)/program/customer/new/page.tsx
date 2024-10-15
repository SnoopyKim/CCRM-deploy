"use client";

import { useRouter } from "next/navigation";
import InfoForm from "../_components/info-form";
import useDialogStore from "@/app/_utils/dialog/store";

export default function NewCustomerPage() {
  const router = useRouter();
  const openAlert = useDialogStore((state) => state.openAlert);
  const onSubmit = async () => {
    await openAlert({
      title: "고객 정보 추가 완료",
      description: "고객 정보 관리 화면으로 이동합니다",
    });
    router.replace("/program/customer/edit");
  };
  return (
    <div className="w-full p-6">
      <div className="flex gap-4">
        <div className="flex flex-col gap-6 w-1/2">
          <h2 className="text-2xl font-medium">고객 기본 정보</h2>
          <InfoForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
