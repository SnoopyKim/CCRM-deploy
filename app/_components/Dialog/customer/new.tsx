"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import Icon from "../../Icon";

export default function NewCustomerDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  return (
    <div className="flex flex-col md:w-[720px] min-w-96 items-stretch p-8 gap-6">
      <div>
        <h1 className="text-2xl font-medium">고객 등록</h1>
        <p className="mt-1 text-grayscale-5">
          등록할 고객 구분을 선택해주세요.
        </p>
      </div>
      <div className="flex gap-2 h-32 max-lg:h-24 text-lg max-lg:text-sm font-normal">
        <div
          className="flex flex-1 flex-col justify-center items-center gap-2 border border-sub-2 text-sub-2 fill-sub-2 hover:bg-sub-2 hover:bg-opacity-5 cursor-pointer"
          onClick={() => closeDialog?.("self")}
        >
          <Icon
            type="account"
            className="w-10 h-10"
            onClick={() => closeDialog?.("self")}
          />
          <span>직접등록</span>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center gap-2 border border-grayscale-7 text-grayscale-7 fill-grayscale-7 cursor-not-allowed">
          <Icon type="folderOutline" className="w-10 h-10" />
          <span className="text-center px-2">연락처 동기화 (준비중)</span>
        </div>
        <div
          className="flex flex-1 flex-col justify-center items-center gap-2 border border-sub-5 text-sub-5 fill-sub-5 hover:bg-sub-5 hover:bg-opacity-5 cursor-pointer"
          onClick={() => closeDialog?.("excel")}
        >
          <Icon type="mobile" className="w-10 h-10" />
          <span>엑셀 등록</span>
        </div>
      </div>
      <button
        className="bg-main-2 text-grayscale-14 px-4 py-3 hover:bg-main-3 font-medium text-lg"
        onClick={closeDialog}
      >
        닫기
      </button>
    </div>
  );
}
