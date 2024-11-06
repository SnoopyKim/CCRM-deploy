"use client";

import Link from "next/link";
import MemoTable from "./_components/table";
import { useEffect } from "react";
import { useMemoStore } from "@/app/_utils/memo/store";
import useDialogStore from "@/app/_utils/dialog/store";
import useAuthStore from "@/app/_utils/auth/store";

export default function MemoPage() {
  const { openLoading, closeDialog } = useDialogStore();
  const { directory, loadDirectory } = useMemoStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated || directory) return;
    const fetchData = async () => {
      openLoading("메모/기록을 받아오는 중입니다...");
      await loadDirectory();
      closeDialog();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, directory]);

  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto my-10">
      <h1 className="text-3xl font-normal">메모/기록</h1>
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
