"use client";

import { Button } from "@/app/_components/Button";
import NoticeModel, { NoticeCategory } from "@/app/_models/notice";
import { getNotice } from "@/app/_services/notice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NoticeDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const router = useRouter();
  const [notice, setNotice] = useState<NoticeModel>();
  useEffect(() => {
    const fetchNotice = async () => {
      const { data, error } = await getNotice(params.id);
      if (error) {
        console.error(error);
        return;
      }
      setNotice(data!);
    };

    fetchNotice();
  }, [params.id]);

  if (!notice) {
    return <div></div>;
  }

  return (
    <>
      <div className="w-full px-10 py-5 border border-grayscale-11 mb-4">
        <h1 className="text-[28px]">{notice.title}</h1>
        <p className="py-4">
          카테고리 : {NoticeCategory[notice.category]}
          <br />
          번호 : {notice.id}
          <br />
          작성일 : {notice.updatedAt.toISOString().split("T")[0]}
          <br />
          작성자 : {"ㄱㄷ"}
        </p>
        <p className="whitespace-pre-line text-grayscale-6">{notice.content}</p>
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
