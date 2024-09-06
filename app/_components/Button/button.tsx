"use client";

import clsx from "clsx";
import { buttonStyles } from ".";
import React from "react";

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "tertiary";
}

export default function PrimaryButton({
  type = "button",
  onClick,
  color = "primary",
  disabled,
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "rounded-sm text-grayscale-14 px-4 h-14 font-normal text-base",
        buttonStyles.color[color],
        "disabled:bg-grayscale-7 disabled:pointer-events-none",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {props.title}
    </button>
  );
}
