"use client";

import cn from "@/app/_utils/cn";
import { Schedule } from "./calendar-view";
import useDialogStore from "@/app/_utils/dialog/store";
import ScheduleDialog from "@/app/_components/Dialog/schedule/default";
import ScheduleInsuranceDialog from "@/app/_components/Dialog/schedule/insurance";
import ScheduleAnniversaryDialog from "@/app/_components/Dialog/schedule/anniversary";
import ScheduleCounselDialog from "@/app/_components/Dialog/schedule/counsel";
import SchedulePrivateDialog from "@/app/_components/Dialog/schedule/private";

const tagStyles = {
  상담: "text-sub-2",
  기념: "text-sub-4",
  보험: "text-sub-3",
  개인: "text-sub-5",
};

export default function CalendarItem({
  date,
  schedules = [],
  color = "main-1",
  isFirst = false,
  isCurrent = true,
}: {
  date: Date;
  schedules?: Schedule[];
  color?: string;
  isFirst?: boolean;
  isCurrent?: boolean;
}) {
  const openCustom = useDialogStore((state) => state.openCustom);

  const openScheduleDialog = async () => {
    const data = await openCustom<string>(
      <ScheduleDialog date={date} schedules={schedules} />
    );
    switch (data) {
      case "보험":
        openCustom(<ScheduleInsuranceDialog />);
        break;
      case "기념":
        openCustom(<ScheduleAnniversaryDialog />);
        break;
      case "상담":
        openCustom(<ScheduleCounselDialog />);
        break;
      case "개인":
        openCustom(<SchedulePrivateDialog />);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={cn(
        `flex flex-col aspect-square p-2 text-${color} hover:bg-grayscale-13 cursor-pointer`,
        isFirst && "border-t border-l border-grayscale-12",
        !isCurrent && "opacity-50"
      )}
      onClick={openScheduleDialog}
    >
      <span className="font-normal">{date.getDate()}</span>
      <div className="flex flex-1 flex-col mt-2 text-sm gap-1 overflow-y-hidden">
        {schedules.slice(0, 3).map((schedule, i) => (
          <div
            key={`schedule-${date}-${i}`}
            className="flex items-center gap-2 font-medium"
          >
            <span
              className={tagStyles[schedule.type as keyof typeof tagStyles]}
            >
              [{schedule.type}]
            </span>
            <span className="flex-1 line-clamp-1">{schedule.title}</span>
          </div>
        ))}
        {schedules.length > 3 && (
          <strong className="text-base font-medium">
            +{schedules.length - 3}
          </strong>
        )}
      </div>
    </div>
  );
}
