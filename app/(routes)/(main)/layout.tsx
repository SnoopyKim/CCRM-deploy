import MainNav from "@/app/(routes)/(main)/_components/nav";
import MainFooter from "./_components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0">
        <MainNav />
      </nav>
      <div className="pt-[72px]">{children}</div>
      <footer className="flex justify-center">
        <MainFooter />
      </footer>
    </>
  );
}
