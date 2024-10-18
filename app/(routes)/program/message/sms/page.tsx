"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import SmsGroupSidebar from "./_components/group-sidebar";
import SmsTable from "./_components/sms-table";
import SmsGroupDialog from "@/app/_components/Dialog/sms/group";

export default function SmsPage() {
  const openCustom = useDialogStore((state) => state.openCustom);
  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto my-10">
      <h1 className="text-3xl font-normal">문자 발송</h1>
      <div className="flex justify-end gap-4">
        <div
          className="px-4 py-3 border border-sub-2 text-sub-2 cursor-pointer"
          onClick={() => {}}
        >
          아침독서 신청하기
        </div>
        <div
          className="px-4 py-3 border border-sub-2 text-sub-2 cursor-pointer"
          onClick={() => openCustom(<SmsGroupDialog />)}
        >
          그룹 추가하기
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <SmsGroupSidebar />
        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <SmsTable />
        </div>
      </div>
    </div>
  );
}
