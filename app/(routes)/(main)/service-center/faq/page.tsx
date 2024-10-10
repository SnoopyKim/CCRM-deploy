"use client";

import { SearchField } from "@/app/_components/Text";
import Link from "next/link";
import Pagination from "@components/Pagination";
import cn from "@utils/cn";
import { Suspense, useState } from "react";
import AccordianItem from "./_components/accordian";
import FaqList from "./_components/faq-list";
import { FaqCategory } from "@/app/_models/faq";

export default function FAQPage() {
  const [category, setCategory] = useState("all");

  return (
    <>
      <div className="flex flex-row flex-1 justify-between items-center">
        <h2 className="text-2xl">자주 묻는 질문 (FAQ)</h2>
        <div className="w-[400px]">
          <SearchField
            placeholder="검색할 내용을 입력하세요"
            onSearch={() => {}}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 my-10">
        {Object.entries({ all: "전체", ...FaqCategory }).map((ce) => (
          <div
            key={ce[0]}
            onClick={() => setCategory(ce[0])}
            className={cn(
              "px-6 py-3 text-lg rounded-xl",
              category === ce[0]
                ? "bg-main-2 text-grayscale-14"
                : "text-grayscale-6 border border-grayscale-8"
            )}
          >
            {ce[1]}
          </div>
        ))}
      </div>
      <Suspense fallback={<></>}>
        <FaqList category={category} />
      </Suspense>
    </>
  );
}
