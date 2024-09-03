"use client";

import clsx from "clsx";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = ({ label, error, className, ...props }: TextAreaProps) => {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={props.id} className="font-semibold">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={clsx(
          "py-2 px-4 resize-none border border-grayscale-11 rounded-sm placeholder-grayscale-6",
          "focus:border-sub-2 focus-visible:border-sub-2 focus:outline-none",
          "disabled:text-grayscale-9 disabled:bg-grayscale-13 disabled:border-none",
          className,
          { "border-red-500": error }
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;
