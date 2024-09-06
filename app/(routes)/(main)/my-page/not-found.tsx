import Link from "next/link";

export default function MyPageNotFound() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <h2 className="text-5xl">알 수 없는 페이지</h2>
      <Link href="/my-page" className="py-4 underline underline-offset-2">
        마이페이지로
      </Link>
    </div>
  );
}
