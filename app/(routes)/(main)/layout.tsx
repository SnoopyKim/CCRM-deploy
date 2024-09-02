import MainNav from "@main/_components/nav";
import MainFooter from "@main/_components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <MainNav />
      </nav>
      <section className="pt-[72px]">{children}</section>
      <footer className="flex justify-center">
        <MainFooter />
      </footer>
    </>
  );
}
