"use client";

import cn from "@/app/_utils/cn";
import Link from "next/link";

export default function MailSidebar({
  currentMenu,
  onSelectMenu,
}: {
  currentMenu: string;
  onSelectMenu: (menu: string) => void;
}) {
  return (
    <div className="w-60 flex flex-col">
      <div className="p-4">
        <Link
          href="/program/message/mail/new"
          className="flex w-full h-14 justify-center items-center text-lg font-medium rounded-full bg-main-2 hover:bg-main-3 text-grayscale-14"
        >
          메일쓰기
        </Link>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 px-2 text-lg font-medium">
          <li>
            <button
              className={cn(
                "w-full py-3 rounded hover:bg-grayscale-12",
                currentMenu === "inbox" ? "bg-grayscale-12" : ""
              )}
              onClick={() => onSelectMenu("inbox")}
            >
              받은편지함
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
              중요편지함
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
              보낸편지함
            </button>
          </li>
          {/* <li>
            <button
              className="w-full justify-start"
              onClick={() => setCurrentFolder("labels")}
            >
              라벨그룹관리
              <Icon type="down" className="ml-auto h-4 w-4" />
            </button>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}
