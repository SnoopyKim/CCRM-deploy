"use client";

import useDialogStore from "@/app/_utils/dialog/store";
import PrimaryButton from "../../Button/button";
import { Schedule } from "@/app/(routes)/program/schedule/_components/calendar-view";
import cn from "@/app/_utils/cn";
import Icon, { IconType } from "../../Icon";
import { schedule } from "@/icons";

export default function ScheduleDialog({
  date,
  schedules = [],
}: {
  date: Date;
  schedules?: Schedule[];
}) {
  const closeDialog = useDialogStore((state) => state.closeDialog);

  return (
    <div className="flex flex-col w-[800px] 2xl:w-[1000px] p-8 gap-6">
      <h1 className="text-2xl font-medium">{`${
        date.getMonth() + 1
      }월 ${date.getDate()}일`}</h1>
      <div className="flex justify-end items-center gap-2">
        <p className="font-medium">
          보험만기 <span className="text-sub-2">{schedules.length}건</span>
        </p>
        |
        <p className="font-medium">
          기념일 <span className="text-sub-2">{schedules.length}건</span>
        </p>
        |
        <p className="font-medium">
          상담 <span className="text-sub-2">{schedules.length}건</span>
        </p>
        |
        <p className="font-medium">
          개인일정 <span className="text-sub-2">{schedules.length}건</span>
        </p>
      </div>
      {schedules.length > 0 && <ScheduleTable />}
      <div className="flex flex-col py-6 border-t border-b border-grayscale-11">
        {schedules.length > 0 ? (
          <>
            <h2 className="text-xl mb-2">개인일정</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex flex-1 flex-col">
                <span className="font-medium">개인일정 제목</span>
                <span className="text-grayscale-9 text-sm">오전 00:00</span>
              </div>
              <button className="bg-grayscale-7 text-grayscale-14 px-4 py-1 text-sm rounded font-normal">
                수정
              </button>
              <button className="bg-grayscale-14 px-4 py-1 text-sm rounded font-normal border border-grayscale-7 text-grayscale-7">
                삭제
              </button>
            </div>
          </>
        ) : (
          <h2 className="text-xl text-center text-grayscale-6">
            등록된 일정이 없습니다
          </h2>
        )}
      </div>
      <div className="flex gap-2">
        <Option
          icon="flag"
          text="보험만기"
          color="sub-3"
          onClick={() => closeDialog("보험")}
        />
        <Option
          icon="heart"
          text="기념일 등록"
          color="sub-4"
          onClick={() => closeDialog("기념")}
        />
        <Option
          icon="calendar"
          text="상담 등록"
          color="sub-2"
          onClick={() => closeDialog("상담")}
        />
        <Option
          icon="flag"
          text="개인일정 등록"
          color="sub-5"
          onClick={() => closeDialog("개인")}
        />
      </div>
      <PrimaryButton
        color="gray"
        title="닫기"
        className="w-full text-lg font-medium"
        onClick={closeDialog}
      />
    </div>
  );
}

const ScheduleTable = () => {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="bg-grayscale-12">
          <th className="text-left p-2">고객명</th>
          <th className="text-left ">구분</th>
          <th className="text-left ">연락처</th>
          <th className="text-left "></th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-grayscale-12">
          <td className="px-2 font-normal">홍길동</td>
          <td>
            <span className="font-medium text-sub-2">상담 [정보수집]</span>
          </td>
          <td className="">010-8513-3549</td>
          <td className="px-2 py-3">
            <div className="flex justify-center gap-2">
              <button className="bg-sub-1 text-grayscale-14 px-4 py-1 text-sm rounded font-normal">
                공유
              </button>
              <button className="bg-grayscale-7 text-grayscale-14 px-4 py-1 text-sm rounded font-normal">
                수정
              </button>
              <button className="bg-grayscale-14 px-4 py-1 text-sm rounded font-normal border border-grayscale-7 text-grayscale-7">
                삭제
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-grayscale-12">
          <td className="px-2 font-normal">홍길동</td>
          <td>
            <span className="font-medium text-sub-3">
              면책 [면책/감액 종료일]
            </span>
          </td>
          <td className="">010-3987-4566</td>
          <td className="px-2 py-3">
            <div className="flex justify-center gap-2">
              <button className="bg-sub-1 text-grayscale-14 px-4 py-1 text-sm rounded font-normal">
                공유
              </button>
              <button className="bg-grayscale-7 text-grayscale-14 px-4 py-1 text-sm rounded font-normal">
                수정
              </button>
              <button className="bg-grayscale-14 px-4 py-1 text-sm rounded font-normal border border-grayscale-7 text-grayscale-7">
                삭제
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b border-grayscale-12">
          <td className="px-2 font-normal">홍길동</td>
          <td>
            <span className="font-medium text-sub-4">기념일</span>
          </td>
          <td className="">010-0981-1753</td>
          <td className="px-2 py-3">
            <div className="flex justify-center gap-2">
              <button className="bg-sub-1 text-grayscale-14 px-4 py-1 text-sm rounded font-normal">
                공유
              </button>
              <button className="bg-grayscale-7 text-grayscale-14 px-4 py-1 text-sm rounded font-normal">
                수정
              </button>
              <button className="bg-grayscale-14 px-4 py-1 text-sm rounded font-normal border border-grayscale-7 text-grayscale-7">
                삭제
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Option = ({
  icon,
  text,
  color,
  onClick,
}: {
  icon: IconType;
  text: string;
  color: string;
  onClick?: (option: string) => void;
}) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center p-4 gap-1 cursor-pointer",
        `border border-${color} text-${color} fill-${color} stroke-${color} hover:bg-${color} hover:bg-opacity-5`
      )}
      onClick={() => onClick?.(text)}
    >
      <Icon type={icon} />
      <span className="font-medium">{text}</span>
    </div>
  );
};
