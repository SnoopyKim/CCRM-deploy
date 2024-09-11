import ProgramNav from "./_components/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ProgramNav />
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
