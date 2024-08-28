import clsx from "clsx";
import Link from "next/link";

export default function PrimaryLinkButton({
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
        `rounded-sm text-grayscale-14 text-[${fontSize}px] px-4 py-2 hover:bg-main-3`,
        {
          [`w-${width}px`]: width !== -1,
          "bg-main-2": !disabled,
          "bg-grayscale-7": disabled,
          "pointer-events-none": disabled,
        }
      )}
    >
      {text}
    </Link>
  );
}
