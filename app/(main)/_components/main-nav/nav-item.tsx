"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNavItem({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isCurrentPath = href && pathname.startsWith(href);

  return (
    <div
      className={clsx(
        "flex w-[100px] h-[72px] justify-center items-center mx-2",
        {
          "border-b-2 border-sub-1": isCurrentPath,
        }
      )}
    >
      <Link href={href}>
        <p
          className={clsx("text-main-1 text-base hover:text-sub-1", {
            "text-sub-1": isCurrentPath,
          })}
        >
          {children}
        </p>
      </Link>
    </div>
  );
}
