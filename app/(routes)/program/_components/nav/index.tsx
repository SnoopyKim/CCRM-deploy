import ProgramNavItem from "./item";
import ProgramNavItemWithSub from "./item-sub";
import NavSearchBar from "./search";
import Profile from "./profile";
import Image from "next/image";
import Link from "next/link";

export default function ProgramNav() {
  return (
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
    </nav>
  );
}
