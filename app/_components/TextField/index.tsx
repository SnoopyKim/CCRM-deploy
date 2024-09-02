import clsx from "clsx";
import Icon from "../Icon";
import Input from "./input";

function TextField({
  label,
  type = "text",
  placeholder,
}: {
  label?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="">
      {label && (
        <label className="inline-block text-base font-semibold mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <Input type={type} placeholder={placeholder} />
      </div>
    </div>
  );
}

export { default as Input } from "./input";
export default TextField;
export { default as SearchField } from "./search";
