import PrimaryButton from "@/app/_components/Button/button";
import Icon from "@/app/_components/Icon";
import { TextArea, TextField } from "@/app/_components/Text";
import Link from "next/link";

export default function MorningReadingPage() {
  return (
    <div className="grid grid-cols-2 w-full">
      <div className="relative bg-[url('/images/program/morning-reading.png')] bg-cover bg-center text-grayscale-14 px-28 py-20">
        <Link href="/program/message/sms" className="absolute top-4 left-2">
          <Icon type="down" className="w-10 h-10 rotate-90 fill-grayscale-14" />
        </Link>
        <h1 className="text-5xl font-serif font-semibold">아침 독서 신청</h1>
        <p className="mt-4 text-xl font-normal">
          국내 유일의 도서 요약 프로그램
          <br /> 이용자 맞춤형 웹사이트 제공!
        </p>
        <ul className="mt-16 mb-4 ml-4">
          <li className="list-disc">
            매주 월요일 분야별 신간도서 6권 요약본 제공
          </li>
          <li className="list-disc">읽기도 하고 듣기도 하고(음성버전 제공)</li>
          <li className="list-disc">Hi-Quality 고객관리 프로그램 ‘아침독서’</li>
          <li className="list-disc">
            정가=30만원/연 → CCRM회원 런칭Event(100% 무상지원)
          </li>
        </ul>
        <Link
          href={"/program/message/morning"}
          className="underline underline-offset-2 font-normal text-lg"
        >
          이용 Guide 보기
        </Link>
      </div>
      <div className="flex items-center px-6">
        <div className="w-[400px] flex flex-col space-y-4 ">
          <div>
            <TextField title="성명" caution="필수" className="h-12" />
          </div>
          <div>
            <TextField title="소속사" caution="필수" className="h-12" />
          </div>
          <div>
            <TextField title="이메일" caution="필수" className="h-12" />
          </div>
          <div>
            <TextField title="휴대폰 번호" caution="필수" className="h-12" />
          </div>
          <div>
            <TextField
              title="팩스 번호"
              caution="선택"
              cautionClassName="text-grayscale-6"
              className="h-12"
            />
          </div>
          <div>
            <TextField
              title="연구소 링크 주소"
              caution="선택"
              cautionClassName="text-grayscale-6"
              className="h-12"
            />
          </div>
          <div>
            <TextField
              title="자격/경력"
              caution="선택"
              cautionClassName="text-grayscale-6"
              className="h-12"
            />
          </div>
          <div>
            <TextField
              title="서비스 내용"
              caution="선택"
              cautionClassName="text-grayscale-6"
              className="h-12"
            />
          </div>
          <TextArea label="소개글" className="h-32" />
          <PrimaryButton title="구독하기" color="main" />
        </div>
      </div>
    </div>
  );
}
