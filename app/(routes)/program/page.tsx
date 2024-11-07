import Image from "next/image";
import ProgramSearchBar from "./_components/bar/search-bar";
import Link from "next/link";

export default function ProgramPage() {
  const menus = [
    {
      name: "고객등록",
      href: "/program/customer",
      icon: "/images/program/menu/customer.png",
    },
    {
      name: "상담일지",
      href: "/program/counsel/list",
      icon: "/images/program/menu/councel.png",
    },
    {
      name: "일정관리",
      href: "/program/schedule",
      icon: "/images/program/menu/schedule.png",
    },
    {
      name: "메시지 발송",
      href: "/program/message",
      icon: "/images/program/menu/message.png",
    },
    {
      name: "보상관리",
      href: "/program/insurance/bill",
      icon: "/images/program/menu/insurance.png",
    },
    {
      name: "메모/기록",
      href: "/program/memo",
      icon: "/images/program/menu/memo.png",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col items-center w-full max-w-screen-sm space-y-12 max-lg:-mt-10">
          <div className="w-40 2xl:w-48">
            <Image
              src={"/images/black-logo.svg"}
              alt="logo"
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          {/* <ProgramSearchBar /> */}
          <div className="grid grid-cols-3 lg:gap-2">
            {menus.map((menu, index) => (
              <Link
                key={index}
                href={menu.href}
                className="relative group flex flex-col items-center justify-center rounded-lg w-40 h-40 hover:bg-[#F2F5FF]"
              >
                <div className="w-full pt-[100%]"></div> {/* 1:1 비율 */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                  <Image
                    src={menu.icon}
                    alt={menu.name}
                    width={72}
                    height={72}
                  />
                  <p className="mt-4 text-lg font-semibold text-center">
                    {menu.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div>{/* 배너광고들 배치 */}</div>
    </div>
  );
}
