"use client";

import cn from "@utils/cn";
import { buttonStyles } from ".";
import { ButtonHTMLAttributes } from "react";

export interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof (typeof buttonStyles)["color"];
}

export default function PrimaryButton({
  type = "button",
  color = "primary",
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "rounded-sm text-grayscale-14 px-4 h-14 font-medium text-lg",
        buttonStyles.color[color],
        "disabled:bg-grayscale-7 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {props.title}
    </button>
  );
}
