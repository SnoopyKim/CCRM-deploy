"use client";

import clsx from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onEnter?: (value: string) => void;
}

export default function Input({
  id,
  type = "text",
  value,
  placeholder,
  onChange,
  onEnter,
  disabled,
  className,
  ...props
}: InputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.currentTarget.blur();
      onEnter && onEnter(e.currentTarget.value);
      e.preventDefault();
    }
  };
  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      className={clsx(
        "block flex-1 h-14 p-4 pr-10 text-base bg-white border border-grayscale-11 rounded-sm placeholder-grayscale-6",
        "focus:border-sub-2 focus-visible:border-sub-2 focus:outline-none",
        "disabled:text-grayscale-9 disabled:bg-grayscale-13 disabled:border-none",
        className
      )}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      {...props}
    />
  );
}
