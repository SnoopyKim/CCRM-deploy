"use client";

import { SearchField } from "@/app/_components/Text";
import Link from "next/link";
import Pagination from "../_components/pagination";
import clsx from "clsx";
import { useState } from "react";
import AccordianItem from "./_components/accordian";

const categories = [
  { name: "전체", value: "all" },
  { name: "고객관리", value: "customer" },
  { name: "프로그램 이용", value: "program" },
];

export default function FAQPage({
  searchParams,
}: {
  searchParams: { category: string; page: string };
}) {
  const currentCategory = searchParams.category ? searchParams.category : "all";

  const [isOpen, setIsOpen] = useState(false);
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
      <div className="my-10">
        <div className="flex flex-row gap-2">
          {categories.map((category) => (
            <Link
              key={category.value}
              href={`/service-center/faq?category=${category.value}`}
              className={clsx(
                "px-6 py-3 text-lg rounded-xl",
                currentCategory === category.value
                  ? "bg-main-2 text-grayscale-14"
                  : "text-grayscale-6 border border-grayscale-8"
              )}
              scroll={false}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className="mt-10">
          {[
            "비밀번호 변경은 어떻게 하나요?",
            "모바일 앱은 없나요?",
            "결제가 안됩니다.",
            "가망고객과 관리 고객은 뭐가 다른가요?",
            "카카오톡 연결이 안됩니다.",
            "문자로 고객에게 메시지를 단체로 발송하고 싶어요.",
            "고객관련 일정 등록은 어떻게 하나요?",
            "웹 매거진은 언제 발행되고, 업데이트 되나요?",
            "웹 매거진은 고객에게 어떻게 전달 되나요?",
            "고객 일괄 등록 시 엑셀 파일이 손상됩니다.",
          ].map((item) => (
            <AccordianItem key={item} title={item} />
          ))}
        </div>
      </div>
      <Pagination total={80} />
    </>
  );
}
