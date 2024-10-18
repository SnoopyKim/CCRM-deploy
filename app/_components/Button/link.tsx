import cn from "@utils/cn";
import Link, { LinkProps } from "next/link";
import { buttonStyles } from ".";

export interface LinkButtonProps extends LinkProps {
  title: string;
  color?: keyof (typeof buttonStyles)["color"];
  disabled?: boolean;
  className?: string;
}

export default function LinkButton({
  href,
  title,
  color = "primary",
  disabled = false,
  replace = false,
  className,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      replace={replace}
      className={cn(
        "flex justify-center items-center rounded-sm text-grayscale-14 px-4 h-14 font-normal",
        disabled
          ? "bg-grayscale-7 pointer-events-none shadow-none"
          : buttonStyles.color[color],
        className
      )}
    >
      {title}
    </Link>
  );
}
