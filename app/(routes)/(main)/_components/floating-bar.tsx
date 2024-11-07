"use client";

import Icon from "@/app/_components/Icon";
import useDialogStore from "@/app/_utils/dialog/store";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const FloatingBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openAlert = useDialogStore((state) => state.openAlert);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  const shareLink = async () => {
    if (navigator.share) {
      // 모바일 환경: 공유 API 사용
      try {
        await navigator.share({
          title: "Check this out!",
          url: window.location.href, // 현재 페이지 링크
        });
        console.log("Successfully shared");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // 웹 환경: 클립보드에 링크 복사
      try {
        await navigator.clipboard.writeText(window.location.href);
        await openAlert({
          title: "링크 복사 성공",
          description: "복사된 링크를 공유해보세요",
        });
      } catch (error) {
        console.error("Failed to copy link:", error);
      }
    }
  };

  return (
    <div
      className={`fixed right-10 bottom-40 flex flex-col gap-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Link
        href="/program/customer"
        className="flex flex-col items-center w-14 h-14 py-2 bg-grayscale-14 rounded-full shadow-lg shadow-grayscale-10"
      >
        <Icon type="accountPlus" className="w-6 h-6 fill-[#0F62FE]" />
        <span className="text-[0.7rem]">고객등록</span>
      </Link>
      <Link
        href="/program/counsel/list"
        className="flex flex-col items-center w-14 h-14 py-2 bg-grayscale-14 rounded-full shadow-lg shadow-grayscale-10"
      >
        <Icon type="mobile" className="w-6 h-6 fill-[#0F62FE]" />
        <span className="text-[0.7rem]">고객상담</span>
      </Link>
      <Link
        href="/program/schedule"
        className="flex flex-col items-center w-14 h-14 py-2 bg-grayscale-14 rounded-full shadow-lg shadow-grayscale-10"
      >
        <Icon type="today" className="w-6 h-6 fill-[#0F62FE]" />
        <span className="text-[0.7rem]">일정관리</span>
      </Link>
      <Link
        href="/program/memo"
        className="flex flex-col items-center w-14 h-14 py-2 bg-grayscale-14 rounded-full shadow-lg shadow-grayscale-10"
      >
        <Icon type="folderAccount" className="w-6 h-6 fill-[#0F62FE]" />
        <span className="text-[0.7rem]">기록관리</span>
      </Link>
      <Link
        href={"/my-page/shop"}
        className="flex flex-col justify-center items-center w-14 h-14 bg-sub-1 text-grayscale-14 rounded-full shadow-lg shadow-grayscale-10"
        onClick={scrollToTop}
      >
        <span className="text-[0.7rem] font-normal">런칭</span>
        <span className="text-sm font-medium -mt-1">월1만원</span>
      </Link>
      <button
        className="flex justify-center items-center w-14 h-14 py-2 bg-[#0F62FE] rounded-full shadow-lg shadow-grayscale-10"
        onClick={scrollToTop}
      >
        <Icon
          type="down"
          className="w-6 h-6 rotate-180 fill-grayscale-14"
          onClick={scrollToTop}
        />
      </button>
      <button
        className="flex justify-center items-center w-14 h-14 py-2 bg-[#0F62FE] rounded-full shadow-lg shadow-grayscale-10"
        onClick={shareLink}
      >
        <Icon
          type="share"
          className="w-6 h-6 rotate-180 fill-grayscale-14"
          onClick={shareLink}
        />
      </button>
    </div>
  );
};

export default FloatingBar;
