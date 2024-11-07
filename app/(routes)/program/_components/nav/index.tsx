"use client";

import ProgramNavItem from "./item";
import ProgramNavItemWithSub from "./item-sub";
import NavSearchBar from "./search";
import Profile from "./profile";
import Image from "next/image";
import Link from "next/link";
import useWindowSize from "@/app/_utils/window-size";
import Icon from "@/app/_components/Icon";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function ProgramNav() {
  const { width } = useWindowSize();

  const menus = (
    <div className="w-full overflow-y-auto scroll-m-0 scrollbar-hide">
      <ProgramNavItem
        icon="education"
        title="교육 클래스"
        href="/program/education"
      />
      <ProgramNavItem
        icon="register"
        title="고객 관리"
        href="/program/customer"
      />
      <ProgramNavItemWithSub
        icon="counsel"
        title="상담 일지"
        subList={[
          {
            title: "상담 등록",
            href: "/program/counsel/new",
          },
          {
            title: "상담 현황",
            href: "/program/counsel/list",
          },
        ]}
      />
      <ProgramNavItem
        href="/program/schedule"
        icon="schedule"
        title="일정 관리"
      />
      <ProgramNavItemWithSub
        icon="message"
        title="메세지 발송"
        subList={[
          {
            title: "카톡 발송",
            href: "/program/message/kakao",
          },
          {
            title: "문자 발송",
            href: "/program/message/sms",
          },
        ]}
      />
      <ProgramNavItemWithSub
        icon="insurance"
        title="보상 관리"
        subList={[
          {
            title: "보험금 청구",
            href: "/program/insurance/bill",
          },
          {
            title: "질병 코드",
            href: "/program/insurance/diseases",
          },
          {
            title: "약관 조회",
            href: "/program/insurance/terms",
          },
        ]}
      />
      <ProgramNavItem icon="memo" title="메모/기록" href="/program/memo" />
      <ProgramNavItem icon="archive" title="자료실" href="/program/archive" />
    </div>
  );

  return width >= 1024 ? (
    <nav className="fixed flex flex-col h-screen items-stretch w-60 z-10 bg-main-2 text-grayscale-14">
      <Link
        href={"/program"}
        className="flex min-h-16 justify-center items-center border-b border-grayscale-9"
      >
        <Image src="/images/white-logo.svg" alt="logo" width={64} height={20} />
      </Link>
      {/* 프로필 */}
      <Profile />
      {/* 통합검색 */}
      {/* <NavSearchBar /> */}
      {/* NavItems */}
      {menus}
    </nav>
  ) : (
    <nav className="sticky top-0 left-0 right-0 z-10">
      <div className="flex h-[72px] justify-center border-b border-grayscale-11 bg-grayscale-14">
        <div className="w-full flex max-w-[1200px] px-6 justify-between">
          <div className="h-full flex items-center">
            <Link href={"/program"} className="mr-20">
              <Icon type="logo" className="w-[80px] h-[25px]" />
            </Link>
          </div>
          <div className="flex h-full gap-4 items-center">
            <MobileMenu>
              <Profile />
              {menus}
            </MobileMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

const MobileMenu = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useEffect(() => {
    if (path) {
      setIsSidebarOpen(false);
    }
  }, [path]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.getElementById("main")?.classList.add("overflow-y-hidden");
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.getElementById("main")?.classList.remove("overflow-y-hidden");
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.getElementById("main")?.classList.remove("overflow-y-hidden"); // 컴포넌트가 언마운트될 때 스크롤 활성화
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* 햄버거 버튼 */}
      <Icon type="menu" className="w-10 h-10" onClick={toggleSidebar} />
      {/* 오버레이 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-main-1 bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* 사이드바 */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full py-4 bg-main-2 shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } w-3/5 max-w-80 z-50`}
      >
        {children}
      </div>
    </>
  );
};
