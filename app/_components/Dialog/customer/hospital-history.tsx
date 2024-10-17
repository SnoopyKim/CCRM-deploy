"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import { SearchField } from "../../Text";
import { useState } from "react";

export default function AddHosiptalHistoryDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [selectedResult, setSelectedResult] = useState("");

  return (
    <div className="flex flex-col w-[720px] items-stretch p-8 gap-6">
      <h1 className="text-2xl font-medium">병원내역 등록</h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-normal">질병명을 검색해주세요</h2>
        <SearchField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={() => setResults([searchValue, searchValue + "(2)"])}
        />
        <div className="flex items-center gap-2 text-sm font-medium">
          <strong>인기검색어</strong>
          {["대상포진", "녹내장", "암", "질병코드"].map((item) => (
            <span
              key={item}
              className="text-sub-2 cursor-pointer"
              onClick={() => setSearchValue(item)}
            >
              #{item}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {results.map((item) => (
          <div
            key={item}
            className="flex items-center p-4 border border-grayscale-11 rounded-sm"
          >
            <input
              type="radio"
              className="mr-4"
              onChange={(e) => e.target.value && setSelectedResult(item)}
            />
            <div>
              <p className="font-normal text-grayscale-6">
                질병코드 |&nbsp;&nbsp;&nbsp;
                <span className="text-sub-1">J00</span>
              </p>
              <p className="font-normal text-grayscale-6">
                질병이름 |&nbsp;&nbsp;&nbsp;
                <span className="text-main-1">{item}</span>
              </p>
              <p className="font-normal text-grayscale-6">
                질병증상 |&nbsp;&nbsp;&nbsp;
                <span className="text-main-1">
                  콧물, 코막힘, 목부위 통증, 기침, 근육통
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <PrimaryButton color="gray" title="닫기" onClick={closeDialog} />
        <PrimaryButton
          color="primary"
          title="등록하기"
          onClick={() => closeDialog(selectedResult)}
        />
      </div>
    </div>
  );
}
