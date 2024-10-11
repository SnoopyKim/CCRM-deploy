import { ProgramMainSearchBar } from "./_components/nav/search";
import { ProgramSearchResult } from "../../_types/model";
import SearchItem from "./search/search-item";

export default function ProgramPage() {
  const searchRecommendList = ["암", "심근경색", "뇌졸중", "교통사고"];
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
      <div className="max-w-xl">
        <ProgramMainSearchBar />
      </div>
      {/* 인기 검색어 */}
      <div className="mb-6 flex">
        <span className="flex space-x-2 mr-2 mt-2 font-bold text-main-1">
          인기검색어
        </span>
        <div className="mt-2 flex space-x-2 text-main-5 font-semibold">
          {searchRecommendList.map((element, index) => (
            <a
              key={element}
              href="#"
              className="hover:underline"
            >
              #{element}
            </a>
          ))}
        </div>
      </div>
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
