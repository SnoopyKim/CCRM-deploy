"use client";

import { useRouter } from "next/navigation";
import { Modal } from "../../modal";
import { Button } from "@/app/_components/Button";

export default function PurchaseModal() {
  const router = useRouter();
  return (
    <Modal>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl">업데이트 예정</h1>
        <p className="flex-1 mt-4 mb-6">
          해당 기능/페이지는 추후에 업데이트될 예정입니다
        </p>
        <Button
          title="확인"
          onClick={() => router.back()}
          className="w-full h-[40px]"
        />
      </div>
    </Modal>
  );
}
