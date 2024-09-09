import { Button } from "@/app/_components/Button";
import { SelectField } from "@/app/_components/Select";
import { TextField } from "@/app/_components/Text";
import TextLabel from "@/app/_components/Text/label";

export default function Discount() {
  return (
    <div className="flex flex-col gap-4">
      <TextLabel
        title="쿠폰/포인트 할인 정보"
        className="text-main-1 text-lg font-semibold"
        caution="※ 사용한 마일리지에 대해 환불/재발행은 불가능합니다."
      />
      <div className="flex flex-col px-8 py-4 items-start">
        <div className="grid grid-cols-2 gap-4 w-full">
          <SelectField
            id="coupon"
            title="쿠폰 선택"
            options={
              [
                // {
                //   value: "현대카드",
                //   text: "현대카드",
                // },
              ]
            }
            placeholder={"쿠폰을 선택하세요"}
          />
          <div className="flex items-end gap-2">
            <TextField
              title="보유 포인트"
              caution="0P"
              cautionClassName="font-semibold"
              placeholder={"사용할 포인트 입력"}
            />
            <Button title="적용" className="w-20" />
          </div>
        </div>
        <div className="round-sm border mt-2 px-4 py-2 border-main-2 text-main-2 cursor-pointer">
          쿠폰/포인트 사용 취소
        </div>
      </div>
    </div>
  );
}
