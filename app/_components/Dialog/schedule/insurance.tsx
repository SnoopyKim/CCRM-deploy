"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import Icon from "../../Icon";
import { SearchField } from "../../Text";
import { addCalendarEvent } from "@/app/_services/google/calendar";
import { useScheduleStore } from "@/app/_utils/schedule/store";
import { useCallback, useState } from "react";
import TextLabel from "../../Text/label";
import { CalendarEvent } from "@/app/_models/calendar";

const mockCustomers = [
  {
    name: "홍길동",
    phone: "010-8513-3549",
    car: [
      {
        company: "AIG손해보험",
        date: "2024-10-21",
        memo: "특이사항입니다",
      },
      {
        company: "AIG손해보험",
        date: "2024-10-21",
        memo: "다른 보험사는 무엇이 있을까",
      },
    ],
    fire: [
      {
        company: "AIG손해보험",
        date: "2024-10-21",
        memo: "",
      },
    ],
    waiver: [
      {
        date: "2024-10-21",
        memo: "",
      },
    ],
  },
];

export default function ScheduleInsuranceDialog({
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
    async ({
      insurance,
      date,
      memo,
    }: {
      insurance: string;
      date: Date;
      memo: string;
    }) => {
      setLoading(true);
      const { data, error } = await addCalendarEvent({
        title: selectedCustomer.name,
        date: date,
        custom: {
          type: "보험",
          customer: selectedCustomer.name,
          phone: selectedCustomer.phone,
          additionalType: insurance,
          memo,
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
    <div className="flex flex-col w-[800px] 2xl:w-[1000px] p-8 gap-4">
      <div className="flex items-center gap-2">
        <Icon type="flag" className="w-8 h-8 fill-sub-3" />
        <h1 className="text-2xl font-normal">보험만기 등록</h1>
      </div>
      <SearchField
        placeholder="이름, 연락처를 입력하세요"
        onSearch={() => {}}
        disabled={loading}
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
            {selectedCustomer.car.map((car: any) => (
              <div key={car.date} className="flex items-center gap-4 p-2">
                <span>{car.company}</span>
                <span>만기일: {car.date}</span>
                <span className="flex-1 line-clamp-1">{car.memo}</span>
                <button
                  className="bg-main-2 text-grayscale-14 px-4 py-1.5 text-sm rounded font-normal hover:bg-main-3"
                  onClick={() =>
                    onAddSchedule({
                      insurance: "자동차보험 만기",
                      date: new Date(car.date),
                      memo: car.memo,
                    })
                  }
                  disabled={loading}
                >
                  등록
                </button>
              </div>
            ))}
          </div>
          <TextLabel title="화재보험 만기" className="mt-2" />
          <div className="mt-2 px-4 py-2 border border-grayscale-11 rounded divide-y divide-grayscale-11">
            {selectedCustomer.fire.map((fire: any) => (
              <div key={fire.date} className="flex items-center gap-4 p-2">
                <span>{fire.company}</span>
                <span>만기일: {fire.date}</span>
                <span className="flex-1 line-clamp-1">{fire.memo}</span>
                <button
                  className="bg-main-2 text-grayscale-14 px-4 py-1.5 text-sm rounded font-normal hover:bg-main-3"
                  onClick={() =>
                    onAddSchedule({
                      insurance: "화재보험 만기",
                      date: new Date(fire.date),
                      memo: fire.memo,
                    })
                  }
                  disabled={loading}
                >
                  등록
                </button>
              </div>
            ))}
          </div>
          <TextLabel title="면책/감액 종료일" className="mt-2" />
          <div className="mt-2 px-4 py-2 border border-grayscale-11 rounded divide-y divide-grayscale-11">
            {selectedCustomer.waiver.map((waiver: any) => (
              <div key={waiver.date} className="flex items-center gap-4 p-2">
                <span>종료일: {waiver.date}</span>
                <span className="flex-1 line-clamp-1">{waiver.memo}</span>
                <button
                  className="bg-main-2 text-grayscale-14 px-4 py-1.5 text-sm rounded font-normal hover:bg-main-3"
                  onClick={() =>
                    onAddSchedule({
                      insurance: "면책/감액 종료일",
                      date: new Date(waiver.date),
                      memo: waiver.memo,
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
