"use client";
import { ProgramSearchResult } from "@/app/_types/model";
import SearchItem from "./search-item";
import ProgramSearchBar from "../_components/bar/search-bar";

export default function ProgramSearchPage() {
  const exampleData = {
    title: "CCRM",
    type: "질병",
    date: "2023-09-25",
    imageUrl:
      "https://www.ccrm.ca/wp-content/themes/understrap-child/svg/exports/header/CCRM-LOGO.svg",
  };
  const searchResults: ProgramSearchResult[] = [
    exampleData,
    exampleData,
    exampleData,
    exampleData,
    exampleData,
    exampleData,
    exampleData,
  ];

  return (
    <div className="w-full justify-start">
      {/* 검색바 */}
      <ProgramSearchBar />
      {/* 통합 검색결과 */}
      <div className="bg-white">
        <h2 className="text-2xl font-bold mb-4">통합 검색결과</h2>
        <div className="text-lg text-gray-600 pb-2 border-b border-grayscale-11">
          고객 <span className="text-sub-1">{searchResults.length}건</span>
        </div>
      </div>
      <SearchItem results={searchResults} />
    </div>
  );
}
