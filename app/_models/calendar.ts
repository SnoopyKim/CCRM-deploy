export interface CalendarEvent {
  id: string; // 이벤트 ID
  status: "confirmed" | "tentative" | "cancelled"; // 이벤트 상태
  htmlLink: string; // 웹에서 이벤트를 보는 링크
  created: string; // 이벤트 생성 날짜 및 시간 (ISO 8601 형식)
  updated: string; // 이벤트가 마지막으로 수정된 날짜 및 시간 (ISO 8601 형식)
  summary?: string; // 이벤트 제목
  description?: string; // 이벤트 설명
  location?: string; // 이벤트 위치
  colorId?: string; // 이벤트의 색상 ID
  start: {
    date?: string; // 이벤트 시작 날짜 (종일 이벤트일 경우)
    dateTime?: string; // 이벤트 시작 날짜 및 시간 (ISO 8601 형식)
    timeZone?: string; // 이벤트 시작 시간대
  };
  end: {
    date?: string; // 이벤트 종료 날짜 (종일 이벤트일 경우)
    dateTime?: string; // 이벤트 종료 날짜 및 시간 (ISO 8601 형식)
    timeZone?: string; // 이벤트 종료 시간대
  };
  recurringEventId?: string; // 반복 이벤트의 ID
  originalStartTime?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  transparency?: "opaque" | "transparent"; // 이벤트가 시간이 비어 있는지 여부
  visibility?: "default" | "public" | "private"; // 이벤트의 가시성
  iCalUID: string; // 이벤트의 iCalendar UID
  reminders?: {
    useDefault: boolean; // 기본 리마인더 설정 사용 여부
    overrides?: Array<{
      method: "email" | "popup"; // 리마인더 방식
      minutes: number; // 리마인더 시각 (분 단위)
    }>;
  };
  eventType?: "default" | "outOfOffice"; // 이벤트 타입 (예: 기본, 부재 중 등)
  extendedProperties?: {
    private: {
      type: string;
      customer: string;
      phone: string;
      additionalType?: string;
      memo?: string;
    };
  };
}

export const scheduleStyle = {
  tag: {
    상담: "text-sub-2",
    기념: "text-sub-4",
    보험: "text-sub-3",
    개인: "text-sub-5",
  },
  option: {
    보험만기: "text-sub-3 border-sub-3 fill-sub-3 hover:bg-sub-3 ",
    "기념일 등록": "text-sub-4 border-sub-4 fill-sub-4 hover:bg-sub-4 ",
    "상담 등록": "text-sub-2 border-sub-2 fill-sub-2 hover:bg-sub-2",
    "개인일정 등록": "text-sub-5 border-sub-5 fill-sub-5 hover:bg-sub-5",
  },
};
