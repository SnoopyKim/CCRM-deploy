"use client";

import cn from "@utils/cn";

import * as icons from "@/icons";

export type IconType = keyof typeof icons;

export default function Icon({
  type,
  className,
  onClick,
}: {
  type: IconType;
  className?: string;
  onClick?: () => void;
}) {
  const IconComponent = icons[type];

  const hasWidth = className
    ?.split(" ")
    .some((_class) => _class.startsWith("w-"));

  return (
    <span onClick={onClick}>
      <IconComponent
        className={cn("flex-shrink-0 fill-current", className, {
          "w-6 h-6": !hasWidth, // Default size
        })}
      />
    </span>
  );
}
