"use client";

import CheckBox from "@/app/_components/CheckBox/default";
import SelectField from "@/app/_components/Select/select-field";
import TextField from "@/app/_components/Text/field";
import Input from "@/app/_components/Text/input";

export default function InfoForm({ onSubmit }: { onSubmit?: () => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form
      className="flex flex-col gap-4 bg-grayscale-13 p-6"
      onSubmit={handleSubmit}
    >
      <div className="text-xl font-normal">
        고객 정보 <span className="text-sub-1">(필수기재)</span>
      </div>
      <TextField title="이름" required />
      <div className="grid grid-cols-2">
        <div className="">
          <strong>고객 구분(필수)</strong>
          <div className="flex gap-2">
            <input type="radio" name="select_member" id="select_member1" />
            <label htmlFor="select_member1">관리고객</label>
          </div>
          <div className="flex gap-2">
            <input type="radio" name="select_member" id="select_member2" />
            <label htmlFor="select_member2">가망고객</label>
          </div>
        </div>
        <div className="">
          <strong>운전 면허(필수)</strong>
          <div className="flex gap-2">
            <input type="radio" name="d_license" id="d_license1" />
            <label htmlFor="d_license1">운전 유</label>
          </div>
          <div className="flex gap-2">
            <input type="radio" name="d_license" id="d_license2" />
            <label htmlFor="d_license2">운전 무</label>
          </div>
        </div>
      </div>
      <SelectField
        title="하시는 일"
        placeholder="선택"
        options={[{ value: "1", text: "일1" }]}
        className="w-full"
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-grayscale-6">
          핸드폰 연락처
        </span>
        <div className="flex gap-4 justify-between items-center mt-2">
          <div>
            <Input
              type="text"
              inputMode="numeric"
              name="mb_phone1"
              placeholder="010"
              maxLength={4}
              className="w-44"
              required
            />
          </div>
          <span>-</span>
          <div>
            <Input
              type="text"
              inputMode="numeric"
              name="mb_phone2"
              placeholder=""
              maxLength={4}
              className="w-44"
              required
            />
          </div>
          <span>-</span>
          <div>
            <Input
              type="text"
              inputMode="numeric"
              name="mb_phone3"
              placeholder=""
              maxLength={4}
              className="w-44"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-grayscale-6">주민번호</span>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mt-2">
            <Input
              type="text"
              inputMode="numeric"
              name="mb_resident_num"
              placeholder="주민번호 앞 6자리"
              maxLength={6}
              required
            />
            <span>-</span>
            <div className="flex flex-1">
              <div className="flex flex-shrink items-center">
                <Input
                  type="text"
                  inputMode="numeric"
                  name="mb_resident_num2"
                  placeholder=""
                  maxLength={1}
                  className="w-12 mr-2"
                  required
                />
                <span>******</span>
              </div>
            </div>
          </div>
          <ul className="flex flex-col">
            <li className="list-inside list-disc ml-2">
              보험 나이 <span className="text-sub-1">-세</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;상령일&nbsp;
              <span className="text-sub-1">매년 -</span>
            </li>
            <li className="list-inside list-disc ml-2">
              상령일은 일정관리에 노출됩니다.
            </li>
          </ul>
        </div>
      </div>
      <div>
        <TextField
          title="자택 주소"
          name="mb_addr1"
          placeholder="주소 검색"
          readOnly
        />
        <Input
          type="text"
          name="mb_addr2"
          placeholder="나머지 주소 입력"
          required
          className="mt-2"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-grayscale-6">
          관심 사항 / 성향 (최대 3개)
        </span>
        <div className="grid grid-cols-3 mt-2">
          {[
            { value: "1", text: "투자 (주식/펀드)" },
            { value: "2", text: "저축" },
            { value: "3", text: "대출" },
            { value: "4", text: "부동산" },
            { value: "5", text: "세금" },
            { value: "6", text: "여행" },
            { value: "7", text: "독서" },
            { value: "8", text: "운동" },
            { value: "9", text: "건강" },
            { value: "10", text: "동물" },
            { value: "11", text: "창업" },
            { value: "12", text: "은퇴" },
          ].map((item) => (
            <CheckBox key={item.value} name={item.value} label={item.text} />
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="bg-main-2 text-grayscale-14 py-4 hover:bg-main-3 font-normal"
      >
        고객 등록 완료
      </button>
    </form>
  );
}
