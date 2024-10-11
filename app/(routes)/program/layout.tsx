import ProgramNav from "./_components/nav";
import TopBar from "./_components/bar/top-bar";
import BottomBar from "./_components/bar/bottom-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ProgramNav />
      <div className="flex flex-col w-full justify-between">
        <div className="sticky top-0 z-10">
          <TopBar />
        </div>
        <div className="flex flex-1 w-full mx-10 p-10">{children}</div>
        <div className="sticky bottom-0 z-10">
          <BottomBar />
        </div>
      </div>
    </div>
  );
}
