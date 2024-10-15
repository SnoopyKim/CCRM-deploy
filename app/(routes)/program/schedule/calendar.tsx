"use client";

import { useState, useEffect } from "react";
import { ProgramSchedule } from "@/app/_types/model";
import { title } from "process";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const testSchedule = {
    type: "상담",
    title: "테스트 고객",
    year: 2024,
    month: 10,
    day: 1,
    memo: "테스트를 해야합니다",
  };
  const schedules: ProgramSchedule[] = [testSchedule];
  const year = 2024;
  const month = 10;

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/calendar");
      const data = await res.json();
      setEvents(data);
    }

    fetchEvents();
  }, []);

  const renderDays = () => {
    const lastDaysInMonth = new Date(year, month - 1, 0).getDate();
    const daysInMonth = new Date(year, month, 0).getDate(); // 현재 달의 총 일수
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 해당 달의 첫 번째 요일

    let days = [];
    let nextMonthDay = 1; // 다음 달 일수 표시할 변수

    // 빈 칸 추가 (월 시작 전에 일요일까지 공백으로 채우기)
    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(
        <div
          key={`empty-${i}`}
          className="w-full border-grayscale-12 border-b border-r text-gray-400"
        >
          <span className="text-xs absolute mt-1 ml-1 text-grayscale-10">
            {lastDaysInMonth - i + 1}
          </span>
        </div>,
      );
    }

    // 현재 달의 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const eventForTheDay = events.filter((event) => {
        const eventDate = new Date();
        // event.start.date || event.start.dateTime
        return eventDate.getDate() === day;
      });

      days.push(
        <div
          key={day}
          className="relative border-grayscale-12 border-b border-r"
        >
          <div className="absolute mt-1 ml-1 text-xs">{day}</div>
          {eventForTheDay.length > 0 && (
            <div className="absolute bottom-1 left-1 ">
              {eventForTheDay.map((event) => (
                <div key={event}>{event}</div>
              ))}
            </div>
          )}
        </div>,
      );
    }

    // 남은 빈 칸을 다음 달 날짜로 채우기
    const totalCells = firstDayOfMonth + daysInMonth;
    const remainingCells = 42 - totalCells; // 총 42칸 (7열 x 6행) 기준

    for (let i = 0; i < remainingCells; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="w-full border-grayscale-12 border-b border-r"
        >
          <span className="absolute mt-1 ml-1 text-xs text-grayscale-10">
            {i + 1}
          </span>
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="flex-col w-full h-full justify-between">
      <div className="flex w-full justify-center">
        <span className="text-3xl">{month}월</span>
      </div>
      <div className="grid grid-cols-7">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div
            key={day}
            className={`border-grayscale-12 border-b border-r text-center text-xs bg-grayscale-12 ${
              day === "일"
                ? "text-sub-4"
                : day === "토"
                ? "text-sub-2"
                : "text-grayscale-2"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="w-full h-full grid grid-cols-7 grid-rows-6 border-grayscale-12 border-t border-l">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
