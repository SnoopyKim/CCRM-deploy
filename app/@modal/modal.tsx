"use client";

import { type ElementRef, type MouseEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../_components/Button";

export function Modal({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  const isClickInsideDialog = (e: MouseEvent, element: HTMLElement) => {
    const r = element.getBoundingClientRect();

    return (
      e.clientX > r.left &&
      e.clientX < r.right &&
      e.clientY > r.top &&
      e.clientY < r.bottom
    );
  };

  function onDismiss() {
    router.back();
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 bg-main-1 bg-opacity-40 flex justify-center items-center "
      onClick={(e) => {
        if (dialogRef.current && !isClickInsideDialog(e, dialogRef.current)) {
          onDismiss();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="inline-flex flex-col p-8 bg-grayscale-14 rounded-sm"
      >
        {children}
      </div>
    </div>
  );
}
