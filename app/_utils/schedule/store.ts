import { CalendarEvent } from "@/app/_models/calendar";
import { create } from "zustand";

const mockSchedules: CalendarEvent[] = [
  {
    id: "0",
    status: "confirmed",
    htmlLink: "",
    created: "2024-10-09",
    updated: "2024-10-09",
    summary: "테스트 고객",
    description: "테스트 고객",
    location: "테스트 고객",
    start: {
      dateTime: "2024-10-09",
    },
    end: {
      dateTime: "2024-10-09",
    },
    iCalUID: "2024-10-09",
    extendedProperties: {
      private: {
        type: "상담",
        customer: "홍길동",
        phone: "010-0000-0000",
      },
    },
  },
];

interface ScheduleStore {
  schedules: CalendarEvent[];
  loadSchedules: (data: CalendarEvent[]) => void;
  addSchedule: (newSchedule: CalendarEvent) => void;
  updateSchedule: (updatedSchedule: CalendarEvent) => void;
  deleteSchedule: (id: string) => void;
}

// Zustand store 정의
export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedules: [], // 초기 스케줄 데이터
  // API에서 데이터를 가져와 초기화하는 액션
  loadSchedules: (data: CalendarEvent[]) => {
    set({ schedules: data });
  },
  // 스케줄 추가
  addSchedule: (newSchedule: CalendarEvent) =>
    set((state: any) => ({
      schedules: [...state.schedules, newSchedule],
    })),
  // 스케줄 수정
  updateSchedule: (updatedSchedule: CalendarEvent) =>
    set((state: any) => ({
      schedules: state.schedules.map((schedule: CalendarEvent) =>
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      ),
    })),
  // 스케줄 삭제
  deleteSchedule: (id: string) =>
    set((state: any) => ({
      schedules: state.schedules.filter(
        (schedule: CalendarEvent) => schedule.id !== id
      ),
    })),
}));
