import cn from "@utils/cn";

export interface LabelProps {
  htmlFor?: string;
  title: string;
  caution?: string;
  className?: string;
  cautionClassName?: string;
}

export default function TextLabel({
  htmlFor,
  title,
  caution,
  className,
  cautionClassName,
}: LabelProps) {
  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor={htmlFor}
        className={cn(
          "inline-block text-sm font-semibold text-grayscale-6",
          className
        )}
      >
        {title}
      </label>
      {caution && (
        <span className={cn("text-sub-1 text-sm", cautionClassName)}>
          {caution}
        </span>
      )}
    </div>
  );
}
