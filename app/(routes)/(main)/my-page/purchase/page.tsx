"use client";

import { Select } from "@components/Select";
import PageTitle from "../_components/page-title";
import { useEffect, useState } from "react";
import { getPayments } from "@/app/_services/payment";
import useDialogStore from "@/app/_utils/dialog/store";
import PaymentModel from "@/app/_models/payment";
import PageList from "@/app/_models/page-list";

export default function PurchasePage() {
  const { openAlert } = useDialogStore();
  const [purchaseHistory, setPurchaseHistory] =
    useState<PageList<PaymentModel>>();

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      const { data, error } = await getPayments(1);
      if (error) {
        openAlert({
          title: "구매 내역 오류",
          description: error.message,
        });
        return;
      }
      setPurchaseHistory(data);
    };

    fetchPurchaseHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageTitle>구매 내역</PageTitle>
      <div className="flex my-4 justify-between items-center">
        <div></div>
        <div className="flex items-center">
          <span className="mr-4">조회기간</span>
          <Select
            defaultValue={"month"}
            options={[
              { value: "month", text: "지난 1개월" },
              { value: "quater", text: "지난 3개월" },
              { value: "half", text: "지난 6개월" },
            ]}
            className="w-40"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 px-8  items-center">
        {(purchaseHistory?.total ?? 0) > 0 ? (
          purchaseHistory?.data?.map((payment) => (
            <div key={payment.id} className="flex p-4 w-full gap-4">
              <p className="text-grayscale-7 font-normal">
                {payment.payExpDate
                  .toLocaleDateString()
                  .replaceAll(" ", "")
                  .slice(2, 10)}
              </p>
              <div className="flex-1">
                <p>{payment.goodsName}</p>
                <p className="text-grayscale-7 text-sm">
                  {payment.payExpDate.toLocaleTimeString()}
                </p>
              </div>
              <p className="font-semibold">
                {Number(payment.amt).toLocaleString()}원
              </p>
            </div>
          ))
        ) : (
          // <p className="text-grayscale-8 text-2xl">구매 내역이 없습니다.</p>
          <div className="flex py-4 w-full gap-4 border-b border-grayscale-11">
            <p className="text-grayscale-7 font-normal">
              {new Date().toLocaleDateString().replaceAll(" ", "").slice(2, 10)}
            </p>
            <div className="flex-1">
              <p>{"1개월 이용권"}</p>
              <p className="text-grayscale-7 text-sm">{"00:00:00"}</p>
            </div>
            <p className="font-semibold">{Number(10000).toLocaleString()}원</p>
          </div>
        )}
      </div>
    </>
  );
}
