import ProgramNav from "./_components/nav";
import TopBar from "./_components/bar/top-bar";
import BottomBar from "./_components/bar/bottom-bar";

export default function ProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-lg:flex-col w-screen h-screen">
      <ProgramNav />
      <div
        id="main"
        className="relative flex flex-col flex-1 w-screen lg:pl-60 overflow-x-hidden overflow-y-auto"
      >
        <div className="sticky top-0 z-10 max-lg:hidden">
          <TopBar />
        </div>
        <div className="flex flex-1 p-8 lg:p-6 2xl:p-10">{children}</div>
        <BottomBar />
      </div>
    </div>
  );
}
