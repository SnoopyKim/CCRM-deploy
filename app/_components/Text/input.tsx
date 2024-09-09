"use client";

import cn from "@utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onEnter?: (value: string) => void;
  error?: string;
}

export default function Input({
  id,
  type = "text",
  placeholder,
  onChange,
  onEnter,
  error,
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
    <div className="flex flex-col flex-1">
      <input
        id={id}
        name={id}
        type={type}
        defaultValue={props.defaultValue}
        className={cn(
          "flex h-14 p-4 text-base bg-white border border-grayscale-11 rounded-sm placeholder-grayscale-6",
          "focus:border-sub-2 focus-visible:border-sub-2 focus:outline-none",
          "disabled:text-grayscale-9 disabled:bg-grayscale-13 disabled:border-none",
          error && "border-sub-4",
          className
        )}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="text-sm text-sub-4 border-sub-4 ml-4 mt-1">{error}</p>
      )}
    </div>
  );
}
