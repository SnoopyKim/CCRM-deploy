"use client";

import clsx from "clsx";
import { buttonStyles } from ".";

export default function PrimaryButton({
  text,
  onClick,
  width = -1,
  height = "medium",
  color = "primary",
  fontSize = "text-base",
  weight = "font-normal",
  disabled = false,
}: {
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
  onClick: () => void;
}) {
  return (
    <button
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
      onClick={onClick}
    >
      {text}
    </button>
  );
}
