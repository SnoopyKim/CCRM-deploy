import { Select } from "@/app/_components/Select";

export default function CustomerTable() {
  return (
    <>
      <div className="flex justify-end items-center gap-4">
        <span>필터 :</span>

        <Select
          className="w-48 h-8 px-3 py-1 text-sm"
          options={[
            {
              text: "그룹 전체",
              value: "all",
            },
          ]}
        />

        <Select
          className="w-48 h-8 px-3 py-1 text-sm"
          options={[
            {
              text: "오름차순",
              value: "asc",
            },
            {
              text: "내림차순",
              value: "desc",
            },
          ]}
        />
      </div>
      <table className="w-full mt-4">
        <colgroup>
          <col width="60px" />
          <col width="*" />
          <col width="140px" />
          <col width="140px" />
          <col width="140px" />
          <col width="*" />
          <col width="*" />
        </colgroup>

        <thead>
          <tr className="bg-grayscale-13 border-b border-grayscale-11">
            <th className="py-2">
              <input type="checkbox" name="all_select" id="all_select" />
            </th>
            <th className="text-left font-normal">고객명</th>
            <th className="text-left font-normal">구분</th>
            <th className="text-left font-normal">연락처</th>
            <th className="text-left font-normal">생년월일</th>
            <th className="text-left font-normal">그룹관리</th>
            <th className="text-left font-normal">정보</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-grayscale-11">
            <td className="py-4">
              <div className="flex justify-center">
                <input type="checkbox" name="p_check" id="p_check1" />
              </div>
            </td>
            <td className="font-semibold">테스트 고객</td>
            <td className="text-sub-3">관리 고객</td>
            <td>010-0000-1111</td>
            <td>1999.01.01</td>
            <td className="text-sub-2">테스트 그룹</td>
            <td>
              <u>자세히</u>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
