import { Select } from "@components/Select";
import PageTitle from "../_components/page-title";

export default function PurchasePage() {
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
      <div className="flex flex-col gap-4 p-10 items-center">
        <p className="text-grayscale-8 text-2xl">구매 내역이 없습니다.</p>
      </div>
    </>
  );
}
