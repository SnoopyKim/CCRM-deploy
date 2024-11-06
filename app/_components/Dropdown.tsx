"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import Icon, { IconType } from "./Icon";
import cn from "../_utils/cn";

export interface DropdownOption {
  label: string;
  icon?: IconType;
  color?: string; // Icon component to display (optional)
  onClick?: () => void; // Function to call when the option is clicked
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ options, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-left" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer rounded hover:bg-grayscale-13"
      >
        {children}
      </div>

      {isOpen && (
        <div className="origin-top-right absolute p-2 right-0 max-w-52 rounded-md shadow-lg bg-grayscale-14 ring-1 ring-main-1 ring-opacity-5 focus:outline-none z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "group flex items-center pl-2 pr-3 py-2 gap-2 hover:bg-grayscale-13 "
              )}
              style={{
                color: option.color || "#555",
                minWidth: option.icon
                  ? `${50 + option.label.length * 10}px`
                  : `${25 + option.label.length * 10}px`,
              }}
              onClick={() => {
                option.onClick?.();
                setIsOpen(false); // Close dropdown after click
              }}
            >
              {option.icon && (
                <Icon
                  type={option.icon}
                  className={cn(
                    "w-5 h-5 group-hover:bg-grayscale-13",
                    `text-[${option.color || "#555"}]`
                  )}
                />
              )}
              <div
                className={`flex-1 line-clamp-1 ${
                  option.icon ? "text-left" : "text-center"
                }`}
              >
                {option.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
