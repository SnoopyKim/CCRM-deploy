"use client";

import useDialogStore from "@/app/_utils/dialog/store";

export default function LoadingDialog() {
  const title = useDialogStore((state) => state.params.title);

  return (
    <div className="max-w-sm">
      <div className="flex flex-col items-center p-6 gap-4">
        {/* Title */}
        {title && <h2 className="text-xl text-main-2 font-medium">{title}</h2>}
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-main-2 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
