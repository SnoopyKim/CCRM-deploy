"use client";

import Pagination from "@/app/_components/Pagination";
import { Select } from "@/app/_components/Select";
import { SearchField } from "@/app/_components/Text";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CounselTable() {
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Select
            options={[{ value: "all", text: "전체" }]}
            className="w-32 h-10 py-1.5 px-3"
          />
          <SearchField
            placeholder="검색할 내용을 입력하세요"
            onSearch={() => {}}
            className="w-80 h-10 py-1"
          />
        </div>
        <div className="flex items-center gap-2">
          필터 :
          <Select
            options={[
              { value: "asc", text: "오름차순" },
              { value: "desc", text: "내림차순" },
            ]}
            className="w-40 h-10 ml-2 py-1.5 px-3"
          />
          <Select
            options={[
              { value: 10, text: "10개 보이기" },
              { value: 20, text: "20개 보이기" },
              { value: 50, text: "50개 보이기" },
            ]}
            className="w-40 h-10 ml-2 py-1.5 px-3"
          />
        </div>
      </div>
      <table className="w-full mt-4">
        <colgroup>
          <col className="w-0" />
          <col className="w-32" />
          <col className="w-40" />
          <col className="" />
          <col className="w-32" />
          <col className="w-40" />
        </colgroup>
        <thead>
          <tr className="bg-grayscale-12 border-b border-grayscale-11">
            <td className="px-4 py-2">
              <input type="checkbox" />
            </td>
            <td className="font-medium">고객명</td>
            <td>상담 일자</td>
            <td className="px-2">상담 제목</td>
            <td>상담 진행</td>
            <td>내용</td>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i} className="border-b border-grayscale-11">
              <td className="px-4">
                <input type="checkbox" />
              </td>
              <td className="font-medium">홍길동</td>
              <td>2024-00-00</td>
              <td className="px-2">
                <p className="overflow-hidden line-clamp-1">
                  상담 제목입니다. 상담 제목을 적는 곳입니다.
                </p>
              </td>
              <td className="py-3">
                {i % 2 == 0 ? (
                  <div className="inline-flex px-2 py-1 rounded bg-grayscale-12 text-grayscale-6 text-sm font-medium">
                    상담 완료
                  </div>
                ) : (
                  <div className="inline-flex px-2 py-1 rounded bg-sub-4 bg-opacity-10 text-sub-4 text-sm font-medium">
                    상담 예정
                  </div>
                )}
              </td>
              <td>
                <Link
                  href={`/program/counsel/${i}`}
                  className="hover:underline"
                >
                  상담 내용 보기
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalCount={80}
        itemsPerPage={10}
        currentPage={Number(searchParams.get("page") || 1)}
      />
    </div>
  );
}
