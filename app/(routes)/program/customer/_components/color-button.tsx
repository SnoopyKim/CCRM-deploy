import Icon, { IconType } from "@/app/_components/Icon";
import cn from "@/app/_utils/cn";

const colors = {
  "main-2": {
    border: "border-main-2",
    text: "text-main-2",
    icon: "fill-main-2 stroke-main-2",
  },
  gray: {
    border: "border-grayscale-7",
    text: "text-grayscale-7",
    icon: "fill-grayscale-7",
  },
  "sub-1": {
    border: "border-sub-1",
    text: "text-sub-1",
    icon: "fill-sub-1 stroke-sub-1",
  },
  "sub-2": {
    border: "border-sub-2",
    text: "text-sub-2",
    icon: "fill-sub-2",
  },
  "sub-3": {
    border: "border-sub-3",
    text: "text-sub-3",
    icon: "fill-sub-3 stroke-sub-3",
  },
  "sub-4": {
    border: "border-sub-4",
    text: "text-sub-4",
    icon: "fill-sub-4 stroke-sub-4",
  },
  "sub-5": {
    border: "border-sub-5",
    text: "text-sub-5",
    icon: "fill-sub-5 stroke-sub-5",
  },
};

export default function ColorButton({
  color,
  icon,
  title,
  onClick,
}: {
  color: keyof typeof colors;
  icon?: IconType;
  title: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`bg-grayscale-14 border ${colors[color].border} px-4 py-2.5 flex items-center gap-2 cursor-pointer`}
      onClick={onClick}
    >
      {icon && (
        <Icon type={icon} className={cn(`w-5 h-5 ${colors[color].icon}`)} />
      )}
      <span className={colors[color].text}>{title}</span>
    </div>
  );
}
