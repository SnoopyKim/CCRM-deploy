import clsx from "clsx";

import * as icons from "@/icons";

export type IconType = keyof typeof icons;

export default function Icon({
  type,
  className,
}: {
  type: IconType;
  className?: string;
}) {
  const IconComponent = icons[type];

  const hasWidth = className
    ?.split(" ")
    .some((_class) => _class.startsWith("w-"));

  return (
    <IconComponent
      className={clsx("flex-shrink-0 fill-current", className, {
        "w-6 h-6": !hasWidth, // Default size
      })}
    />
  );
}
