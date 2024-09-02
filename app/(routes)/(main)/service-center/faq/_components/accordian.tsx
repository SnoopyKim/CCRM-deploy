import Icon from "@/app/_components/Icon";
import clsx from "clsx";
import { useState } from "react";

export default function AccordianItem({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <button
        className="w-full flex h-14 justify-between items-center border-b border-grayscale-11"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span
          className={clsx(
            "text-lg font-semibold",
            isOpen ? "text-main-2" : "text-grayscale-6"
          )}
        >
          {title}
        </span>
        {isOpen ? (
          <Icon type="minus" className="w-5 h-5 stroke-main-2" />
        ) : (
          <Icon type="plus" className="w-5 h-5 stroke-grayscale-6" />
        )}
      </button>
      <div
        id="content-1"
        className={clsx(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-20" : "max-h-0"
        )}
      >
        <div className="py-4 text-base text-grayscale-6 whitespace-pre-line">
          Vitae congue eu consequat ac felis placerat vestibulum lectus mauris
          ultrices. {"\n"} Cursus sit amet dictum sit amet justo donec enim diam
          porttitor lacus luctus accumsan tortor posuere.
        </div>
      </div>
    </div>
  );
}
