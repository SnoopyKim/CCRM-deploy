import React from "react";
import MainNavItem from "./nav-item";
import Link from "next/link";
import AuthButton from "./auth-button.";
import Icon from "@components/Icon";
import { LinkButton } from "@/app/_components/Button";

export default function MainNav() {
  return (
    <div className="flex flex-1 h-[72px] justify-center border-b border-grayscale-11 bg-grayscale-14">
      <div className="flex flex-1 flex-row max-w-[1200px] items-center">
        <Link href={"/"} className="mr-[100px]">
          <Icon type="logo" className="w-[80px] h-[25px]" />
        </Link>
        <div className="flex flex-row flex-1 h-full pl-4 gap-4">
          <MainNavItem href="/b2b">B2B제휴</MainNavItem>
          <MainNavItem href="/my-page/shop" plain>
            제품 구매하기
          </MainNavItem>
          <MainNavItem href="/service-center">고객센터</MainNavItem>
        </div>
        <div className="flex flex-row h-full items-center">
          <MainNavItem href="/my-page">마이페이지</MainNavItem>
          <AuthButton />
          <LinkButton
            href="/program"
            title="프로그램 시작하기"
            color="secondary"
            className="font-semibold text-sm h-9"
          />
        </div>
      </div>
    </div>
  );
}
