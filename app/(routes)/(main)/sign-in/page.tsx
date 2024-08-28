import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl py-4">로그인 화면</h1>
      <Link href="/sign-up">
        <p>회원가입</p>
      </Link>
    </main>
  );
}
