export default function ServiceCenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <header className="pt-16">
        <h1 className="text-4xl py-4">고객센터</h1>
      </header>
      <div className="flex-1">{children}</div>
    </main>
  );
}
