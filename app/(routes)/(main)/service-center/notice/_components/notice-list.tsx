"use client";

import CategoryBadge from "@/app/_components/Badge/category";
import Pagination from "@/app/_components/Pagination";
import NoticeModel, { NoticeCategory } from "@/app/_models/notice";
import PageList from "@/app/_models/page-list";
import { getNotices } from "@/app/_services/notice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NoticeList() {
  const searchParams = useSearchParams();
  const pageNum: number = Number(searchParams.get("page") ?? "1");

  const [notices, setNotices] = useState<PageList<NoticeModel>>();

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await getNotices(pageNum);
      if (error) {
        console.error(error);
        return;
      }
      setNotices(data!);
    };

    fetchNotices();
  }, [pageNum]);

  return (
    <div className="mt-10">
      <table className="w-full">
        <thead>
          <tr className="bg-main-2 text-grayscale-14 h-12 divide-x divide-grayscale-11">
            <th className="w-[100px]">카테고리</th>
            <th className="pl-4 text-start">제목</th>
            <th className="w-[100px]">작성일</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-grayscale-11">
          {(notices?.data ?? []).map((notice, _) => (
            <tr key={notice.id} className="h-12">
              <td className="text-center">
                <CategoryBadge
                  color={notice.category === "notice" ? "main" : "sub"}
                >
                  {NoticeCategory[notice.category] ?? "공지사항"}
                </CategoryBadge>
              </td>
              <td className="pl-4">
                <Link
                  href={`/service-center/notice/${notice.id}`}
                  className="flex"
                >
                  {notice.title}
                </Link>
              </td>
              <td className="text-center text-sm text-grayscale-6">
                {notice.updatedAt.toISOString().split("T")[0]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalCount={notices?.total ?? 0} currentPage={pageNum} />
    </div>
  );
}
