"use client";

import Icon, { IconType } from "@/app/_components/Icon";
import cn from "@/app/_utils/cn";
import Link from "next/link";
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
  const [isOpen, setIsOpen] = useState(false);

  const subHeight = 10 * subList.length;

  return (
    <div className="">
      <div
        className={"flex items-center px-4 h-16"}
        onClick={() => setIsOpen((value) => !value)}
      >
        <Icon type={icon} className="w-5 h-5 fill-grayscale-14" />
        <span className="flex-1 ml-2 text-grayscale-14">{title}</span>
        <Icon
          type="down"
          className={cn(
            "self-end w-5 h-5 fill-grayscale-14 transition-transform duration-200 ease-linear",
            isOpen ? "rotate-0" : "-rotate-90"
          )}
        />
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-linear",
          isOpen ? `max-h-${subHeight}` : "max-h-0"
        )}
      >
        {subList.map(({ title, href }) => (
          <Link
            key={title}
            href={href}
            className="w-full flex justify-between items-center pl-11 pr-4 h-10"
          >
            <span className="text-grayscale-14">{title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
