import Link from "next/link";

export default function ProgramNotFound() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-5xl">알 수 없는 페이지</h1>
      <Link
        href="/program"
        className="mt-2 text-grayscale-6 underline underline-offset-2"
      >
        프로그램 메인으로
      </Link>
    </div>
  );
}
