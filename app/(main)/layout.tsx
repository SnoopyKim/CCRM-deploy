import MainNav from "@/app/(main)/_components/main-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      {children}
    </>
  );
}
