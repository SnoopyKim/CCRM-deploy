import { SelectField } from "@/app/_components/Select";
import { Input } from "@/app/_components/Text";
import TextLabel from "@/app/_components/Text/label";

export default function CardInfo() {
  return (
    <div className="flex flex-col gap-4">
      <TextLabel
        title="카드 정보"
        className="text-main-1 text-lg font-semibold"
      />
      <SelectField
        id="card-company"
        title="카드사 선택(현대카드, 하나카드 사용 불가)"
        placeholder="선택"
        options={[
          {
            value: "현대카드",
            text: "현대카드",
          },
          {
            value: "신한카드",
            text: "신한카드",
          },
          {
            value: "KB국민카드",
            text: "KB국민카드",
          },
        ]}
      />
      <SelectField
        id="monthly-payment"
        title="할부 개월 수"
        defaultValue={0}
        options={[
          {
            value: 0,
            text: "일시불",
          },
          {
            value: 3,
            text: "3개월",
          },
          {
            value: 6,
            text: "6개월",
          },
        ]}
      />
      <div className="flex flex-col gap-2 items-stretch">
        <TextLabel title="카드번호" />
        <div className="grid grid-cols-4 gap-2">
          <Input type="number" placeholder="1234" />
          <Input type="password" />
          <Input type="password" />
          <Input type="password" />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-stretch">
        <TextLabel title="카드 유효일" />
        <div className="flex items-center gap-2">
          <Input placeholder="년" />
          <span>/</span>
          <Input placeholder="월" />
        </div>
      </div>
    </div>
  );
}
