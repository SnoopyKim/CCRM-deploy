export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav></nav>
      <section>{children}</section>;
    </>
  );
}
