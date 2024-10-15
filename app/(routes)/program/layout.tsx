import ProgramNav from "./_components/nav";
import TopBar from "./_components/bar/top-bar";
import BottomBar from "./_components/bar/bottom-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen h-screen">
      <ProgramNav />
      <div className="relative flex flex-col w-screen pl-60 overflow-x-hidden overflow-y-auto">
        <div className="sticky top-0 z-10">
          <TopBar />
        </div>
        <div className="flex flex-1 p-4 lg:p-6 2xl:p-10">{children}</div>
        <BottomBar />
      </div>
    </div>
  );
}
