import clsx from "clsx";
import Link from "next/link";
import { buttonStyles } from ".";

export default function LinkButton({
  link,
  text,
  width = -1,
  height = "medium",
  color = "primary",
  fontSize = "text-base",
  weight = "font-normal",
  disabled = false,
}: {
  link: string;
  text: string;
  width?: number;
  height?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "tertiary";
  fontSize?: "text-base" | "text-sm" | "text-lg";
  weight?:
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold";
  disabled?: boolean;
}) {
  return (
    <Link
      href={link}
      className={clsx(
        "rounded-sm text-grayscale-14  px-4 py-2",
        fontSize,
        weight,
        buttonStyles.height[height],
        disabled
          ? "bg-grayscale-7 pointer-events-none"
          : buttonStyles.color[color],
        {
          [`w-[${width}px]`]: width !== -1,
        }
      )}
    >
      {text}
    </Link>
  );
}
