"use client";

import { SearchField } from "@/app/_components/Text";
import CustomerTable from "./table";
import ColorButton from "./_components/color-button";
import useDialogStore from "@/app/_utils/dialog/store";
import NewCustomerDialog from "@/app/_components/Dialog/customer/new";
import { useRouter } from "next/navigation";

export default function CustomerRetrievePage() {
  const router = useRouter();
  const openCustom = useDialogStore((state) => state.openCustom);
  return (
    <div className="flex w-full max-w-screen-xl flex-col mx-auto mt-10">
      <div className="flex justify-between">
        <div className="flex h-14 items-center gap-3 px-5 py-3 bg-grayscale-13 border border-grayscale-11 font-normal">
          <span className="text-sub-2 leading-none">
            전체고객 <strong>0명</strong>
          </span>
          <div className="w-0.5 bg-grayscale-11 h-4"></div>
          <span className="leading-none">
            관리고객 <strong>0명</strong>
          </span>
          <div className="w-0.5 bg-grayscale-11 h-4"></div>
          <span className="leading-none">
            가망고객 <strong>0명</strong>
          </span>
        </div>
        <SearchField
          placeholder="검색할 내용을 입력하세요"
          className="w-[400px]"
          onSearch={() => {}}
        />
      </div>
      <div className="flex justify-between mt-4 font-normal">
        <div className="flex gap-2">
          <ColorButton color="grayscale-7" icon="delete" title="고객 삭제" />
          <ColorButton color="sub-2" icon="folderOutline" title="그룹 관리" />
          <ColorButton
            color="sub-1"
            icon="plus"
            title="고객 등록"
            onClick={async () => {
              const data = await openCustom<string>(<NewCustomerDialog />);

              if (data === "self") {
                router.push("/program/customer/new");
              }
            }}
          />
        </div>
        <ColorButton color="sub-5" title="엑셀 다운로드" />
      </div>
      <div className="overflow-x-auto mt-4">
        <CustomerTable />
      </div>
    </div>
  );
}
