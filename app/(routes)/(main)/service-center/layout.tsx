import MainNavItem from "@main/_components/nav/nav-item";

export default function ServiceCenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center">
      <main className="flex max-w-[1200px] w-full flex-col items-center">
        <header className="flex w-full h-[221px] bg-service-center bg-cover bg-center justify-center items-center mt-10">
          <div className="flex flex-col items-center text-grayscale-14 ">
            <h1 className="text-[42px]">고객센터</h1>
            <p className="pt-2 ">평일 : 10시 ~ 18시 | 주말/공휴일 휴무</p>
          </div>
        </header>
        <nav className="flex flex-row h-14">
          <MainNavItem href="/service-center/notice" width={200} isSub>
            공지사항
          </MainNavItem>
          <MainNavItem href="/service-center/faq" width={200} isSub>
            FAQ
          </MainNavItem>
          <MainNavItem href="/service-center/inquiry" width={200} isSub>
            1:1 문의
          </MainNavItem>
        </nav>

        <section className="flex flex-col px-[100px] w-full mt-10">
          {children}
        </section>
      </main>
    </div>
  );
}
