import { ClientDTO } from "@/app/_models/client";
import { useEffect } from "react";

export default function MemoForm({
  formData, 
  setFormData,
}: {
  formData: Partial<ClientDTO> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ClientDTO> | null>>;
}) {
  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      notes: value, 
    }));
  };

  return (
    <div className="flex flex-col bg-grayscale-13 p-4 rounded-sm gap-2">
      <div className="flex justify-between items-center font-medium text-grayscale-5">
        <div className="flex gap-2 items-center">메모 / 특이사항</div>
      </div>
      <textarea
        placeholder="고객 요청 및 특이사항 메모(4,000자 제한)"
        className="h-32 p-4 border border-grayscale-11 rounded-sm resize-none"
        value={formData?.notes || ""} 
        onChange={handleMemoChange} 
      />
    </div>
  );
}