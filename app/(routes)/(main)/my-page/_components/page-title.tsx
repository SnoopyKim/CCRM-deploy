export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-24 border-b border-b-grayscale-11">
      <h1 className="text-[28px]">{children}</h1>
    </div>
  );
}
