"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import cn from "@/app/_utils/cn";
import Icon, { IconType } from "../../Icon";
import { CalendarEvent, scheduleStyle } from "@/app/_models/calendar";
import { deleteCalendarEvent } from "@/app/_services/google/calendar";
import { useScheduleStore } from "@/app/_utils/schedule/store";
import { useState } from "react";
import { flushSync } from "react-dom";

export default function ScheduleDialog({
  date,
  schedules = [],
}: {
  date: Date;
  schedules?: CalendarEvent[];
}) {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const deleteSchedule = useScheduleStore((state) => state.deleteSchedule);

  const [events, setEvents] = useState<CalendarEvent[]>(schedules);
  const [loading, setLoading] = useState(false);

  const [typedSchedules, customSchedules] = events.reduce(
    (acc, curr) => {
      if (curr.extendedProperties !== undefined) {
        acc[0].push(curr); // 조건에 맞는 요소는 첫 번째 배열로
      } else {
        acc[1].push(curr); // 조건에 맞지 않는 요소는 두 번째 배열로
      }
      return acc;
    },
    [[], []] as [CalendarEvent[], CalendarEvent[]] // 초기 값으로 두 개의 빈 배열
  );

  const handleEdit = (schedule: CalendarEvent) => {
    closeDialog({
      option: "edit",
      schedule,
    });
  };
  const handleDelete = async (id: string) => {
    flushSync(() => {
      setLoading(true);
    });
    const success = await deleteCalendarEvent(id);
    setLoading(false);
    if (success) {
      deleteSchedule(id);
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  return (
    <div className="relative flex flex-col md:w-[600px] lg:w-[800px] 2xl:w-[1000px] p-8 gap-6 ">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-grayscale-11 bg-opacity-50 flex items-center justify-center">
          <div className="w-20 h-20 border-8 border-main-2 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <h1 className="text-2xl font-medium">{`${
        date.getMonth() + 1
      }월 ${date.getDate()}일`}</h1>
      <div className="flex justify-end items-center gap-2">
        <p className="font-medium">
          보험만기{" "}
          <span className="text-sub-2">
            {
              schedules.filter(
                (s) => s.extendedProperties?.private.type === "보험"
              ).length
            }
            건
          </span>
        </p>
        |
        <p className="font-medium">
          기념일{" "}
          <span className="text-sub-2">
            {
              schedules.filter(
                (s) => s.extendedProperties?.private.type === "기념"
              ).length
            }
            건
          </span>
        </p>
        |
        <p className="font-medium">
          상담{" "}
          <span className="text-sub-2">
            {
              schedules.filter(
                (s) => s.extendedProperties?.private.type === "상담"
              ).length
            }
            건
          </span>
        </p>
        |
        <p className="font-medium">
          개인일정{" "}
          <span className="text-sub-2">{customSchedules.length}건</span>
        </p>
      </div>
      {typedSchedules.length > 0 && (
        <ScheduleTable
          schedules={typedSchedules}
          // onEditSchedule={handleEdit}
          onDeleteSchedule={handleDelete}
        />
      )}
      {customSchedules.length > 0 && (
        <div className="flex flex-col py-6 border-t border-b border-grayscale-11">
          <h2 className="text-xl mb-2">개인일정</h2>
          {customSchedules.map((schedule) => (
            <div key={schedule.id} className="flex items-center gap-2 mt-2">
              <div className="flex flex-col">
                <span className="font-medium">{schedule.summary}</span>
                <span className="text-grayscale-9 text-sm">
                  {new Date(schedule.start.dateTime!).toLocaleTimeString(
                    "ko-KR",
                    { hour: "numeric", minute: "numeric" }
                  )}
                </span>
              </div>
              <div className="flex-1 mx-2">{schedule.description}</div>
              <button
                className="bg-grayscale-7 text-grayscale-14 px-4 py-1 text-sm rounded font-normal  hover:bg-main-2"
                onClick={() => handleEdit(schedule)}
              >
                수정
              </button>
              <button
                className="bg-grayscale-14 px-4 py-1 text-sm rounded font-normal border border-grayscale-5 text-grayscale-5 hover:text-grayscale-14 hover:border-main-2 hover:bg-main-2"
                onClick={() => handleDelete(schedule.id)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
      {typedSchedules.length === 0 && customSchedules.length === 0 && (
        <div className="flex flex-col py-6 border-t border-b border-grayscale-11">
          <h2 className="text-xl text-center text-grayscale-6">
            등록된 일정이 없습니다
          </h2>
        </div>
      )}
      <PrimaryButton
        color="gray"
        title="닫기"
        className="w-full text-lg font-medium"
        onClick={closeDialog}
      />
    </div>
  );
}

const ScheduleTable = ({
  schedules,
  onEditSchedule,
  onDeleteSchedule,
}: {
  schedules: CalendarEvent[];
  onEditSchedule?: (schedule: CalendarEvent) => void;
  onDeleteSchedule: (id: string) => void;
}) => {
  const renderRow = (schedule: CalendarEvent) => {
    const { type, customer, phone, additionalType } =
      schedule.extendedProperties?.private || {};
    return (
      <tr
        key={schedule.id}
        className="table table-fixed w-full border-b border-grayscale-11"
      >
        <td className="px-2 font-medium w-20 lg:w-32">{customer}</td>
        <td
          className={
            scheduleStyle.tag[type as keyof typeof scheduleStyle.tag] +
            " font-medium"
          }
        >
          {type}
          {additionalType && ` [${additionalType}]`}
        </td>
        <td className="max-lg:w-28">{phone}</td>
        <td className="p-2 w-20 lg:w-28">
          <div className="flex gap-2 justify-end">
            {/* <button
              className="bg-grayscale-5 text-grayscale-14 px-4 py-1 text-sm rounded font-normal hover:bg-main-2"
              onClick={() => onEditSchedule(schedule)}
            >
              수정
            </button> */}
            <button
              className="bg-grayscale-14 px-4 py-1 text-sm rounded font-normal border border-grayscale-5 text-grayscale-5 hover:text-grayscale-14 hover:border-main-2 hover:bg-main-2"
              onClick={() => onDeleteSchedule(schedule.id)}
            >
              삭제
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="table table-fixed w-full bg-grayscale-12">
          <th className="text-left p-2 w-20 lg:w-32">고객명</th>
          <th className="text-left ">구분</th>
          <th className="text-left max-lg:w-28">연락처</th>
          <th className="text-left w-20 lg:w-28"></th>
        </tr>
      </thead>
      <tbody className="block w-full max-h-80 overflow-y-scroll">
        {schedules.map(renderRow)}
      </tbody>
    </table>
  );
};
