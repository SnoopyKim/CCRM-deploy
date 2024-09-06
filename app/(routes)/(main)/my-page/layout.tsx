import Link from "next/link";
import SideNav from "./_components/side-nav";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-[1200px] w-full m-auto pt-20">
      <SideNav />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
