"use client";

import Icon from "@components/Icon";
import Input, { InputProps } from "./input";
import React, { useState } from "react";
import cn from "@/app/_utils/cn";

export interface SearchFieldProps extends InputProps {
  onSearch: (value: string) => void;
  iconClassName?: string;
}

export default function SearchField({
  placeholder,
  onSearch,
  className,
  iconClassName,
  ...props
}: SearchFieldProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className="relative flex items-center group">
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        onEnter={handleSearch}
        className={`${className} pr-10`}
        {...props}
      />
      <div className="absolute right-4 cursor-pointer" onClick={handleSearch}>
        <Icon
          type="search"
          className={cn(
            "fill-grayscale-9 group-focus-within:fill-sub-2",
            iconClassName
          )}
        />
      </div>
    </div>
  );
}
