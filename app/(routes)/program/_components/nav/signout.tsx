"use client";

import { OutlineButton } from "@/app/_components/Button";
import { signOut } from "@/app/_services/auth";
import useDialogStore from "@/app/_utils/dialog/store";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();
  const { openConfirm, openAlert } = useDialogStore();

  const handleSignout = async () => {
    const result = await openConfirm({
      title: "로그아웃",
      description: "정말 로그아웃 하시겠습니까?",
    });
    if (result) {
      signOut();
      await openAlert({
        title: "로그아웃 완료",
        description: "로그인 페이지로 이동합니다",
      });
      router.push("/sign-in");
    }
  };

  return (
    <OutlineButton
      title="로그아웃"
      className="text-sm leading-normal"
      onClick={handleSignout}
    />
  );
}
