"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import Icon from "../../Icon";
import { SearchField, TextArea } from "../../Text";
import TextLabel from "../../Text/label";
import Select from "../../Select/select";

export default function SchedulePrivateDialog() {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  return (
    <div className="flex flex-col w-[800px] 2xl:w-[1000px] p-8 gap-6">
      <div className="flex items-center gap-2">
        <Icon type="accountOutline" className="w-8 h-8 fill-sub-5" />
        <h1 className="text-2xl font-normal">개인일정 등록</h1>
      </div>
      <div>
        <TextLabel title="시간 설정" />
        <div className="flex gap-2 mt-2">
          <div className="flex-1">
            <Select
              options={Array.from({ length: 24 }, (_, i) => ({
                value: i,
                text: i.toString().padStart(2, "0") + "시",
              }))}
              className="h-12 py-2"
            />
          </div>
          <div className="flex-1">
            <Select
              options={Array.from({ length: 60 }, (_, i) => ({
                value: i,
                text: i.toString().padStart(2, "0") + "분",
              }))}
              className="h-12 py-2"
            />
          </div>
        </div>
      </div>
      <TextArea
        label="일정내용"
        placeholder="일정내용 작성 (200자 이내)"
        className="h-32"
      />
      <PrimaryButton
        color="gray"
        title="닫기"
        className="w-full text-lg font-medium"
        onClick={closeDialog}
      />
    </div>
  );
}
