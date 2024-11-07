"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import Icon from "../../Icon";
import { SearchField } from "../../Text";
import { addCalendarEvent } from "@/app/_services/google/calendar";
import { useScheduleStore } from "@/app/_utils/schedule/store";
import { useCallback, useEffect, useState } from "react";
import TextLabel from "../../Text/label";
import { CalendarEvent } from "@/app/_models/calendar";
import { ClientDao } from "@/app/_utils/database/dao/clientDao";
import ClientModel, {
  AutoInsurance,
  ExemptionReductionEndDate,
  FireInsurance,
} from "@/app/_models/client";

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
    async ({
      insurance,
      date,
      memo,
    }: {
      insurance: string;
      date: Date;
      memo: string;
    }) => {
      if (!selectedCustomer) return;
      setLoading(true);
      const { data, error } = await addCalendarEvent({
        title: selectedCustomer.name,
        date: date,
        custom: {
          type: "보험",
          customer: selectedCustomer.name,
          phone: selectedCustomer.contactNumber,
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
    <div className="flex flex-col sm:w-[640px] xl:w-[800px] 2xl:w-[1000px] p-8 gap-4">
      <div className="flex items-center gap-2">
        <Icon type="flag" className="w-8 h-8 fill-sub-3" />
        <h1 className="text-2xl font-normal">보험만기 등록</h1>
      </div>

      {selectedCustomer ? (
        <InsuranceListView
          customer={selectedCustomer}
          onAdd={onAddSchedule}
          onBack={() => setSelectedCustomer(undefined)}
        />
      ) : (
        <>
          <SearchField
            placeholder="이름, 연락처를 입력하세요"
            onSearch={() => {}}
            disabled={loading}
          />
          <table className="w-full">
            <thead>
              <tr className="table table-fixed w-full bg-grayscale-12">
                <th className="text-left px-4 py-2">고객명</th>
                <th className="text-left ">연락처</th>
                <th className="text-left w-28"></th>
              </tr>
            </thead>
            <tbody className="block w-full max-h-60 lg:max-h-80 overflow-y-scroll">
              {customers.map((customer) => (
                <tr
                  key={customer.name}
                  className="table table-fixed w-full border-b border-grayscale-12"
                >
                  <td className="px-4 font-normal">{customer.name}</td>
                  <td className="">{customer.contactNumber}</td>
                  <td className="px-2 py-3 w-28">
                    <button
                      className="bg-grayscale-14 text-grayscale-6 w-full py-1 text-sm rounded font-normal border border-grayscale-6 hover:bg-grayscale-12"
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

function getDateStringFromObj(obj: any): string {
  // 텍스트 형식으로 반환 (예: "2024-11-01")
  return `${obj.year ?? 2025}-${String(obj.month ?? 1).padStart(
    2,
    "0"
  )}-${String(obj.day ?? 1).padStart(2, "0")}`;
}

function getDateFromObj(obj: any): Date {
  const defaultDate = new Date();
  // JavaScript Date 객체로 반환
  return new Date(
    obj.year ?? defaultDate.getFullYear(),
    (obj.month ?? defaultDate.getMonth()) - 1,
    obj.day ?? defaultDate.getDate()
  );
}

const InsuranceListView = ({
  customer,
  onAdd,
  onBack,
}: {
  customer: ClientModel;
  onAdd: (data: { insurance: string; date: Date; memo: string }) => void;
  onBack: () => void;
}) => {
  const cars: AutoInsurance[] = JSON.parse(
    customer.autoInsuranceExpiration ?? "[]"
  );

  const fires: FireInsurance[] = JSON.parse(
    customer.fireInsuranceExpiration ?? "[]"
  );

  const exemptions: ExemptionReductionEndDate[] = JSON.parse(
    customer.exemptionReductionEndDate ?? "[]"
  );

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
      <TextLabel title="자동차보험 만기" className="mt-4" />
      <div className="mt-2 px-4 py-2 border border-grayscale-11 rounded divide-y divide-grayscale-11">
        {cars.length === 0 && (
          <span className="text-grayscale-6">등록된 자동차보험이 없습니다</span>
        )}
        {cars.map((car, i) => (
          <div key={`car-${i}`} className="flex items-center gap-4 p-2">
            <span>{car.company}</span>
            <span>만기일: {getDateStringFromObj(car)}</span>
            <span className="flex-1 line-clamp-1">{car.memo}</span>
            <button
              className="bg-main-2 text-grayscale-14 px-4 py-1.5 text-sm rounded font-normal hover:bg-main-3"
              onClick={() =>
                onAdd({
                  insurance: "자동차보험 만기",
                  date: getDateFromObj(car),
                  memo: car.memo,
                })
              }
            >
              등록
            </button>
          </div>
        ))}
      </div>
      <TextLabel title="화재보험 만기" className="mt-2" />
      <div className="mt-2 px-4 py-2 border border-grayscale-11 rounded divide-y divide-grayscale-11">
        {fires.length === 0 && (
          <span className="text-grayscale-6">등록된 화재보험이 없습니다</span>
        )}
        {fires.map((fire, i) => (
          <div key={`fire-${i}`} className="flex items-center gap-4 p-2">
            <span>{fire.company}</span>
            <span>만기일: {getDateStringFromObj(fire)}</span>
            <span className="flex-1 line-clamp-1">{fire.memo}</span>
            <button
              className="bg-main-2 text-grayscale-14 px-4 py-1.5 text-sm rounded font-normal hover:bg-main-3"
              onClick={() =>
                onAdd({
                  insurance: "화재보험 만기",
                  date: getDateFromObj(fire),
                  memo: fire.memo,
                })
              }
            >
              등록
            </button>
          </div>
        ))}
      </div>
      <TextLabel title="면책/감액 종료일" className="mt-2" />
      <div className="mt-2 px-4 py-2 border border-grayscale-11 rounded divide-y divide-grayscale-11">
        {exemptions.length === 0 && (
          <span className="text-grayscale-6">
            등록된 면책/감액 종료일이 없습니다
          </span>
        )}
        {exemptions.map((exempt, i) => (
          <div key={`exempt-${i}`} className="flex items-center gap-4 p-2">
            <span>종료일: {getDateStringFromObj(exempt)}</span>
            <span className="flex-1 line-clamp-1">{exempt.memo}</span>
            <button
              className="bg-main-2 text-grayscale-14 px-4 py-1.5 text-sm rounded font-normal hover:bg-main-3"
              onClick={() =>
                onAdd({
                  insurance: "면책/감액 종료일",
                  date: getDateFromObj(exempt),
                  memo: exempt.memo,
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
