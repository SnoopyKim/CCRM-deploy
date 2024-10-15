"use client";

import TermModel, { TermCategory } from "@/app/_models/term";
import { getTerms } from "@/app/_services/term";
import cn from "@/app/_utils/cn";
import useDialogStore from "@/app/_utils/dialog/store";
import { useEffect, useState } from "react";
import TermGridView from "./term-grid";

const mockData = new TermModel(
  "",
  "property",
  "AIG 손해보험",
  "https://i.namu.wiki/i/g0BIv3H_kYEEs6IiLDagxiL1EszWGzoRkLAZt6b3T39c1jsqQBcBYEw6sEbLMvtanHlMlvZE_VeRuJ_xxbbfSuDN6yue9zduzFN2hFi8iIUwIAnuEsWukuoW5cbNU-JNyK0PbKL3SiY4LndP45xHpg.webp",
  "",
  new Date(),
  new Date(),
  true,
  "1"
);

export default function TermBillPage() {
  const { openAlert } = useDialogStore();
  const [activeCategory, setActiveCategory] = useState("property");
  const [termList, setTermList] = useState<TermModel[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getTerms(1, 100);
      if (error) {
        openAlert({
          title: "청구 자료 불러오기 오류",
          description: error.message,
        });
        return;
      }
      setTermList(data?.data ?? []);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="space-y-6 pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-main-1">약관조회</h1>
          <p className="text-grayscale-6">
            각 보험사 공시실과 연결되어 약관 PDF확인이 가능합니다.
          </p>
        </div>
        <div className="flex border border-grayscale-11 divide-x divide-grayscale-11">
          {Object.entries(TermCategory).map(([key, value]) => (
            <div
              key={key}
              className={cn(
                "flex flex-1 justify-center items-center h-14 text-lg font-normal ",
                activeCategory === key
                  ? "text-grayscale-14 bg-main-1"
                  : "text-grayscale-7 hover:bg-grayscale-12"
              )}
              onClick={() => setActiveCategory(key)}
            >
              {value}
            </div>
          ))}
        </div>
        <TermGridView
          category={activeCategory}
          terms={Array.from({ length: 18 }, () => mockData)}
        />
      </div>
    </div>
  );
}
