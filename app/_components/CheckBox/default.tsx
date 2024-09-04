import clsx from "clsx";
import Icon from "../Icon";
import { InputHTMLAttributes } from "react";

export default function CheckBox({
  label,
  name,
  onClick,
}: {
  label: string;
  name: string;
  onClick?: (isChecked: boolean) => void;
}) {
  return (
    <div className="flex flex-row items-center">
      <div className="relative w-4 h-[18px] mr-2">
        <input
          id={name}
          name={name}
          type="checkbox"
          className={clsx(
            "appearance-none h-4 w-4 border-2 border-main-1 rounded-[4px]",
            " transition-colors duration-300 bg-grayscale-14 checked:bg-main-1"
          )}
          onClick={(e) => onClick?.(e.currentTarget.checked)}
        />
        <label htmlFor={name}>
          <Icon
            type="checkbox"
            className="w-[10px] h-[7px] stroke-grayscale-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </label>
      </div>
      <span>{label}</span>
    </div>
  );
}
