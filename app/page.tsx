import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl py-4">홈 화면</h1>
      <Link href="/sign-in">로그인 화면</Link>
      <Link href="/service-center">고객센터 화면</Link>
    </main>
  );
}
