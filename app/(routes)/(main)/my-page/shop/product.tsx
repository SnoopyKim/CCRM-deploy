import { CheckBox } from "@/app/_components/CheckBox";
import TextLabel from "@/app/_components/Text/label";

export default function Product() {
  return (
    <div className="flex flex-col">
      <TextLabel
        title="상품 선택"
        className="text-main-1 text-lg font-semibold"
      />
      <div className="flex flex-col p-4 mt-4 items-stretch rounded-sm bg-sub-1 text-grayscale-14 text-center gap-2">
        <span className="line-through">20,000원</span>
        <span className="text-lg font-semibold py-2 border-y border-y-grayscale-14">
          1만원 할인
        </span>
        <span className="text-5xl font-normal">10,000원</span>
      </div>
      <div className="flex justify-center mt-2">
        <CheckBox name="month" label="1개월 이용권" color="sub" />
      </div>
    </div>
  );
}
