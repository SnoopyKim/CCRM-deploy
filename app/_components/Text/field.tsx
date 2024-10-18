import Input, { InputProps } from "./input";
import TextLabel, { LabelProps } from "./label";

export default function TextField({
  type = "text",
  htmlFor,
  title,
  caution,
  className,
  cautionClassName,
  placeholder,
  id,
  ...props
}: InputProps & LabelProps) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {title && (
        <TextLabel
          htmlFor={id}
          title={title}
          caution={caution}
          cautionClassName={cautionClassName}
        />
      )}
      <div className="flex relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={className}
          {...props}
        />
      </div>
    </div>
  );
}
