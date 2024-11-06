import Icon from "@/app/_components/Icon";
import Link from "next/link";
import LoginForm from "./_components/form";
import GoogleAuthButton from "./_components/google";
import CallbackResult from "./_components/callback-result";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <main className="flex flex-col w-[400px] mt-20 m-auto items-center">
      <Icon type="logo" className="w-48 fill-main-1 mb-12" />
      <Suspense fallback={<></>}>
        <CallbackResult />
      </Suspense>
      <LoginForm />
      <div className="w-full mt-4">
        <GoogleAuthButton>구글로 로그인 / 회원가입</GoogleAuthButton>
      </div>
      {/* <Link
        href="/find-password"
        className="mt-8 text-grayscale-6 underline underline-offset-2"
      >
        아이디 • 비밀번호 찾기
      </Link>
      <Link
        href="/sign-up"
        className="mt-4 text-grayscale-6 underline underline-offset-2"
      >
        회원가입
      </Link> */}
    </main>
  );
}
