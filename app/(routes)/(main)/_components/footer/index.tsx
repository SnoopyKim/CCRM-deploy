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
      <p className="text-grayscale-8 text-sm text-end">
        (주)에프피하우스 사업자등록번호 : 281-81-00947 | 통신판매신고 : 제
        2017-부산남구-0501 호<br />| 대표 : 문경준 | 부산시 동구 조방로 14
        동일타워 413호 | 1566-4875
        <br />| COPYRIGHTⓒBY FPHOUSE.ALL RIGHTS RESERVED
      </p>
    </div>
  );
}
