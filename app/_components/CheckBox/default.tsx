"use client";

import cn from "@utils/cn";
import Icon from "../Icon";
import { useEffect, useState } from "react";

export default function CheckBox({
  label,
  name,
  color = "main",
  defaultChecked = false,
  onChecked,
}: {
  label?: string;
  name: string;
  color?: "main" | "sub";
  // defaultChecked는 웃긴게 false든 true는 첫 값에서 render를 바꿀 수 없다.
  // 첫 프레임에 바로 설정할게 아니라면 undefined를 초기값으로 건내야한다.
  // 그래서 checked를 더 추천한다
  defaultChecked?: boolean;
  onChecked?: (isChecked: boolean) => void;
}) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  return (
    <div className="flex flex-row items-center">
      <div className="relative w-4 h-[18px] mr-2">
        <input
          id={name}
          name={name}
          type="checkbox"
          className={cn(
            "appearance-none h-4 w-4 border-2 border-main-1 rounded-[4px]",
            "transition-colors duration-300 bg-grayscale-14 checked:bg-main-1",
            {
              "border-main-1 checked:bg-main-1": color === "main",
              "border-sub-1 checked:bg-sub-1": color === "sub",
            }
          )}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            onChecked?.(e.target.checked);
          }}
        />
        <label htmlFor={name}>
          <Icon
            type="checkbox"
            className="w-[10px] h-[7px] stroke-grayscale-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </label>
      </div>
      {label && <span>{label}</span>}
    </div>
  );
}
