import Icon, { IconType } from "@/app/_components/Icon";

export default function FormContainer({
  icon,
  title,
  actionComponent,
  children,
}: {
  icon: IconType;
  title: string;
  actionComponent?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-grayscale-13 p-4 rounded-sm gap-2">
      <div className="flex justify-between items-center font-medium text-grayscale-5">
        <div className="flex gap-2 items-center">
          <Icon type={icon} className=" fill-grayscale-6" />
          {title}
        </div>
        {actionComponent}
      </div>
      <div className="border border-grayscale-11 rounded-sm p-4 space-y-2">
        {children}
      </div>
    </div>
  );
}
