"use client";

import Icon from "@/app/_components/Icon";
import Pagination from "@/app/_components/Pagination";
import ClientModel from "@/app/_models/client";
import ConsultationModel from "@/app/_models/consultation";
import cn from "@/app/_utils/cn";
import Link from "next/link";

export default function CounselTable({
  consultations,
  orderBy,
  setOrderBy,
}: {
  consultations: ConsultationModel[];
  orderBy?: string;
  setOrderBy: (orderBy: string) => void;
}) {
  return (
    <div className="w-full overflow-x-auto mt-4">
      <table className="w-full">
        <thead>
          <tr className="bg-grayscale-12 border-b border-grayscale-11">
            <th className="px-4 py-2 w-12"></th>
            <th className="px-4 py-2 font-medium text-left whitespace-nowrap w-24">
              고객명
            </th>
            <th className="px-4 text-left w-40">
              <div
                className="inline-flex items-center gap-2 rounded hover:bg-grayscale-11 px-2 py-1 font-medium whitespace-nowrap"
                onClick={() => setOrderBy(orderBy === "asc" ? "desc" : "asc")}
              >
                <span>상담 일자</span>
                <Icon
                  type="down"
                  className={cn(
                    "w-4 h-4",
                    orderBy === "asc" ? "rotate-180" : ""
                  )}
                  onClick={() => setOrderBy(orderBy === "asc" ? "desc" : "asc")}
                />
              </div>
            </th>
            <th className="px-4 whitespace-nowrap font-medium text-left">
              상담 제목
            </th>
            <th className="px-4 whitespace-nowrap font-medium text-left w-28">
              상담 진행
            </th>
            <th className="px-4 whitespace-nowrap font-medium text-left w-40">
              내용
            </th>
          </tr>
        </thead>
        <tbody>
          {(consultations || []).map((consultation: ConsultationModel) => (
            <tr key={consultation.id} className="border-b border-grayscale-11">
              <td className="px-4">
                <input type="checkbox" />
              </td>
              <td className="px-4 font-medium whitespace-nowrap">
                {consultation.client?.name || "-"}
              </td>
              <td className="px-4 whitespace-nowrap">
                {consultation.consultationTime}
              </td>
              <td className="px-4 whitespace-nowrap">
                <p className="overflow-hidden line-clamp-1">
                  {consultation.title}
                </p>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                {consultation.consultationStatus === "COMPLETED" ? ( // 상담 완료 여부 판단
                  <div className="inline-flex px-2 py-1 rounded bg-grayscale-12 text-grayscale-6 text-sm font-medium">
                    상담 완료
                  </div>
                ) : (
                  <div className="inline-flex px-2 py-1 rounded bg-sub-4 bg-opacity-10 text-sub-4 text-sm font-medium">
                    상담 예정
                  </div>
                )}
              </td>
              <td className="px-4 whitespace-nowrap">
                <Link
                  href={`/program/counsel/edit/${consultation.id}`}
                  className="hover:underline"
                >
                  상담 내용 보기
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
