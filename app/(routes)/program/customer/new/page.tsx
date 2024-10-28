"use client";

import { useRouter } from "next/navigation";
import InfoForm from "../_components/info-form";
import useDialogStore from "@/app/_utils/dialog/store";
import { ClientDao } from "@utils/database/dao/clientDao";
import ClientModel, { Anniversary, getBirthday, ClientDTO, getHalfBirthday } from "@/app/_models/client";
import { useState } from "react";

export default function NewCustomerPage() {
  const router = useRouter();
  const openAlert = useDialogStore((state) => state.openAlert);
  const clientDao = new ClientDao();

  // useState에서 기본값을 Partial<ClientDTO>로 설정
  const [formData, setFormData] = useState<Partial<ClientDTO|null>>({
    clientType: "관리 고객",
    driverLicense: "운전 유",
    contactNumber: {
      part1: "010",
      part2: "",
      part3: "",
    },
  });

  const onSubmit = async (formData: Partial<ClientDTO>) => {
    //첫 삽입에서 생일 및 상령일 추가
    const anniversary: Anniversary[] = [];

    // 생일 계산 후 추가
    const birthDate = formData.residentRegistrationNumber
    ? getBirthday(formData.residentRegistrationNumber)
    : null;
    if (birthDate) {
      anniversary.push({
        id: 0,
        name: "생일",
        month: birthDate.getMonth() + 1, // 월은 0부터 시작하므로 +1
        day: birthDate.getDate(),
      });
    }

    // 상령일 계산 후 추가
    const halfBirthday = formData.residentRegistrationNumber
      ? getHalfBirthday(formData.residentRegistrationNumber)
      : null;
    if (halfBirthday) {
      anniversary.push({
        id: 1,
        name: "상령일",
        month: halfBirthday.getMonth() + 1,
        day: halfBirthday.getDate(),
      });
    }

    await clientDao.insertClient(ClientModel.fromDTO({
      ...formData,
      anniversary,
    }));

    await openAlert({
      title: "고객 정보 추가 완료",
      description: "고객 정보 관리 화면으로 이동합니다",
    });

    router.replace("/program/customer");
  };

  return (
    <div className="w-full p-6">
      <div className="flex gap-4">
        <div className="flex flex-col gap-6 w-1/2">
          <h2 className="text-2xl font-medium">고객 기본 정보</h2>
          <InfoForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
}
