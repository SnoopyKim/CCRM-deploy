import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import { TextField } from "../../Text";
import { Select, SelectField } from "../../Select";

export default function AddInsuranceDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  return (
    <div className="flex flex-col md:w-[720px] items-stretch p-8 gap-8">
      <div>
        <h1 className="text-2xl font-medium">보장성보험 상세내역</h1>
        <p className="mt-1 text-grayscale-5">고객님의 보장설계를 진행합니다.</p>
      </div>
      <div className="max-h-[60vh] space-y-8 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-normal">기본 정보</h2>
          <TextField title="상품명" />
          <TextField title="보험료 (원)" />
          <TextField type="date" title="계약일" />
          <SelectField
            title="보장 종료일"
            options={[
              { value: 60, text: "60세" },
              { value: 59, text: "59세" },
              { value: 58, text: "58세" },
            ]}
          />
        </div>
        <div className="w-full h-px bg-grayscale-11"></div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-normal">상세 정보</h2>
          <SelectField
            title="납입 기간"
            options={[
              { value: 1, text: "1년" },
              { value: 2, text: "2년" },
              { value: 3, text: "3년" },
            ]}
          />
          <TextField title="계약자" />
          <TextField title="피보험자" />
          <TextField title="증권번호" />
        </div>
        <div className="w-full h-px bg-grayscale-11"></div>
        <div className="flex flex-col">
          <h2 className="text-xl font-normal mb-4">주요보장</h2>
          <table cellPadding={4} cellSpacing={2} className="w-full">
            <colgroup>
              <col width="120px" />
              <col width="*" />
              <col width="120px" />
              <col width="260px" />
            </colgroup>
            <thead>
              <tr className="bg-grayscale-12">
                <th className="pl-4 py-2 text-start font-semibold">
                  보장 구분
                </th>
                <th className="text-start font-normal">주요보장</th>
                <th className="text-start font-normal">보장금액(만원)</th>
                <th className="text-start font-normal">보장만기</th>
              </tr>
            </thead>
            <tbody className="border-b border-grayscale-11">
              <tr className="mt_form1">
                <td rowSpan={4} className="font-semibold pl-4">
                  사망보장
                </td>
                <td>일반사망(종신)</td>
                <td>
                  <input
                    type="text"
                    name="i_price4[]"
                    className="border border-grayscale-11 py-1 px-2 mr-2 h-10 w-32"
                  />
                </td>
                <td>
                  <div className="flex  justify-between pr-4">
                    <Select
                      options={[{ value: "", text: "종신" }]}
                      className="py-1 h-10 w-56"
                    />
                    <button
                      type="button"
                      className="underline underline-offset-2 text-sub-1"
                    >
                      +추가
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="mt_form2">
                <td>일반사망(정기)</td>
                <td>
                  <input
                    type="text"
                    name="i_price4[]"
                    className="border border-grayscale-11 py-1 px-2 mr-2 h-10 w-32"
                  />
                </td>
                <td>
                  <div className="flex justify-between pr-4">
                    <Select
                      options={[{ value: "", text: "종신" }]}
                      className="py-1 h-10 w-56"
                    />
                    <button
                      type="button"
                      className="underline underline-offset-2 text-sub-1"
                    >
                      +추가
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="mt_form3">
                <td>암사망</td>
                <td>
                  <input
                    type="text"
                    name="i_price4[]"
                    className="border border-grayscale-11 py-1 px-2 mr-2 h-10 w-32"
                  />
                </td>
                <td>
                  <div className="flex  justify-between pr-4">
                    <Select
                      options={[{ value: "", text: "종신" }]}
                      className="py-1 h-10 w-56"
                    />
                    <button
                      type="button"
                      className="underline underline-offset-2 text-sub-1"
                    >
                      +추가
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="mt_form4">
                <td>재해사망</td>
                <td>
                  <input
                    type="text"
                    name="i_price4[]"
                    className="border border-grayscale-11 py-1 px-2 mr-2 h-10 w-32"
                  />
                </td>
                <td>
                  <div className="flex  justify-between pr-4">
                    <Select
                      options={[{ value: "", text: "종신" }]}
                      className="py-1 h-10 w-56"
                    />
                    <button
                      type="button"
                      className="underline underline-offset-2 text-sub-1"
                    >
                      +추가
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody className="border-b border-grayscale-11">
              <tr className="mt_form5">
                <td rowSpan={2} className="font-semibold pl-4">
                  질병재해
                </td>
                <td>일반사망(종신)</td>
                <td>
                  <input
                    type="text"
                    name="i_price4[]"
                    className="border border-grayscale-11 py-1 px-2 mr-2 h-10 w-32"
                  />
                </td>
                <td>
                  <div className=" flex  justify-between pr-4">
                    <Select
                      options={[{ value: "", text: "종신" }]}
                      className="py-1 h-10 w-[6.5rem]"
                    />
                    <Select
                      options={[{ value: "100", text: "100세" }]}
                      className="py-1 h-10 w-[6.5rem]"
                    />
                    <button
                      type="button"
                      className="underline underline-offset-2 text-sub-1"
                    >
                      +추가
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="mt_form6">
                <td>재해사망</td>
                <td>
                  <input
                    type="text"
                    name="i_price4[]"
                    className="border border-grayscale-11 py-1 px-2 mr-2 h-10 w-32"
                  />
                </td>
                <td>
                  <div className="flex  justify-between pr-4">
                    <Select
                      options={[{ value: "", text: "종신" }]}
                      className="py-1 h-10 w-[6.5rem]"
                    />
                    <Select
                      options={[{ value: "100", text: "100세" }]}
                      className="py-1 h-10 w-[6.5rem]"
                    />
                    <button
                      type="button"
                      className="underline underline-offset-2 text-sub-1"
                    >
                      +추가
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody className="border-b border-grayscale-11">
              <tr className="mt_form7">
                <td className="font-semibold pl-4">재해장해</td>
                <td>재해장해 3%</td>
                <td>
                  <input
                    type="text"
                    name="i_price4[]"
                    className="border border-grayscale-11 py-1 px-2 mr-2 h-10 w-32"
                  />
                </td>
                <td>
                  <div className="flex justify-between pr-4 ">
                    <Select
                      options={[{ value: "", text: "종신" }]}
                      className="py-1 h-10 w-[6.5rem]"
                    />
                    <Select
                      options={[{ value: "100", text: "100세" }]}
                      className="py-1 h-10 w-[6.5rem]"
                    />
                    <button
                      type="button"
                      className="underline underline-offset-2 text-sub-1"
                    >
                      +추가
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <PrimaryButton color="gray" title="닫기" onClick={closeDialog} />
        <PrimaryButton color="primary" title="등록하기" onClick={closeDialog} />
      </div>
    </div>
  );
}
