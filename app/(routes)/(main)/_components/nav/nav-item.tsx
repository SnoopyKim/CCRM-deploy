"use client";

import cn from "@utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNavItem({
  href,
  width = 100,
  plain = false,
  isSub = false,
  children,
}: Readonly<{
  href: string;
  width?: number;
  plain?: boolean;
  isSub?: boolean;
  children?: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isCurrentPath =
    href && (pathname == href || pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={cn(
        `group flex w-[${width}px] h-full justify-center items-center`,
        {
          "border-b-2 border-sub-1": !plain && isCurrentPath,
          "border-b-2 border-grayscale-11 hover:border-sub-1":
            isSub && !plain && !isCurrentPath,
        }
      )}
    >
      <p
        className={cn("text-base group-hover:text-sub-1", {
          "text-main-1": !isSub && !isCurrentPath,
          "text-sub-1": !plain && isCurrentPath,
          "text-grayscale-8": isSub && !isCurrentPath,
          "pt-0.5": !isSub && isCurrentPath,
        })}
      >
        {children}
      </p>
    </Link>
  );
}
