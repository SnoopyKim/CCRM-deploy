"use client";

import cn from "@/app/_utils/cn";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  title: string;
}

export default function OutlineButton({
  href,
  title,
  className,
  ...props
}: OutlineButtonProps) {
  const btnStyle = cn(
    "rounded-full px-4 py-2 border border-grayscale-14 text-grayscale-14 hover:text-grayscale-9 hover:border-grayscale-9",
    className
  );

  if (href) {
    return (
      <Link href={href} className={btnStyle}>
        {title}
      </Link>
    );
  }

  return (
    <button title={title} className={btnStyle} {...props}>
      {title}
    </button>
  );
}
