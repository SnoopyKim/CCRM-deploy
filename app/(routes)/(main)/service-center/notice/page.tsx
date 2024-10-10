"use client";

import Icon from "@/app/_components/Icon";
import { SearchField } from "@/app/_components/Text";
import cn from "@utils/cn";
import React, { Suspense, useState } from "react";
import Link from "next/link";
import { CategoryBadge } from "@/app/_components/Badge";
import Pagination from "@/app/_components/Pagination";
import NoticeList from "./_components/notice-list";

export default function NoticePage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const onSearch = (value: string) => alert(value);

  return (
    <>
      <div className="flex flex-row flex-1 justify-between items-center">
        <h2 className="text-2xl">공지사항</h2>
        <div className="w-[400px]">
          <SearchField
            placeholder="검색할 내용을 입력하세요"
            onSearch={onSearch}
          />
        </div>
      </div>
      <Suspense fallback={<></>}>
        <NoticeList />
      </Suspense>
    </>
  );
}
