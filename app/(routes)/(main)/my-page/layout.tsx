import Link from "next/link";
import SideNav from "./_components/side-nav";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-1 max-w-[1200px] w-full m-auto pt-20 max-lg:pt-10">
      <SideNav />
      <main className="flex flex-col col-span-3 max-lg:px-8">{children}</main>
    </div>
  );
}
