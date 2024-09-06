import Input, { InputProps } from "./input";
import TextLabel from "./label";

interface TextFieldProps extends InputProps {
  label?: string;
  caution?: string;
}

export default function TextField({
  type = "text",
  label,
  caution,
  placeholder,
  id,
  ...props
}: TextFieldProps) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {label && <TextLabel htmlFor={id} title={label} caution={caution} />}
      <div className="flex relative">
        <Input id={id} type={type} placeholder={placeholder} {...props} />
      </div>
    </div>
  );
}
