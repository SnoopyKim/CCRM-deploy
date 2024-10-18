"use client";

import cn from "@/app/_utils/cn";
import Link from "next/link";

export default function MemoSidebar({
  currentMenu = "",
  onSelectMenu = () => {},
}: {
  currentMenu?: string;
  onSelectMenu?: (menu: string) => void;
}) {
  return (
    <nav className="w-60 flex flex-col">
      <div className="p-4">
        <Link
          href="/program/memo/new"
          className="flex w-full h-14 justify-center items-center text-lg font-medium rounded-full bg-main-2 hover:bg-main-3 text-grayscale-14"
        >
          업무일지 작성
        </Link>
      </div>
      <ul className="mt-4 p-2 text font-medium border-t border-grayscale-11">
        <ul className="space-y-2 px-2 text-lg font-medium">
          <li>
            <button
              className={cn(
                "w-full py-3 rounded hover:bg-grayscale-12",
                currentMenu === "inbox" ? "bg-grayscale-12" : ""
              )}
              onClick={() => onSelectMenu("inbox")}
            >
              최근 페이지
            </button>
          </li>
          <li>
            <button
              className={cn(
                "w-full py-3 rounded hover:bg-grayscale-12",
                currentMenu === "starred" ? "bg-grayscale-12" : ""
              )}
              onClick={() => onSelectMenu("starred")}
            >
              즐겨찾기
            </button>
          </li>
          <li>
            <button
              className={cn(
                "w-full py-3 rounded hover:bg-grayscale-12",
                currentMenu === "sent" ? "bg-grayscale-12" : ""
              )}
              onClick={() => onSelectMenu("sent")}
            >
              휴지통
            </button>
          </li>
        </ul>
      </ul>
    </nav>
  );
}