"use client";

import Icon from "@components/Icon";
import Input from "./input";
import React, { useState } from "react";

export default function SearchField({
  placeholder,
  onSearch,
}: {
  placeholder?: string;
  onSearch: (value: string) => void;
}) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className="relative flex flex-1 items-center group">
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        onEnter={handleSearch}
      />
      <div className="absolute right-4 cursor-pointer" onClick={handleSearch}>
        <Icon
          type="search"
          className="fill-grayscale-9 group-focus-within:fill-sub-2"
        />
      </div>
    </div>
  );
}
