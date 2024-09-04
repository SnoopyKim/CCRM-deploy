import Input, { InputProps } from "./input";

interface TextFieldProps extends InputProps {
  label?: string;
}

export default function TextField({
  label,
  type = "text",
  placeholder,
  id,
  ...props
}: TextFieldProps) {
  return (
    <div className="flex flex-col flex-1">
      {label && (
        <label
          htmlFor={id}
          className="inline-block text-sm font-semibold mb-2 text-grayscale-6"
        >
          {label}
        </label>
      )}
      <div className="flex relative">
        <Input id={id} type={type} placeholder={placeholder} {...props} />
      </div>
    </div>
  );
}
