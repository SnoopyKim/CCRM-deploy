"use client";

import MemoSidebar from "./_components/sidebar";
import MemoTable from "./_components/table";

export default function MemoPage() {
  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto my-10">
      <h1 className="text-3xl font-normal">업무 일지</h1>

      <div className="flex gap-4 mt-6">
        <MemoSidebar />
        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <MemoTable />
        </div>
      </div>
    </div>
  );
}
