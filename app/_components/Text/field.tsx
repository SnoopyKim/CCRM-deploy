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
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className="inline-block text-base font-semibold mb-2"
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
