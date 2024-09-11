"use client";

import { SearchField } from "@/app/_components/Text";

export default function ProgramSearchBar() {
  return (
    <SearchField
      onSearch={() => {}}
      className="bg-transparent border-y border-y-grayscale-9 border-x-0 rounded-none placeholder-grayscale-9 focus:border-grayscale-14 focus-visible:border-grayscale-14"
      placeholder="통합검색어 입력"
      iconClassName="fill-grayscale-14 group-focus-within:fill-grayscale-14"
    />
  );
}
