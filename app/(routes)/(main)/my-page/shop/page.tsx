import { CheckBox } from "@/app/_components/CheckBox";
import PageTitle from "../_components/page-title";
import { Button } from "@/app/_components/Button";
import Product from "./product";
import CardInfo from "./card-info";
import Discount from "./discount";
import TextLabel from "@/app/_components/Text/label";

export default function ShopPage() {
  const price = 29000;
  const discount = 10000;
  return (
    <>
      <PageTitle>제품 구매</PageTitle>
      <div className="flex flex-col px-20 py-10 gap-8 items-stretch">
        <Product />
        <div className="flex flex-col gap-4">
          <TextLabel
            title="결제 수단"
            className="text-main-1 text-lg font-semibold"
          />
          <div className="flex w-full h-14 rounded-sm bg-main-1 justify-center items-center">
            <span className="text-lg text-grayscale-14 font-semibold ">
              ✓ 카드 결제
            </span>
          </div>
        </div>

        <CardInfo />
        <Discount />
        <div className="flex flex-col gap-4">
          <div className="flex justify-end items-center font-semibold text-lg">
            <span>제품 금액 :</span>
            <span className="w-32 text-end">
              {price.toLocaleString("ko-KR")}원
            </span>
          </div>
          <div className="flex justify-end items-center font-semibold text-lg">
            <span>할인 금액 :</span>
            <span className="w-32 text-end text-sub-1">
              {discount.toLocaleString("ko-KR")}원
            </span>
          </div>
        </div>
        <div className="flex justify-end items-center font-semibold text-lg">
          <span>최종 결제 금액 :</span>
          <span className="w-32 text-end text-sub-1">
            {(price - discount).toLocaleString("ko-KR")}원
          </span>
        </div>
        <Button title="결제하기" />
      </div>
    </>
  );
}
