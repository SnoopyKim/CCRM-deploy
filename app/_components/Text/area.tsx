"use client";

import cn from "@utils/cn";
import TextLabel from "./label";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  caution?: string;
}

const TextArea = ({
  label,
  error,
  caution,
  className,
  ...props
}: TextAreaProps) => {
  return (
    <div className={cn("flex flex-col gap-2")}>
      {label && (
        <TextLabel htmlFor={props.id} title={label} caution={caution} />
      )}
      <textarea
        {...props}
        className={cn(
          "py-3 px-4 resize-none border border-grayscale-11 rounded-sm placeholder-grayscale-6",
          "focus:border-sub-2 focus-visible:border-sub-2 focus:outline-none",
          "disabled:text-grayscale-9 disabled:bg-grayscale-13 disabled:border-none",
          className,
          { "border-sub-4": error }
        )}
      />
      {error && <p className="text-xs text-subborder-sub-4">{error}</p>}
    </div>
  );
};

export default TextArea;
