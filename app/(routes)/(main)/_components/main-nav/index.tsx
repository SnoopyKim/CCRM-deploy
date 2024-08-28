import Image from "next/image";
import React from "react";
import MainNavItem from "./nav-item";
import Link from "next/link";
import AuthButton from "./auth-button.";
import { SecondaryLinkButton } from "@/app/_components/Button";

export default function MainNav() {
  return (
    <div className="flex flex-1 justify-center border-b border-grayscale-11 bg-grayscale-14">
      <div className="flex flex-1 flex-row max-w-[1200px] items-center">
        <Link href={"/"} className="relative w-[79px] h-[22px] mr-[120px]">
          <Image src="/assets/logo.svg" alt="CCRM Logo" fill priority />
        </Link>
        <div className="flex flex-row flex-1 px-2">
          <MainNavItem href="/b2b">B2B제휴</MainNavItem>
          <MainNavItem href="/my-page/purchase" selectable={false}>
            제품 구매하기
          </MainNavItem>
          <MainNavItem href="/service-center">고객센터</MainNavItem>
        </div>
        <div className="flex flex-row items-center">
          <MainNavItem href="/my-page">마이페이지</MainNavItem>
          <AuthButton />
          <SecondaryLinkButton
            link="/program"
            text="프로그램 시작하기"
            fontSize={14}
          />
        </div>
      </div>
    </div>
  );
}
