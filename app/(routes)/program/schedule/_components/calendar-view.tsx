"use client";

import { useState, useEffect } from "react";
import CalendarItem from "./calender-item";
import Icon from "@/app/_components/Icon";

export type Schedule = {
  type: string;
  date: string;
  time?: string;
  title: string;
};

const mockSchedules: Schedule[] = [
  {
    type: "상담",
    date: "2024-10-08",
    time: "09:00",
    title: "테스트 고객",
  },
  {
    type: "상담",
    date: "2024-10-09",
    time: "09:00",
    title: "테스트 고객",
  },
  {
    type: "개인",
    date: "2024-10-09",
    time: "09:00",
    title: "맛집 가기",
  },
  {
    type: "기념",
    date: "2024-10-09",
    time: "09:00",
    title: "테스트 고객",
  },
  {
    type: "상담",
    date: "2024-10-09",
    time: "09:00",
    title: "테스트 고객",
  },
  {
    type: "상담",
    date: "2024-10-09",
    time: "09:00",
    title: "테스트 고객",
  },
];

const CalendarView = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    // TODO: 스케줄 정보 가져오기
    // async function fetchEvents() {
    //   const res = await fetch("/api/calendar");
    //   const data = await res.json();
    //   setEvents(data);
    // }
    // fetchEvents();
  }, []);

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
        const scheduleDate = new Date(s.date); // s.date를 Date 객체로 변환
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

  return (
    <div className="flex flex-col w-full h-full justify-between items-center">
      <h2 className="text-xl text-grayscale-6 font-normal">{selectedYear}</h2>
      <div className="flex items-center gap-6 mt-2 mb-4">
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
