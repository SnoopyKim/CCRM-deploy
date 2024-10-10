import Icon from "@components/Icon";
import Link from "next/link";

export default function MainFooter() {
  return (
    <div className="flex flex-1 flex-row h-40 py-9 max-w-[1200px] justify-between items-end">
      <div>
        <Icon type="logo" className="fill-grayscale-9 w-28" />
        <div className="flex flex-row mt-5">
          <Link
            href="/terms"
            scroll={false}
            className="text-grayscale-8 text-sm cursor-pointer"
          >
            이용약관
          </Link>
          <span className="text-grayscale-8 text-sm mx-2">|</span>
          <Link
            href="/privacy"
            scroll={false}
            className="text-grayscale-8 text-sm cursor-pointer"
          >
            개인정보처리방침
          </Link>
        </div>
      </div>
      <p className="text-grayscale-8 text-sm text-end whitespace-pre-line">
        {`CCRM | (주)비가자네트웍스
        사업자등록번호 633-87-01853 | 원격평생교육시설 제원-670호(서울시교육청) | 통신판매신고 제2021-서울강남-01014호 
        서울시 강남구 테헤란로20길 27 동방빌딩 | ⓒ BIGAZA Networks Co. Ltd., ALL RIGHTS RESERVED`}
      </p>
    </div>
  );
}
