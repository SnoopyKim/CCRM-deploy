import { OutlineButton } from "@/app/_components/Button";
import { SearchField } from "@/app/_components/Text";
import Image from "next/image";
import ProgramNavItem from "./item";
import ProgramNavItemWithSub from "./item-sub";
import SignoutButton from "./signout";
import ProgramSearchBar from "./search";

export default function ProgramNav() {
  return (
    <nav className="flex flex-col items-stretch w-60 bg-main-2 text-grayscale-14 pt-14">
      {/* 프로필 */}
      <div className="flex flex-col justify-center items-center py-6">
        <div className="flex items-center">
          <Image
            src="/images/program/avatar-default.svg"
            width={56}
            height={56}
            alt=""
          />
          <span className="ml-2">홍길동 님</span>
        </div>
        <p className="mt-2">잔여일 : 60일 [결제]</p>
        <div className="flex justify-center gap-2 pt-6">
          <OutlineButton
            href="/my-page"
            title="마이페이지"
            className="text-sm leading-normal"
          />
          <SignoutButton />
        </div>
      </div>
      {/* 통합검색 */}
      <ProgramSearchBar />
      {/* NavItems */}
      <div className="w-full flex flex-col items-stretch">
        <ProgramNavItem
          icon="education"
          title="교육 클래스"
          href="/program/education"
        />
        <ProgramNavItemWithSub
          icon="register"
          title="고객 등록"
          subList={[
            {
              title: "고객 등록",
              href: "/program/register",
            },
            {
              title: "고객 조회",
              href: "/program/retrieve",
            },
          ]}
        />
        <ProgramNavItemWithSub
          icon="counsel"
          title="상담 일지"
          subList={[
            {
              title: "상담 등록",
              href: "/program/counsel",
            },
            {
              title: "상담 현황",
              href: "/program/counsel-list",
            },
          ]}
        />
        <ProgramNavItemWithSub
          icon="schedule"
          title="일정 관리"
          subList={[
            {
              title: "일정 등록",
              href: "/program/schedule",
            },
            {
              title: "일정 현황",
              href: "/program/schedule-list",
            },
          ]}
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
            {
              title: "메일 발송",
              href: "/program/message/mail",
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
        <ProgramNavItem icon="memo" title="업무 일지" href="/program/memo" />
        <ProgramNavItem icon="archive" title="자료실" href="/program/archive" />
      </div>
    </nav>
  );
}
