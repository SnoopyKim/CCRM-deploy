"use client";

import { OutlineButton } from "@/app/_components/Button";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();

  const handleSignout = () => {
    // TODO: SIGNOUT LOGIC
    alert("로그아웃 되었습니다. 메인화면으로 돌아갑니다.");
    router.push("/");
  };

  return (
    <OutlineButton
      title="로그아웃"
      className="text-sm leading-normal"
      onClick={handleSignout}
    />
  );
}
