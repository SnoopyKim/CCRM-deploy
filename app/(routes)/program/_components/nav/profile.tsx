"use client";

import OutlineButton from "@/app/_components/Button/outline";
import useAuthStore from "@/app/_utils/auth/store";
import useDialogStore from "@/app/_utils/dialog/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { openConfirm, openAlert } = useDialogStore();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleSignout = async () => {
    const result = await openConfirm({
      title: "로그아웃",
      description: "정말 로그아웃 하시겠습니까?",
    });
    if (result) {
      logout();
      await openAlert({
        title: "로그아웃 완료",
        description: "로그인 페이지로 이동합니다",
      });
      router.push("/sign-in");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-6">
      <div className="flex items-center">
        <Image
          src="/images/program/avatar-default.svg"
          width={56}
          height={56}
          alt=""
        />
        <span className="ml-2">{user?.name ?? "-"} 님</span>
      </div>
      <p className="mt-2">잔여일 : 60일 [결제]</p>
      <div className="flex justify-center gap-2 pt-6">
        <OutlineButton
          href="/my-page"
          title="마이페이지"
          className="text-sm leading-normal"
        />
        <OutlineButton
          title="로그아웃"
          className="text-sm leading-normal"
          onClick={handleSignout}
        />
      </div>
    </div>
  );
}
