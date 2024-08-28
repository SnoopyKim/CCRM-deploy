import Link from "next/link";
import MainNav from "./(main)/_components/main-nav";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <h2 className="text-5xl">알 수 없는 페이지</h2>
      <p className="py-4">기본 알 수 없는 페이지 입니다.</p>
      <Link href="/" className="underline underline-offset-2 font-bold">
        메인 화면으로 가기
      </Link>
    </div>
  );
}
