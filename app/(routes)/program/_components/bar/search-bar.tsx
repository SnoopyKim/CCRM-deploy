"use client";

import SearchField from "@/app/_components/Text/search";

export default function ProgramSearchBar() {
  const searchRecommendList = ["암", "심근경색", "뇌졸중", "교통사고"];

  return (
    <div className="w-full max-w-2xl">
      <SearchField
        onSearch={() => {}}
        className="border-2 border-main-2"
        placeholder="고객검색 OR 자료검색 (EX. 운전자 보험)"
      />

      {/* 인기 검색어 */}
      <div className="mt-2 flex">
        <span className="flex mr-2 font-bold text-main-1">인기검색어</span>
        <div className="flex space-x-2 text-main-5 font-semibold">
          {searchRecommendList.map((element, index) => (
            <a key={element} href="#" className="hover:underline">
              #{element}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
