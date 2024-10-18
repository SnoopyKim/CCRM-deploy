import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import { SearchField, TextField } from "../../Text";
import TextLabel from "../../Text/label";

export default function SmsGroupDialog({ groupName }: { groupName?: string }) {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  return (
    <div className="flex flex-col w-[640px] gap-4">
      <div className="px-6 py-4 border-b border-b-grayscale-11">
        <h2 className="text-xl font-normal">
          그룹 {groupName ? "수정" : "추가"}하기
        </h2>
      </div>
      <div className="px-6">
        <TextLabel title="그룹 명" />
        <SearchField
          className="mt-2"
          placeholder="멤버 명을 입력하세요"
          value={groupName}
          onSearch={() => {}}
        />
      </div>
      <div className="px-6">
        <TextField
          title="호칭 관리"
          placeholder="멤버 호칭을 작성해주세요. (선택)"
        />
      </div>
      <div className="flex justify-between px-6 pb-6">
        <PrimaryButton
          title="취소"
          color="gray"
          className="w-20 h-10 rounded text-base"
          onClick={closeDialog}
        />
        <PrimaryButton
          title="추가"
          color="primary"
          className="w-20 h-10 rounded text-base"
          onClick={() => closeDialog()}
        />
      </div>
    </div>
  );
}
