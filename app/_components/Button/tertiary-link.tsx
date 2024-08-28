import clsx from "clsx";
import Link from "next/link";

export default function TertiaryLinkButton({
  link,
  text,
  width = -1,
  fontSize = 16,
  disabled = false,
}: {
  link: string;
  text: string;
  width?: number;
  fontSize?: number;
  disabled?: boolean;
}) {
  return (
    <Link
      href={link}
      className={clsx(
        `rounded-sm bg-sub-2 text-grayscale-14 text-[${fontSize}px] px-4 py-2 font-semibold`,
        {
          [`w-${width}px`]: width !== -1,
          "pointer-events-none": disabled,
        }
      )}
    >
      {text}
    </Link>
  );
}
