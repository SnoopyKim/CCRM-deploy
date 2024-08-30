"use client";

import Link from "next/link";

export default function AuthButton() {
  const isSignedIn = false;
  const textStyle =
    "w-[120px] underline underline-offset-[3px] mx-4 text-center hover:text-sub-1";

  const signOut = () => {
    // TODO: sign out logic
    alert("로그아웃 되었습니다.");
  };

  return isSignedIn ? (
    <p className={`${textStyle} cursor-pointer`} onClick={signOut}>
      로그아웃
    </p>
  ) : (
    <Link href="/sign-in" className={textStyle}>
      로그인 / 회원가입
    </Link>
  );
}
