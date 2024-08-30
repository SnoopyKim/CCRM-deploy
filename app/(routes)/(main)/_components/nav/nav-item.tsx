"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNavItem({
  href,
  selectable = true,
  children,
}: Readonly<{
  href: string;
  selectable?: boolean;
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isCurrentPath =
    href && (pathname == href || pathname.startsWith(`${href}/`));

  return (
    <div
      className={clsx(
        "flex w-[100px] h-[72px] justify-center items-center mx-2",
        {
          "border-b-2 border-sub-1": selectable && isCurrentPath,
        }
      )}
    >
      <Link href={href}>
        <p
          className={clsx("text-main-1 text-base hover:text-sub-1", {
            "text-sub-1": selectable && isCurrentPath,
          })}
        >
          {children}
        </p>
      </Link>
    </div>
  );
}
