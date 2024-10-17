"use client";

import Icon, { IconType } from "@/app/_components/Icon";
import cn from "@/app/_utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ProgramNavItemPropsWithHref {
  icon: IconType;
  title: string;
  href: string;
}

export default function ProgramNavItem({
  icon,
  title,
  href,
}: ProgramNavItemPropsWithHref) {
  const isActive = usePathname().startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 h-16 opacity-80 hover:opacity-100",
        isActive && "bg-main-3 opacity-100"
      )}
    >
      <Icon type={icon} className="w-5 h-5" />
      <span
        className={cn(
          "flex-1 ml-2",
          isActive ? "text-grayscale-14 font-normal" : "text-grayscale-11"
        )}
      >
        {title}
      </span>
    </Link>
  );
}
