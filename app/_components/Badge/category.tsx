import cn from "@utils/cn";

const badgeColors = {
  main: "border-main-3 text-main-3",
  sub: "border-sub-1 text-sub-1",
  gray: "border-grayscale-8 text-grayscale-8",
};

export default function CategoryBadge({
  color,
  children,
}: {
  color: "main" | "sub" | "gray";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "inline-block px-2 py-1 m-auto border rounded-full text-sm font-medium",
        badgeColors[color]
      )}
    >
      {children}
    </div>
  );
}
