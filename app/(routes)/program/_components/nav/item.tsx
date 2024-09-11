import Icon, { IconType } from "@/app/_components/Icon";
import Link from "next/link";

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
  return (
    <Link href={href} className={"flex items-center px-4 h-16"}>
      <Icon type={icon} className="w-5 h-5 fill-grayscale-14" />
      <span className="flex-1 ml-2 text-grayscale-14">{title}</span>
      <Icon type="down" className="w-5 h-5 fill-grayscale-14 -rotate-90" />
    </Link>
  );
}
