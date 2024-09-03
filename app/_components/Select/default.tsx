import clsx from "clsx";
import Icon from "../Icon";

export interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  label?: string;
  placeholder?: string;
  options: {
    value: string;
    text: string;
  }[];
}

const Select = ({
  label,
  placeholder,
  options,
  defaultValue,
  className,
  onChange,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col">
      {label && <label className="font-semibold mb-2">{label}</label>}
      <div className="flex flex-col relative">
        <select
          // value={value}
          onChange={onChange}
          defaultValue={placeholder}
          className={clsx(
            "appearance-none h-14 p-4 border border-1 border-grayscale-11 rounded-sm outline-none",
            "focus:border-sub-2 focus-visible:border-sub-2",
            "disabled:text-grayscale-9 disabled:bg-grayscale-13 disabled:border-none"
          )}
          {...props}
        >
          <option disabled>{placeholder ?? ""}</option>
          {options.map((option) => (
            <option key={option.value} value={option.text}>
              {option.text}
            </option>
          ))}
        </select>
        <Icon
          type="down"
          className="w-5 h-5 absolute fill-grayscale-8 right-4 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default Select;
