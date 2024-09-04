import { LinkButton } from "@/app/_components/Button";
import Link from "next/link";
import GoogleSignUp from "./_components/google";
import Icon from "@/app/_components/Icon";

export default function SignUpPage() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-5rem)] items-center justify-center">
      <Icon type="logo" className="w-48 fill-main-1" />
      <div className="flex flex-col w-[400px] mt-16 items-stretch gap-2">
        <LinkButton
          href="/sign-up/terms"
          title="이메일 회원가입"
          className="w-full"
        />
        <GoogleSignUp />
      </div>
      <div className="flex flex-row justify-center mt-4">
        <span className=" text-grayscale-6">이미 회원이신가요?</span>
        <Link
          href="/sign-in"
          replace
          className="ml-2  text-grayscale-6 underline underline-offset-2"
        >
          로그인
        </Link>
      </div>
    </main>
  );
}
