"use client";

import { useState } from "react";
import MailListView from "./_components/mail-list";
import MailSidebar from "./_components/sidebar";

export default function MailPage() {
  const [currentFolder, setCurrentFolder] = useState("inbox");

  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto my-10">
      <h1 className="text-3xl font-normal">메일 발송</h1>
      <div className="flex gap-4 mt-6">
        <MailSidebar
          currentMenu={currentFolder}
          onSelectMenu={setCurrentFolder}
        />
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center px-4 py-4">
            <h1 className="text-2xl font-semibold">
              {currentFolder === "inbox" && "받은편지함"}
              {currentFolder === "starred" && "중요편지함"}
              {currentFolder === "sent" && "보낸편지함"}
              {currentFolder === "labels" && "라벨그룹관리"}
            </h1>
          </div>
          <MailListView />
        </div>
      </div>
    </div>
  );
}
