"use client";

import InsuranceModel, { InsuranceCategory } from "@/app/_models/insurance";
import { getInsurances } from "@/app/_services/insurance";
import cn from "@/app/_utils/cn";
import useDialogStore from "@/app/_utils/dialog/store";
import { useEffect, useState } from "react";
import BillGridView from "./bill-grid";
import useAuthStore from "@/app/_utils/auth/store";

const mockData = new InsuranceModel(
  "",
  "property",
  "AIG 손해보험",
  "https://i.namu.wiki/i/g0BIv3H_kYEEs6IiLDagxiL1EszWGzoRkLAZt6b3T39c1jsqQBcBYEw6sEbLMvtanHlMlvZE_VeRuJ_xxbbfSuDN6yue9zduzFN2hFi8iIUwIAnuEsWukuoW5cbNU-JNyK0PbKL3SiY4LndP45xHpg.webp",
  "",
  "",
  "",
  new Date(),
  new Date(),
  true,
  1
);

export default function InsuranceBillPage() {
  const { openAlert } = useDialogStore();
  const [activeCategory, setActiveCategory] = useState("property");
  const [insuranceList, setInsuranceList] = useState<InsuranceModel[]>([]);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchData = async () => {
      const { data, error } = await getInsurances(1, 100);
      if (error) {
        openAlert({
          title: "청구 자료 불러오기 오류",
          description: error.message,
        });
        return;
      }
      setInsuranceList(data?.data ?? []);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="space-y-6 pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-main-1">보험금 청구</h1>
          <div className="flex gap-2">
            <span className="text-sub-1 text-sm">★ 가상팩스번호</span>
            <span className="text-sub-2 text-sm">▣ 단체실손 가능</span>
          </div>
        </div>
        <div className="flex border border-grayscale-11 divide-x divide-grayscale-11">
          {Object.entries(InsuranceCategory).map(([key, value]) => (
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
        <BillGridView
          category={activeCategory}
          bills={Array.from({ length: 15 }, () => mockData)}
        />
      </div>
    </div>
  );
}
