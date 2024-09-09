"use client";

import { Button } from "@/app/_components/Button";
import { useRouter } from "next/navigation";

export default function InquiryDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const router = useRouter();
  return (
    <div className="flex flex-col w-full px-20 pt-10">
      <div className="w-full px-10 py-5 border border-grayscale-11 mb-4">
        <h1 className="text-2xl font-normal">
          안녕하세요. 문의 드립니다 {id}{" "}
        </h1>
        <p className="py-4">
          답변완료 <br />
          2024-00-00 <br />
        </p>
        <p className="whitespace-pre-line text-grayscale-6">문의 드립니다</p>
      </div>
      <div className="w-full px-10 py-5 border border-grayscale-11 mb-4">
        <h1 className="text-2xl font-normal">답변 드립니다</h1>
        <p className="py-4">
          2024-00-00 <br />
        </p>
        <p className="whitespace-pre-line text-grayscale-6">답변 블라블라</p>
      </div>
      <div>
        <Button
          title="이전"
          color="primary"
          className="w-[100px]"
          onClick={router.back}
        />
      </div>
    </div>
  );
}
