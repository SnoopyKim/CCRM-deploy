"use client";

import Link from "next/link";
import MemoSidebar from "./_components/sidebar";
import MemoTable from "./_components/table";
import Dropdown from "@/app/_components/Dropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DriveDirectory } from "@/app/_models/drive";
import { loadMemoDrive } from "@/app/_services/google/memo";
import { useMemoStore } from "@/app/_utils/memo/store";
import useDialogStore from "@/app/_utils/dialog/store";

export default function MemoPage() {
  const { openLoading, closeDialog } = useDialogStore();
  const { directory, loadDirectory } = useMemoStore();

  useEffect(() => {
    if (directory) return;
    const fetchData = async () => {
      openLoading("업무일지를 받아오는 중입니다...");
      await loadDirectory();
      closeDialog();
    };
    fetchData();
  }, [directory]);

  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto my-10">
      <h1 className="text-3xl font-normal">업무 일지</h1>
      <div className="flex my-6 justify-end">
        <Link
          href="/program/memo/new"
          className="flex px-5 py-2.5 justify-center items-center font-medium rounded bg-main-2 hover:bg-main-3 text-grayscale-14"
        >
          신규 작성
        </Link>
      </div>
      <div className="flex gap-4 ">
        {/* <MemoSidebar /> */}
        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <MemoTable memos={directory?.items} />
        </div>
      </div>
    </div>
  );
}
