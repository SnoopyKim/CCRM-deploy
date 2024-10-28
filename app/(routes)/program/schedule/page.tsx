"use client";

import { useEffect } from "react";
import CalendarView from "./_components/calendar-view";
import { getCalendarEvents } from "@/app/_services/google/calendar";
import useDialogStore from "@/app/_utils/dialog/store";
import { useScheduleStore } from "@/app/_utils/schedule/store";

export default function ScheduleListPage() {
  const { openAlert, openLoading, closeDialog } = useDialogStore();
  const loadSchedules = useScheduleStore((state) => state.loadSchedules);

  useEffect(() => {
    async function fetchEvents() {
      openLoading("구글 캘린더 연동중...");
      const { data, error } = await getCalendarEvents();
      closeDialog();
      if (error) {
        openAlert({
          title: "구글 캘린더 연동 실패",
          description: error,
        });
        return;
      }
      loadSchedules(data!);
    }
    fetchEvents();
  }, [loadSchedules]);

  return (
    <div className="flex flex-col max-w-screen-lg w-full mx-auto gap-5 my-10">
      <h1 className="text-2xl font-normal">일정관리</h1>
      <CalendarView />
    </div>
  );
}
