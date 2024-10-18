"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function KakaotalkPage() {
  const router = useRouter();
  const openAlert = useDialogStore((state) => state.openAlert);

  useEffect(() => {
    openAlert({
      title: "업데이트 예정",
      description: "메세지 화면으로 이동합니다",
    }).then(() => {
      router.replace("/program/message");
    });
  }, []);

  return <div className="flex w-full justify-center items-center"></div>;
}
