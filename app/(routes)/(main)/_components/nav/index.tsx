"use client";

import React, { useEffect, useRef, useState } from "react";
import MainNavItem from "./nav-item";
import Link from "next/link";
import AuthButton from "./auth-button.";
import Icon from "@components/Icon";
import { LinkButton } from "@/app/_components/Button";
import useWindowSize from "@/app/_utils/window-size";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const { width } = useWindowSize();

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-10">
        <div className="flex h-[72px] justify-center border-b border-grayscale-11 bg-grayscale-14">
          <div className="w-full flex max-w-[1200px] px-6 justify-between">
            <div className="h-full flex items-center">
              <Link href={"/"} className="mr-20">
                <Icon type="logo" className="w-[80px] h-[25px]" />
              </Link>
              {width >= 1024 && (
                <>
                  <MainNavItem href="/my-page/shop" plain={true}>
                    제품 구매하기
                  </MainNavItem>
                  <MainNavItem href="/service-center">고객센터</MainNavItem>
                </>
              )}
            </div>
            <div className="flex h-full gap-4 items-center">
              {width >= 1024 ? (
                <>
                  <MainNavItem href="/my-page">마이페이지</MainNavItem>
                  <AuthButton />
                  <LinkButton
                    href="/program"
                    title="프로그램 시작하기"
                    color="secondary"
                    className="font-semibold text-sm h-9"
                  />
                </>
              ) : (
                <MobileMenu />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

const MobileMenu = () => {
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
    // if (!isSidebarOpen) {
    //         document.getElementById("main")?.classList.add("overflow-y-hidden"); // 스크롤 막기
    // } else {
    //   document.getElementById("main")?.classList.remove("overflow-y-hidden"); // 스크롤 다시 활성화
    // }
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
        className={`fixed top-0 right-0 h-full px-4 py-4 bg-grayscale-14 shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } w-3/5 max-w-80 z-50`}
      >
        <div className="flex justify-between items-center">
          <AuthButton />
          <Icon
            type="plus"
            className="w-8 h-8 rotate-45 stroke-1"
            onClick={toggleSidebar}
          />
        </div>
        <LinkButton
          href="/program"
          title="프로그램 시작하기"
          color="secondary"
          className="text-base h-10 my-4"
        />
        <nav className="flex flex-col items-stretch divide-y divide-grayscale-11">
          <Link href="/my-page/shop" className="font-normal py-4">
            제품 구매하기
          </Link>
          <Link href="/service-center" className="font-normal py-4">
            고객센터
          </Link>
          <Link href="/my-page" className="font-normal py-4">
            마이페이지
          </Link>
        </nav>
      </div>
    </>
  );
};
