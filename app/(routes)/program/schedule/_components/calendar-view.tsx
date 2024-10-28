"use client";

import { useState, useEffect } from "react";
import CalendarItem from "./calender-item";
import Icon, { IconType } from "@/app/_components/Icon";
import { apiRequest } from "@/app/_utils/axios/client";
import useDialogStore from "@/app/_utils/dialog/store";
import { getCalendarEvents } from "@/app/_services/google/calendar";
import { CalendarEvent, scheduleStyle } from "@/app/_models/calendar";
import { useScheduleStore } from "@/app/_utils/schedule/store";
import cn from "@/app/_utils/cn";
import ScheduleInsuranceDialog from "@/app/_components/Dialog/schedule/insurance";
import ScheduleAnniversaryDialog from "@/app/_components/Dialog/schedule/anniversary";
import ScheduleCounselDialog from "@/app/_components/Dialog/schedule/counsel";
import SchedulePrivateDialog from "@/app/_components/Dialog/schedule/private";

const CalendarView = () => {
  const { openAlert, openCustom } = useDialogStore();
  const schedules = useScheduleStore((state) => state.schedules);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const setPrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(12);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const setNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const renderDays = () => {
    const lastDaysInMonth = new Date(
      selectedYear,
      selectedMonth - 1,
      0
    ).getDate();
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate(); // 현재 달의 총 일수
    const firstDayOfMonth = new Date(
      selectedYear,
      selectedMonth - 1,
      1
    ).getDay(); // 해당 달의 첫 번째 요일

    let days = [];

    // 빈 칸 추가 (월 시작 전에 일요일까지 공백으로 채우기)
    for (let i = 0; i < 35; i++) {
      let month = selectedMonth,
        day = 0;
      let isCurrent = true;
      if (i < firstDayOfMonth) {
        month -= 1;
        day = lastDaysInMonth - firstDayOfMonth + i + 1;
        isCurrent = false;
      } else if (i < firstDayOfMonth + daysInMonth) {
        day = i - firstDayOfMonth + 1;
      } else {
        month += 1;
        day = i - firstDayOfMonth - daysInMonth + 1;
        isCurrent = false;
      }
      const date = new Date(selectedYear, month - 1, day);
      const scheduleForTheDay = schedules.filter((s) => {
        const scheduleDate = new Date(s.start.dateTime || 0); // s.date를 Date 객체로 변환
        return (
          scheduleDate.getFullYear() === date.getFullYear() &&
          scheduleDate.getMonth() === date.getMonth() &&
          scheduleDate.getDate() === date.getDate()
        );
      });

      days.push(
        <CalendarItem
          key={`${month}-${day}`}
          date={date}
          schedules={scheduleForTheDay}
          color={i % 7 === 0 ? "sub-4" : i % 7 === 6 ? "sub-2" : "main-1"}
          isFirst={i === 0}
          isCurrent={isCurrent}
        />
      );
    }

    return days;
  };

  const onSelectAdd = (type: string) => {
    switch (type) {
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
    <div className="flex flex-col w-full h-full ">
      <div className="flex items-center mt-2 mb-4">
        <div className="flex flex-col items-center">
          <h2 className="text-xl text-grayscale-6 font-normal">
            {selectedYear}
          </h2>
          <div className="flex items-center gap-4 mt-2">
            <Icon
              type="down"
              className="w-10 h-10 p-1.5 rotate-90 rounded cursor-pointer hover:bg-grayscale-12"
              onClick={setPrevMonth}
            />
            <h1 className="text-4xl font-normal">{selectedMonth}월</h1>
            <Icon
              type="down"
              className="w-10 h-10 p-1.5 -rotate-90 rounded cursor-pointer hover:bg-grayscale-12"
              onClick={setNextMonth}
            />
          </div>
        </div>
        <div className="flex flex-1 gap-2 justify-end">
          <Option
            icon="flag"
            text="보험만기"
            onClick={() => onSelectAdd("보험")}
          />
          <Option
            icon="heart"
            text="기념일 등록"
            onClick={() => onSelectAdd("기념")}
          />
          <Option
            icon="calendar"
            text="상담 등록"
            onClick={() => onSelectAdd("상담")}
          />
          <Option
            icon="accountOutline"
            text="개인일정 등록"
            onClick={() => onSelectAdd("개인")}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-7">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div
            key={day}
            className={`flex  bg-grayscale-12 justify-center items-center py-1 ${
              day === "일"
                ? "text-sub-4"
                : day === "토"
                ? "text-sub-2"
                : "text-main-1"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-7 grid-rows-5 border-b border-r border-grayscale-12 divide-x divide-y divide-grayscale-12">
        {renderDays()}
      </div>
    </div>
  );
};

export default CalendarView;

const Option = ({
  icon,
  text,
  onClick,
}: {
  icon: IconType;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        "w-40 flex flex-col items-center py-3 gap-1 cursor-pointer border hover:bg-opacity-5",
        scheduleStyle.option[text as keyof typeof scheduleStyle.option]
      )}
      onClick={onClick}
    >
      <Icon type={icon} />
      <span className="font-medium">{text}</span>
    </div>
  );
};
