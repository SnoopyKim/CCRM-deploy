"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import Icon from "../../Icon";
import { SearchField } from "../../Text";
import { useCallback, useEffect, useState } from "react";
import { addCalendarEvent } from "@/app/_services/google/calendar";
import { useScheduleStore } from "@/app/_utils/schedule/store";
import TextLabel from "../../Text/label";
import { CalendarEvent } from "@/app/_models/calendar";
import ClientModel, { Anniversary } from "@/app/_models/client";
import { ClientDao } from "@/app/_utils/database/dao/clientDao";

const mockCustomers = [
  {
    name: "홍길동",
    phone: "010-8513-3549",
    anniversary: [
      {
        name: "고객님 생일",
        date: "2024-10-21",
      },
    ],
  },
];

export default function ScheduleAnniversaryDialog({
  schedule,
}: {
  schedule?: CalendarEvent;
}) {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const addSchedule = useScheduleStore((state) => state.addSchedule);

  const [customers, setCustomers] = useState<ClientModel[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ClientModel>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customers.length > 0) return;
    new ClientDao().getAllClients().then((clients) => {
      if (clients.length === 0) return;
      setCustomers(clients);
    });
  }, [customers]);

  const onAddSchedule = useCallback(
    async ({ name, date }: { name: string; date: Date }) => {
      if (!selectedCustomer) return;
      setLoading(true);
      date.setHours(9);
      const { data, error } = await addCalendarEvent({
        title: selectedCustomer.name,
        date,
        custom: {
          type: "기념",
          customer: selectedCustomer.name,
          phone: selectedCustomer.contactNumber,
          additionalType: name,
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
    <div className="flex flex-col md:w-[720px] p-8 gap-6">
      <div className="flex items-center gap-2">
        <Icon type="heart" className="w-8 h-8 fill-sub-4" />
        <h1 className="text-2xl font-normal">기념일 등록</h1>
      </div>

      {selectedCustomer ? (
        <AnnivListView
          customer={selectedCustomer}
          onAdd={onAddSchedule}
          onBack={() => setSelectedCustomer(undefined)}
        />
      ) : (
        <>
          <SearchField
            placeholder="이름, 연락처를 입력하세요"
            onSearch={() => {}}
          />
          <table className="w-full">
            <thead>
              <tr className="table table-fixed w-full bg-grayscale-12">
                <th className="text-left px-4 py-2">고객명</th>
                <th className="text-left ">연락처</th>
                <th className="text-left w-28"></th>
              </tr>
            </thead>
            <tbody className="block w-full max-h-80 overflow-y-scroll">
              {customers.map((customer) => (
                <tr
                  key={customer.name}
                  className="table table-fixed w-full border-b border-grayscale-12"
                >
                  <td className="px-4 font-normal">{customer.name}</td>
                  <td className="">{customer.contactNumber}</td>
                  <td className="px-2 py-3 w-28">
                    <button
                      className="bg-grayscale-14 text-grayscale-6 w-full py-1 text-sm rounded font-normal border border-grayscale-6 disabled:bg-grayscale-12"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      선택
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
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

const AnnivListView = ({
  customer,
  onAdd,
  onBack,
}: {
  customer: ClientModel;
  onAdd: (data: { name: string; date: Date }) => void;
  onBack: () => void;
}) => {
  const annivs: Anniversary[] = JSON.parse(customer.anniversary ?? "[]");

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Icon
          type="down"
          className="rotate-90 w-10 h-10 p-2 fill-main-1 rounded hover:bg-grayscale-12 cursor-pointer"
          onClick={onBack}
        />
        <span className="text-xl font-normal">{customer.name}</span>
        <span>{customer.contactNumber}</span>
      </div>
      <TextLabel title="기념일" className="mt-4" />
      <div className="mt-2 px-4 py-2 border border-grayscale-11 rounded divide-y divide-grayscale-11">
        {annivs.length === 0 && (
          <span className="text-grayscale-6">등록된 기념일이 없습니다</span>
        )}
        {annivs.map((anniv) => (
          <div key={anniv.id} className="flex items-center justify-between p-2">
            <span>{anniv.name}</span>
            <span>{`${anniv.month}월 ${anniv.day}일`}</span>
            <button
              className="bg-main-2 text-grayscale-14 px-4 py-1.5 text-sm rounded font-normal hover:bg-main-3"
              onClick={() =>
                onAdd({
                  name: anniv.name ?? "",
                  date: new Date(
                    new Date().getFullYear(),
                    anniv.month ?? 1,
                    anniv.day
                  ),
                })
              }
            >
              등록
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
