import Link from "next/link";

export default function MainNotFound({
  params,
}: {
  params: {
    anyNotFound: string[];
  };
}) {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <h2 className="text-5xl">알 수 없는 페이지</h2>
      <p className="py-4">알 수 없는 페이지 입니다.</p>
    </div>
  );
}
