import MainNav from "@main/_components/nav";
import MainFooter from "@main/_components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      <section className="min-h-[calc(100vh-5rem)]">{children}</section>
      <footer className="flex justify-center mt-20">
        <MainFooter />
      </footer>
    </>
  );
}
