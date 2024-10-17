"use client";

import { useState } from "react";
import AddButton from "./add-button";
import FormContainer from "./form-container";
import useDialogStore from "@/app/_utils/dialog/store";
import AddHosiptalHistoryDialog from "@/app/_components/Dialog/customer/hospital-history";

export default function HospitalHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const openCustom = useDialogStore((state) => state.openCustom);

  const addHistory = async () => {
    const data = await openCustom<string>(<AddHosiptalHistoryDialog />);
    if (!data) return;
    setHistory([...history, data]);
  };

  return (
    <FormContainer
      icon="folderOutline"
      title="병원 내역"
      actionComponent={<AddButton onAdd={addHistory} />}
    >
      {history.length > 0 ? (
        history.map((item, i) => (
          <div key={item} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-grayscale-6">
                병원 내역 ({i + 1})
              </span>
              <button
                className="text-main-1 border border-main-1 py-1 px-3 rounded-sm"
                onClick={() =>
                  setHistory(history.filter((_, index) => index !== i))
                }
              >
                삭제
              </button>
            </div>
            <div className="p-4 bg-grayscale-11 rounded-sm">
              <p className="font-normal text-grayscale-6">{item}</p>
            </div>
            <textarea
              placeholder="세부사항 메모(500자 제한)"
              className="h-20 p-4 border border-grayscale-11 rounded-sm resize-none"
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center">
          <p className="font-normal text-grayscale-6">등록된 파일이 없습니다</p>
        </div>
      )}
    </FormContainer>
  );
}
