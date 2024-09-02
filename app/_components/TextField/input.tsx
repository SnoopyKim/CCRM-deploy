"use client";

import clsx from "clsx";

export default function Input({
  type = "text",
  value,
  placeholder,
  onChange,
  onEnter,
  disabled,
}: {
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (value: string) => void;
  disabled?: boolean;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.currentTarget.blur();
      onEnter && onEnter(e.currentTarget.value);
      e.preventDefault();
    }
  };
  return (
    <input
      type={type}
      value={value}
      className={clsx(
        "block flex-1 h-14 p-4 pr-10 text-base bg-white border border-grayscale-11 rounded-sm placeholder-grayscale-6", // 오른쪽 패딩 조정
        "focus:border-sub-2 focus-visible:border-sub-2 focus:outline-none",
        "disabled:text-grayscale-9 disabled:bg-grayscale-13 disabled:border-none"
      )}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      disabled={disabled}
    />
  );
}
