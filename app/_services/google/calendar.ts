"use client";

import { CalendarEvent } from "@/app/_models/calendar";
import { googleRequest } from "@/app/_utils/axios/google";

export async function getCalendarEvents(): Promise<{
  data?: CalendarEvent[];
  error?: string;
}> {
  const { data, error } = await googleRequest(
    "/calendar/v3/calendars/primary/events",
    { method: "GET" }
  );

  if (error) {
    return { error };
  }
  return { data: (data.items || []) as CalendarEvent[] };
}

export async function addCalendarEvent({
  title,
  description,
  date,
  custom,
}: {
  title: string;
  description?: string;
  date: Date;
  custom?: Object;
}): Promise<{
  data?: CalendarEvent;
  error?: string;
}> {
  const endDate = new Date(date);
  endDate.setHours(endDate.getHours() + 1);

  const { data, error } = await googleRequest(
    "/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        summary: title,
        description,
        start: {
          dateTime: date.toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: "UTC",
        },
        reminders: {
          useDefault: true,
        },
        extendedProperties: {
          private: custom,
        },
      },
    }
  );

  if (error) {
    return { error };
  }
  return { data };
}

export async function updateCalendarEvent({
  id,
  title,
  description,
  date,
  custom,
}: {
  id: string;
  title?: string;
  description?: string;
  date?: Date;
  custom?: Object;
}): Promise<{
  data?: CalendarEvent;
  error?: string;
}> {
  const dataToUpdate: any = {};

  if (title) {
    dataToUpdate.summary = title;
  }

  if (description) {
    dataToUpdate.description = description;
  }

  if (date) {
    const endDate = new Date(date);
    endDate.setHours(endDate.getHours() + 1);

    dataToUpdate.start = {
      dateTime: date.toISOString(),
      timeZone: "UTC",
    };

    dataToUpdate.end = {
      dateTime: endDate.toISOString(),
      timeZone: "UTC",
    };
  }

  if (custom) {
    dataToUpdate.extendedProperties = {
      private: custom,
    };
  }

  // 기본 리마인더 설정은 항상 포함
  dataToUpdate.reminders = {
    useDefault: true,
  };

  const { data, error } = await googleRequest(
    `/calendar/v3/calendars/primary/events/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataToUpdate, // 동적으로 구성된 데이터 객체
    }
  );

  if (error) {
    return { error };
  }
  return { data };
}

export async function deleteCalendarEvent(id: string): Promise<boolean> {
  const { data, error } = await googleRequest(
    `/calendar/v3/calendars/primary/events/${id}`,
    { method: "DELETE" }
  );

  return !error;
}
