"use client";

import cn from "@utils/cn";
import Icon from "../Icon";
import clsx from "clsx";

export interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  placeholder?: string;
  options: {
    value: any;
    text: string;
  }[];
}

const Select = ({
  placeholder,
  options,
  defaultValue,
  className,
  id,
  ...props
}: SelectProps) => {
  const onClickIcon = () => {
    id &&
      (document.getElementById(id) as HTMLSelectElement | null)?.showPicker();
  };
  return (
    <div className="flex flex-col relative">
      <select
        id={id}
        name={id}
        defaultValue={placeholder}
        className={cn(
          "appearance-none h-14 p-4 border border-grayscale-11 rounded-sm outline-none",
          // "focus:border-sub-2 focus-visible:border-sub-2",
          "disabled:text-grayscale-9 disabled:bg-grayscale-13 disabled:border-none",
          className
        )}
        {...props}
      >
        {placeholder && <option disabled>{placeholder}</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <Icon
        type="down"
        className="w-5 h-5 absolute fill-grayscale-8 right-4 top-1/2 -translate-y-1/2"
        onClick={onClickIcon}
      />
    </div>
  );
};

export default Select;
