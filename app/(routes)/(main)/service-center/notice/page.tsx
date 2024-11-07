"use client";

import { SearchField } from "@/app/_components/Text";
import React, { Suspense } from "react";
import NoticeList from "./_components/notice-list";

export default function NoticePage() {
  const onSearch = (value: string) => alert(value);

  return (
    <>
      <div className="flex flex-row max-lg:flex-col flex-1 justify-between items-center">
        <h2 className="text-2xl">공지사항</h2>
        <div className="max-w-[400px] w-full max-lg:mt-4">
          <SearchField
            placeholder="검색할 내용을 입력하세요"
            onSearch={onSearch}
            className="max-lg:h-12"
          />
        </div>
      </div>
      <Suspense fallback={<></>}>
        <NoticeList />
      </Suspense>
    </>
  );
}
