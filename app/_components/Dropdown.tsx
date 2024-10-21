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
        className="inline-flex cursor-pointer rounded hover:bg-gray-200"
      >
        {children}
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 max-w-52 rounded-md shadow-lg bg-grayscale-14 ring-1 ring-main-1 ring-opacity-5 focus:outline-none z-10">
          <div className="p-2">
            {options.map((option, index) => (
              <button
                key={index}
                className={cn(
                  "group flex items-center pl-2 pr-3 py-2 min-w-16 hover:bg-grayscale-13 w-full"
                )}
                style={{ color: option.color || "#555" }}
                onClick={() => {
                  option.onClick?.();
                  setIsOpen(false); // Close dropdown after click
                }}
              >
                {option.icon && (
                  <Icon
                    type={option.icon}
                    className={cn(
                      "w-5 h-5 mr-2 group-hover:bg-grayscale-13",
                      `text-[${option.color || "#555"}]`
                    )}
                  />
                )}
                <span
                  className={`flex-1 ${
                    option.icon ? "text-left" : "text-center"
                  }`}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
