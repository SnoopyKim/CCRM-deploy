import Icon, { IconType } from "@/app/_components/Icon";

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
      className={`border border-${color} px-4 py-2.5 flex items-center gap-2 cursor-pointer`}
      onClick={onClick}
    >
      {icon && (
        <Icon type={icon} className={`w-5 h-5 fill-${color} stroke-${color}`} />
      )}
      <span className={`text-${color}`}>{title}</span>
    </div>
  );
}
