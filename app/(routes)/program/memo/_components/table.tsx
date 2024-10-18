"use client";

import Icon from "@/app/_components/Icon";
import { useRouter } from "next/navigation";

// Sample data for emails
const memos = [
  {
    id: 1,
    type: "file",
    name: "업무일지 1",
    currentDate: "2024-10-01",
  },
  {
    id: 2,
    type: "folder",
    name: "사적인 폴더 ",
    currentDate: "2024-10-01",
  },
  {
    id: 3,
    type: "file",
    name: "업무일지 3",
    currentDate: "2024-10-01",
  },
  {
    id: 4,
    type: "file",
    name: "업무일지 4",
    currentDate: "2024-10-01",
  },
  {
    id: 5,
    type: "file",
    name: "업무일지 5",
    currentDate: "2024-10-01",
  },
];

export default function MemoTable() {
  const router = useRouter();
  return (
    <table className="w-full table-fixed ">
      <thead>
        <tr className="bg-grayscale-12">
          <th className="text-left px-4 py-2 w-20">유형</th>
          <th className="text-left">이름</th>
          <th className="text-left w-48">최근 발송 날짜</th>
          <th className="text-left w-14"></th>
        </tr>
      </thead>
      <tbody>
        {memos.map((memo) => (
          <tr
            key={memo.id}
            className="border-b border-grayscale-11 hover:bg-grayscale-13 cursor-pointer"
            onClick={() => router.push(`/program/memo/${memo.id}`)}
          >
            <td className="px-4 font-normal">
              <Icon
                type={memo.type === "file" ? "document" : "folderOutline"}
                className=""
              />
            </td>
            <td className="">{memo.name}</td>

            <td className="">{memo.currentDate}</td>
            <td className="p-2">
              <Icon
                type="delete"
                className="w-10 h-10 p-2 hover:bg-sub-1 hover:bg-opacity-10 hover:fill-sub-1"
                onClick={() => {}}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
