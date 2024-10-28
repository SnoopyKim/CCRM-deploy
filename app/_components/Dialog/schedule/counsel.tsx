"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import Icon from "../../Icon";
import { SearchField } from "../../Text";
import { useScheduleStore } from "@/app/_utils/schedule/store";
import { useCallback, useState } from "react";
import { addCalendarEvent } from "@/app/_services/google/calendar";
import TextLabel from "../../Text/label";
import { CalendarEvent } from "@/app/_models/calendar";

const mockCustomers = [
  {
    name: "홍길동",
    phone: "010-8513-3549",
    counsel: [
      {
        title: "상품 제안",
        date: "2024-10-21",
        location: "경기 성남시 분당구 대왕판교로 670",
      },
    ],
  },
];

export default function ScheduleCounselDialog({
  schedule,
}: {
  schedule?: CalendarEvent;
}) {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const addSchedule = useScheduleStore((state) => state.addSchedule);

  const [customers, setCustomers] = useState<any>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<any>();
  const [loading, setLoading] = useState(false);

  const onAddSchedule = useCallback(
    async ({ title, date }: { title: string; date: Date }) => {
      setLoading(true);
      date.setHours(9);
      const { data, error } = await addCalendarEvent({
        title: selectedCustomer.name,
        date,
        custom: {
          type: "상담",
          customer: selectedCustomer.name,
          phone: selectedCustomer.phone,
          additionalType: title,
        },
      });
      setLoading(false);

      if (!error && data) {
        addSchedule(data);
        closeDialog?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCustomer]
  );
  return (
    <div className="flex flex-col w-[800px] 2xl:w-[1000px] p-8 gap-6">
      <div className="flex items-center gap-2">
        <Icon type="calendar" className="w-8 h-8 fill-sub-2" />
        <h1 className="text-2xl font-normal">상담 등록</h1>
      </div>
      <SearchField
        placeholder="이름, 연락처를 입력하세요"
        onSearch={() => {}}
      />
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-grayscale-12">
            <th className="text-left px-4 py-2">고객명</th>
            <th className="text-left ">연락처</th>
            <th className="text-left w-28"></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: any) => (
            <tr key={customer.name} className="border-b border-grayscale-12">
              <td className="px-4 font-normal">{customer.name}</td>
              <td className="">{customer.phone}</td>
              <td className="px-2 py-3">
                <button
                  className="bg-grayscale-14 text-grayscale-6 w-full py-1 text-sm rounded font-normal border border-grayscale-6 disabled:bg-grayscale-12"
                  disabled={customer.name === selectedCustomer?.name || loading}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  선택
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCustomer && (
        <div className="flex flex-col">
          <TextLabel title="자동차보험 만기" />
          <div className="mt-2 px-4 py-2 border border-grayscale-11 rounded divide-y divide-grayscale-11">
            {selectedCustomer.counsel.map((counsel: any) => (
              <div key={counsel.title} className="flex items-center gap-4 p-2">
                <span className="font-medium">{counsel.title}</span>
                <span>{counsel.date}</span>
                <span className="flex-1">{counsel.location}</span>
                <button
                  className="bg-main-2 text-grayscale-14 px-4 py-1.5 text-sm rounded font-normal hover:bg-main-3"
                  onClick={() =>
                    onAddSchedule({
                      title: counsel.title,
                      date: new Date(counsel.date),
                    })
                  }
                  disabled={loading}
                >
                  등록
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <PrimaryButton
        color="gray"
        title="닫기"
        className="w-full text-lg font-medium"
        onClick={closeDialog}
        disabled={loading}
      />
    </div>
  );
}
