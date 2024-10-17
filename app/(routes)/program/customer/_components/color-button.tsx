import Icon, { IconType } from "@/app/_components/Icon";
import cn from "@/app/_utils/cn";

export default function ColorButton({
  color,
  icon,
  title,
  onClick,
}: {
  color: string;
  icon?: IconType;
  title: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`bg-grayscale-14 border border-${color} px-4 py-2.5 flex items-center gap-2 cursor-pointer`}
      onClick={onClick}
    >
      {icon && (
        <Icon
          type={icon}
          className={cn(`w-5 h-5 fill-${color} stroke-${color}`)}
        />
      )}
      <span className={`text-${color}`}>{title}</span>
    </div>
  );
}
