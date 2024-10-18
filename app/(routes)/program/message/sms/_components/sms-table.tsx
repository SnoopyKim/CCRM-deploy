"use client";

import CheckBox from "@/app/_components/CheckBox/default";
import Icon from "@/app/_components/Icon";
import { SearchField } from "@/app/_components/Text";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Sample data for emails
const groups = [
  {
    id: 1,
    group: "채팅 그룹 이름 1",
    people: 78,
    status: true,
    currentDate: "2024-10-01",
  },
  {
    id: 2,
    group: "서초구 모임",
    people: 369,
    status: true,
    currentDate: "2024-10-01",
  },
  {
    id: 3,
    group: "아차산 병원",
    people: 121,
    status: true,
    currentDate: "2024-10-01",
  },
  {
    id: 4,
    group: "교회 성당 모임",
    people: 56,
    status: true,
    currentDate: "2024-10-01",
  },
  {
    id: 5,
    group: "불교 모임",
    people: 24,
    status: true,
    currentDate: "2024-10-01",
  },
  {
    id: 6,
    group: "헬스 클럽 회원님들",
    people: 234,
    status: false,
    currentDate: "2024-10-01",
  },
];

export default function SmsTable() {
  const router = useRouter();
  return (
    <table className="w-full table-fixed ">
      <thead>
        <tr className="bg-grayscale-12">
          <th className="text-left px-4 py-2 ">그룹명</th>
          <th className="text-left w-32">인원수</th>
          <th className="text-left w-32 ">발송여부</th>
          <th className="text-left w-48">최근 발송 날짜</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => (
          <tr
            key={group.id}
            className="border-b border-grayscale-11 hover:bg-grayscale-13 cursor-pointer"
            onClick={() => router.push(`/program/message/sms/${group.id}`)}
          >
            <td className="px-4 font-normal">{group.group}</td>
            <td className="">{group.people}명</td>
            <td className="py-3">
              {group.status ? (
                <span className="py-1.5 px-3 rounded-full text-main-2 bg-sub-2 bg-opacity-10">
                  ON
                </span>
              ) : (
                <span className="py-1.5 px-3 rounded-full text-main-1 bg-grayscale-12">
                  OFF
                </span>
              )}
            </td>
            <td className="">{group.currentDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
