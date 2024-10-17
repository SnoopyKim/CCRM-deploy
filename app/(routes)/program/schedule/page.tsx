"use client";

import { useState } from "react";
import CalendarView from "./_components/calendar-view";

export default function ScheduleListPage() {
  return (
    <div className="flex flex-col max-w-screen-lg w-full mx-auto gap-5 my-10">
      <h1 className="text-2xl font-normal">일정관리</h1>
      <CalendarView />
    </div>
  );
}
