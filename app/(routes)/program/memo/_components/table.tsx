"use client";

import Icon from "@/app/_components/Icon";
import { DriveItem } from "@/app/_models/drive";
import { deleteDriveFile } from "@/app/_services/google/drive";
import { useMemoStore } from "@/app/_utils/memo/store";
import { useRouter } from "next/navigation";

export default function MemoTable({ memos = [] }: { memos?: DriveItem[] }) {
  const router = useRouter();
  const deleteMemo = useMemoStore((state) => state.deleteMemo);

  const handleDelete = async (id: string) => {
    const success = await deleteDriveFile(id);
    if (success) {
      deleteMemo(id);
    }
  };

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
              <Icon type={"document"} className="" />
            </td>
            <td className="">{memo.name}</td>
            <td className="">
              {memo.modifiedTime?.slice(0, 10) ??
                new Date().toISOString().slice(0, 10)}
            </td>
            <td className="p-2">
              <Icon
                type="delete"
                className="w-10 h-10 p-2 hover:bg-sub-1 hover:bg-opacity-10 hover:fill-sub-1"
                onClick={() => handleDelete(memo.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
