"use client";

import { Suspense } from "react";
import CounselTable from "./table";

export default function CounselListPage() {
  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto mt-10 gap-6">
      <div>
        <h1 className="text-2xl font-normal">상담 현황</h1>
        <p className="mt-1 text-grayscale-6">
          고객 상담 내역 조회를 하실 수 있습니다.
        </p>
      </div>
      <div className="flex-grow">
        <Suspense fallback={<></>}>
          <CounselTable />
        </Suspense>
      </div>
      <div className="flex flex-col mt-8 py-4 border-t border-grayscale-11">
        <h2 className="text-xl font-medium">상담 현황 테이블</h2>
        <p className="mt-2 text-lg font-normal">
          2024년도 &lt;월별 상담 횟수&gt;
        </p>

        <div className="w-full mt-4 grid grid-cols-12 border border-grayscale-11 divide-x divide-grayscale-11">
          {Array.from({ length: 12 }).map((_, i) => {
            const data = { month: i + 1, count: 0 };
            return (
              <div key={data.month} className="divide-y divide-grayscale-11">
                <div className="flex h-12 items-center justify-center bg-grayscale-13 ">
                  {data.month}월
                </div>
                <div className="flex h-12 items-center justify-center">
                  {data.count}회
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
