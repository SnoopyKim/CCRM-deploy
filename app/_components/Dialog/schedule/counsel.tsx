"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import Icon from "../../Icon";
import { SearchField } from "../../Text";
import { useScheduleStore } from "@/app/_utils/schedule/store";
import { useCallback, useEffect, useState } from "react";
import { addCalendarEvent } from "@/app/_services/google/calendar";
import TextLabel from "../../Text/label";
import { CalendarEvent } from "@/app/_models/calendar";
import ClientModel from "@/app/_models/client";
import ConsultationModel from "@/app/_models/consultation";
import { ConsultationDao } from "@/app/_utils/database/dao/consultationDao";
import { ClientDao } from "@/app/_utils/database/dao/clientDao";

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
    async ({ title, date }: { title: string; date: Date }) => {
      if (!selectedCustomer) return;
      setLoading(true);
      date.setHours(9);
      const { data, error } = await addCalendarEvent({
        title,
        date,
        custom: {
          type: "상담",
          customer: selectedCustomer.name,
          phone: selectedCustomer.contactNumber,
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

      {selectedCustomer ? (
        <CounselListView
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
            <tbody className="block w-full max-h-80 overflow-y-scroll ">
              {customers.map((customer: any) => (
                <tr
                  key={customer.name}
                  className="table table-fixed w-full border-b border-grayscale-12"
                >
                  <td className="px-4 font-normal">{customer.name}</td>
                  <td className="">{customer.phone}</td>
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

const CounselListView = ({
  customer,
  onAdd,
  onBack,
}: {
  customer: ClientModel;
  onAdd: (data: { title: string; date: Date }) => void;
  onBack: () => void;
}) => {
  const [counsels, setCounsels] = useState<ConsultationModel[]>([]);

  useEffect(() => {
    if (!customer.id) return;
    const fetchCounsels = async () => {
      const dao = new ConsultationDao();
      setCounsels(await dao.getConsultationsByClientId(customer.id ?? 0));
    };
    fetchCounsels();
  }, [customer]);

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
      <TextLabel title="상담 목록" className="mt-4" />
      <div className="mt-2 px-4 py-2 border border-grayscale-11 rounded divide-y divide-grayscale-11">
        {counsels.length === 0 && (
          <span className="text-grayscale-6">등록된 상담이 없습니다</span>
        )}
        {counsels.map((counsel) => (
          <div key={counsel.title} className="flex items-center gap-4 p-2">
            <span className="font-medium">{counsel.title}</span>
            <span>{counsel.consultationTime}</span>
            <span className="flex-1">{counsel.consultationAddress}</span>
            <button
              className="bg-main-2 text-grayscale-14 px-4 py-1.5 text-sm rounded font-normal hover:bg-main-3"
              onClick={() =>
                onAdd({
                  title: counsel.title,
                  date: new Date(counsel.consultationTime),
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
