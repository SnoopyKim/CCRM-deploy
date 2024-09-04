"use client";

import { Button } from "@/app/_components/Button";
import { useRouter } from "next/navigation";

export default function NoticeDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const router = useRouter();

  return (
    <>
      <div className="w-full px-10 py-5 border border-grayscale-11 mb-4">
        <h1 className="text-[28px]">제목 {id} : PC화면 정상화 공지 안내</h1>
        <p className="py-4">
          카테고리 : {"업데이트"}
          <br />
          번호 : {id}
          <br />
          작성일 : {"2024-00-00"}
          <br />
          작성자 : {"관리자"}
        </p>
        <p className="whitespace-pre-line text-grayscale-6">{content}</p>
      </div>
      <div>
        <Button
          title="이전"
          color="primary"
          className="w-[100px]"
          onClick={router.back}
        />
      </div>
    </>
  );
}

const content = `5월 2일 보케어 pc화면 디자인이 일시적으로 깨져 보이는 현상\n정상화 되었습니다.\n\n불편드려 죄송합니다. \n\n새로고침 Ctrl + Shift + R 키 누르시면 적용됩니다. \n\n문의사항 1566-4875`;
