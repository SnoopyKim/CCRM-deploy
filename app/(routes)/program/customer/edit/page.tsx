"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PrimaryButton from "@/app/_components/Button/button";
import ColorButton from "../_components/color-button";
import InfoForm from "../_components/info-form";
import FamilyForm from "./_components/family-form";
import AccountForm from "./_components/account-form";
import CustomerFileForm from "./_components/customer-file-form";
import MemoForm from "./_components/memo-form";
import HospitalHistory from "./_components/hospital-history";
import InsuranceForm from "./_components/insurance-form";
import CarForm from "./_components/car-form";
import FireForm from "./_components/fire-form";
import WaiverForm from "./_components/waiver-form";

import { ClientDao } from "@utils/database/dao/clientDao";
import ClientModel, { ClientDTO } from "@/app/_models/client";
import useDialogStore from "@/app/_utils/dialog/store";
import { downloadDatabase } from "@utils/database/getDatabase";

export default function CustomerEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientIdParam = searchParams.get("id");
  const clientId = clientIdParam ? parseInt(clientIdParam) : -1;
  
  const openAlert = useDialogStore((state) => state.openAlert);
  
  const [formData, setFormData] = useState<Partial<ClientDTO> | null>(null);

  useEffect(() => {
    if (!formData){
      const clientDao = new ClientDao(); 

      //데이터가 이상하면 404
      if (!clientId || isNaN(clientId)) {
        router.push("/program/404");
        return;
      }

      const fetchData = async () => {
        try {
          const clientData = await clientDao.getClient(clientId);
          console.log(clientData);
          if (!clientData) {
            router.push("/program/404");
          } else {
            setFormData(clientData.toDTO()); 
          }
        } catch (error) {
          console.error(error);
          router.push("/program/404");
        }
      };

      fetchData();
    }
    console.log(formData);
  }, [searchParams, router, formData, clientId]);

  const handleSave = async () => {
    console.log(formData);
    if (clientId>=0 && formData) {
      const clientDao = new ClientDao(); 
      await clientDao.updateClient(clientId,ClientModel.fromDTO(formData));
      console.log("저장:", formData);
      
      await openAlert({
        title: "고객 정보 추가 완료",
        description: "고객 정보 관리 화면으로 이동합니다",
      });

      router.replace("/program/customer");

    }

  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-6">
      <div className="flex justify-end gap-4 font-normal">
        <PrimaryButton
          color="secondary"
          title="저장"
          className="w-36 text-lg"
          onClick={handleSave}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-6 w-1/2">
          <h2 className="text-2xl font-medium">고객 기본 정보</h2>
          <InfoForm onSubmit={null} formData={formData} setFormData={setFormData}  /> 
          <FamilyForm formData={formData} setFormData={setFormData}  /> 
        </div>
        <div className="flex flex-col gap-6 w-1/2">
          <h2 className="text-2xl font-medium">보험 및 기타정보</h2>
          <AccountForm formData={formData} setFormData={setFormData}  /> 
          <CustomerFileForm formData={formData} setFormData={setFormData}  /> 
          <MemoForm formData={formData} setFormData={setFormData}  /> 
          {/* 
          <h1 className="text-xl font-normal">보험정보</h1>
          <HospitalHistory />
          <InsuranceForm />
          */}
          <CarForm formData={formData} setFormData={setFormData}  /> 
          <FireForm formData={formData} setFormData={setFormData}  /> 
          <WaiverForm formData={formData} setFormData={setFormData}  /> 
        </div>
      </div>
    </div>
  );
}