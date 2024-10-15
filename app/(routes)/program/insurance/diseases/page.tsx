"use client";

import cn from "@/app/_utils/cn";
import { useState } from "react";

// 임의의 대분류, 중분류, 소분류 데이터
const categories = {
  sub: Array.from({ length: 16 }, (_, i) =>
    i % 2 === 0
      ? {
          id: "A00-B99",
          name: "특정 감염성 및 기생충성 질환",
          sub: Array.from({ length: 16 }, (_, i) =>
            i % 2 === 0
              ? {
                  id: "B00-B09",
                  name: "바이러스 감염",
                  sub: [
                    { id: "B00", name: "단순포진" },
                    { id: "B01", name: "수두" },
                  ],
                }
              : {
                  id: "B10-B19",
                  name: "기타 바이러스 감염",
                  sub: [{ id: "B10", name: "대상포진" }],
                }
          ),
        }
      : {
          id: "C00-C99",
          name: "암 질환",
          sub: Array.from({ length: 16 }, (_, i) => ({
            id: "C01-C09",
            name: "혈액암",
            sub: [{ id: "C01", name: "백혈병" }],
          })),
        }
  ),
};

const CategoryTree = () => {
  const [firstCategory, setFirstCategory] = useState<any>();
  const [secondCategory, setSecondCategory] = useState<any>();
  const [thirdCategory, setThirdCategory] = useState<any>();

  const data: Array<any> =
    (firstCategory
      ? secondCategory
        ? secondCategory.sub
        : firstCategory.sub
      : categories.sub) ?? [];

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="space-y-8 pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-main-1">질병코드</h1>
          <p className="text-grayscale-6">2021년 8차 개정안 내용입니다.</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-36 h-16 flex justify-center items-center rounded border text-lg",
                firstCategory
                  ? "border-main-2 text-main-1"
                  : "border-grayscale-9 text-grayscale-6"
              )}
            >
              {firstCategory?.id || "대분류"}
            </div>
            {firstCategory && (
              <>
                <span className="text-lg">&gt;</span>
                <div
                  className={cn(
                    "w-36 h-16 flex justify-center items-center rounded border text-lg",
                    secondCategory
                      ? "border-main-2 text-main-1"
                      : "border-grayscale-9 text-grayscale-6"
                  )}
                >
                  {secondCategory?.id || "중분류"}
                </div>
              </>
            )}
            {secondCategory && (
              <>
                <span className="text-lg">&gt;</span>
                <div
                  className={cn(
                    "w-36 h-16 flex justify-center items-center rounded border text-lg",
                    thirdCategory
                      ? "border-main-2 text-main-1"
                      : "border-grayscale-9 text-grayscale-6"
                  )}
                >
                  {thirdCategory?.id || "소분류"}
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setFirstCategory(undefined);
                setSecondCategory(undefined);
                setThirdCategory(undefined);
              }}
            >
              재선택
            </button>
            <button
              onClick={() => {
                if (thirdCategory) {
                  setThirdCategory(undefined);
                  return;
                }

                if (secondCategory) {
                  setSecondCategory(undefined);
                  return;
                }

                setFirstCategory(undefined);
              }}
            >
              이전
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {data.map((category: any, index) => (
            <div
              key={index}
              className="flex h-14 p-2 items-center border border-grayscale-11 hover:bg-grayscale-13 cursor-pointer"
              onClick={() => {
                if (!firstCategory) {
                  setFirstCategory(category);
                  return;
                }

                if (!secondCategory) {
                  setSecondCategory(category);
                  return;
                }

                setThirdCategory(category);
              }}
            >
              <span className="text-sub-1 font-semibold">{category.id}</span>
              <p className="flex-1 mx-2 text-lg text-grayscale-6">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTree;
