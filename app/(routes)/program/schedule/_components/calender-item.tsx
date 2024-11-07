"use client";

import cn from "@/app/_utils/cn";
import useDialogStore from "@/app/_utils/dialog/store";
import ScheduleDialog from "@/app/_components/Dialog/schedule/default";
import ScheduleInsuranceDialog from "@/app/_components/Dialog/schedule/insurance";
import ScheduleAnniversaryDialog from "@/app/_components/Dialog/schedule/anniversary";
import ScheduleCounselDialog from "@/app/_components/Dialog/schedule/counsel";
import SchedulePrivateDialog from "@/app/_components/Dialog/schedule/private";
import { CalendarEvent, scheduleStyle } from "@/app/_models/calendar";

export default function CalendarItem({
  date,
  schedules = [],
  color = "main-1",
  isFirst = false,
  isCurrent = true,
}: {
  date: Date;
  schedules?: CalendarEvent[];
  color?: string;
  isFirst?: boolean;
  isCurrent?: boolean;
}) {
  const openCustom = useDialogStore((state) => state.openCustom);

  const openScheduleDialog = async () => {
    const data = await openCustom<any>(
      <ScheduleDialog date={date} schedules={schedules} />
    );
    if (data && data.option === "edit") {
      switch (data.schedule.extendedProperties?.private.type) {
        case "보험":
          openCustom(<ScheduleInsuranceDialog schedule={data.schedule} />);
          break;
        case "기념":
          openCustom(<ScheduleAnniversaryDialog schedule={data.schedule} />);
          break;
        case "상담":
          openCustom(<ScheduleCounselDialog schedule={data.schedule} />);
          break;
        default:
          openCustom(<SchedulePrivateDialog schedule={data.schedule} />);
          break;
      }
    }
  };

  return (
    <div
      className={cn(
        `flex flex-col max-md:h-20 md:aspect-square p-1 lg:p-2 text-${color} hover:bg-grayscale-13 cursor-pointer`,
        isFirst && "border-t border-l border-grayscale-12",
        !isCurrent && "opacity-50"
      )}
      onClick={openScheduleDialog}
    >
      <span className="font-normal text-xs md:text-sm">{date.getDate()}</span>
      <div className="flex flex-1 flex-col md:mt-2 text-[0.5rem] md:text-sm lg:gap-1 overflow-y-hidden">
        {schedules.slice(0, 3).map((schedule, i) => (
          <div
            key={`schedule-${date}-${i}`}
            className="flex items-center gap-1 lg:gap-2 font-medium"
          >
            <span
              className={
                scheduleStyle.tag[
                  (schedule.extendedProperties?.private.type ||
                    "개인") as keyof typeof scheduleStyle.tag
                ]
              }
            >
              [{schedule.extendedProperties?.private.type || "개인"}]
            </span>
            <span className="flex-1 line-clamp-1 pt-px">
              {schedule.summary}
            </span>
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
