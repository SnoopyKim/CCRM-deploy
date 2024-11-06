"use client";

import Icon, { IconType } from "@/app/_components/Icon";
import cn from "@/app/_utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export interface ProgramNavItemPropsWithSub {
  icon: IconType;
  title: string;
  subList: { title: string; href: string }[];
}

export default function ProgramNavItemWithSub({
  icon,
  title,
  subList,
}: ProgramNavItemPropsWithSub) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(
    subList.some((item) => pathname.startsWith(item.href))
  );

  const subHeight = 4 * 10 * subList.length;

  return (
    <div className="">
      <div
        className={cn(
          "flex items-center px-4 h-16 cursor-pointer hover:opacity-100",
          isOpen ? "opacity-100" : "opacity-80"
        )}
        onClick={() => setIsOpen((value) => !value)}
      >
        <Icon type={icon} className="w-5 h-5 fill-grayscale-14" />
        <span className="flex-1 ml-2 text-grayscale-14">{title}</span>
        <Icon
          type="down"
          className={cn(
            "self-end w-5 h-5 fill-grayscale-14 transition-transform duration-200 ease-linear",
            isOpen ? "-rotate-180" : "rotate-0"
          )}
        />
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-linear"
        )}
        style={{ maxHeight: `${isOpen ? subHeight : 0}px` }}
      >
        {subList.map(({ title, href }) => (
          <Link
            key={title}
            href={href}
            className={cn(
              "w-full flex justify-between items-center pl-11 pr-4 h-10 hover:opacity-100",
              pathname.startsWith(href) ? "bg-main-3 opacity-100" : "opacity-80"
            )}
          >
            <span
              className={
                pathname.startsWith(href)
                  ? "text-grayscale-14 font-normal"
                  : "text-grayscale-11"
              }
            >
              {title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
