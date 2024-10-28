"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import Icon from "../../Icon";
import { SearchField, TextArea, TextField } from "../../Text";
import TextLabel from "../../Text/label";
import Select from "../../Select/select";
import { FormEventHandler, useState } from "react";
import { useScheduleStore } from "@/app/_utils/schedule/store";
import {
  addCalendarEvent,
  updateCalendarEvent,
} from "@/app/_services/google/calendar";
import { CalendarEvent } from "@/app/_models/calendar";
import { flushSync } from "react-dom";
import cn from "@/app/_utils/cn";

export default function SchedulePrivateDialog({
  schedule,
}: {
  schedule?: CalendarEvent;
}) {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const { addSchedule, updateSchedule } = useScheduleStore();

  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("private-title") as string;
    const datetime = formData.get("private-datetime") as string;
    const description = formData.get("private-description") as string;

    if (schedule) {
      await handleEditSchedule(title, description, new Date(datetime));
    } else {
      await handleAddSchedule(title, description, new Date(datetime));
    }
  };

  const handleAddSchedule = async (
    title: string,
    description: string,
    date: Date
  ) => {
    flushSync(() => {
      setLoading(true);
    });
    const { data, error } = await addCalendarEvent({
      title,
      description,
      date,
    });

    if (error) {
      console.log(error);
      return;
    }
    setLoading(false);

    addSchedule(data!);
    closeDialog();
  };

  const handleEditSchedule = async (
    title: string,
    description: string,
    date: Date
  ) => {
    flushSync(() => {
      setLoading(true);
    });
    const { data, error } = await updateCalendarEvent({
      id: schedule!.id!,
      title,
      description,
      date,
    });

    if (error) {
      console.log(error);
      return;
    }
    setLoading(false);

    updateSchedule(data!);
    closeDialog();
  };

  const defaultDatetime =
    schedule?.start.dateTime?.slice(0, 16) ??
    new Date(new Date().getTime() + 1000 * 60 * 60 * 9)
      .toISOString()
      .slice(0, 16);

  return (
    <div className="flex flex-col w-[720px] p-8">
      <div className="flex items-center gap-2">
        <Icon type="accountOutline" className="w-8 h-8 fill-sub-5" />
        <h1 className="text-2xl font-normal">
          개인일정 {schedule ? "변경" : "등록"}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-3 gap-4 my-2">
          <div className="col-span-2">
            <TextField
              title="일정 제목"
              id="private-title"
              className="h-12"
              defaultValue={schedule?.summary}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col">
            <TextLabel title="시간 설정" />
            <div className="mt-2 flex flex-1 items-center">
              <input
                type="datetime-local"
                name="private-datetime"
                className="flex-1"
                defaultValue={defaultDatetime}
                disabled={loading}
              />
            </div>
          </div>
        </div>
        <TextArea
          id="description"
          name="private-description"
          label="일정내용"
          placeholder="일정내용 작성 (200자 이내)"
          className="h-32"
          defaultValue={schedule?.description}
          disabled={loading}
        />
        <PrimaryButton
          type="submit"
          color="primary"
          title={schedule ? "저장" : "등록"}
          className="w-full text-lg font-medium mt-4"
          disabled={loading}
        />
      </form>
      <PrimaryButton
        color="gray"
        title="닫기"
        className="w-full text-lg font-medium mt-4"
        onClick={closeDialog}
        disabled={loading}
      />
    </div>
  );
}
