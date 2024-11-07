import Icon from "@/app/_components/Icon";
import cn from "@utils/cn";
import { useEffect, useRef, useState } from "react";

export default function AccordianItem({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="">
      <button
        className="w-full flex h-14 justify-between items-center border-b border-grayscale-11"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span
          className={cn(
            "text-lg max-lg:text-base font-semibold text-start",
            isOpen ? "text-main-2" : "text-grayscale-6"
          )}
        >
          {title}
        </span>
        {isOpen ? (
          <Icon
            type="minus"
            className="w-5 h-5 stroke-main-2"
            onClick={() => setIsOpen((value) => !value)}
          />
        ) : (
          <Icon
            type="plus"
            className="w-5 h-5 stroke-grayscale-6"
            onClick={() => setIsOpen((value) => !value)}
          />
        )}
      </button>
      <div
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-all duration-300"
      >
        <div className="py-4 text-base text-grayscale-6 whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  );
}
