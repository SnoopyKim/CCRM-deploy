import { Button, LinkButton } from "@components/Button";
import Image from "next/image";
import Link from "next/link";
import FloatingBar from "./_components/floating-bar";

export default function MainPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="w-full max-lg:h-[600px] aspect-[192/160] bg-[url('/images/main/main-visual.svg')] bg-no-repeat bg-bottom bg-cover">
        <div className="flex flex-col mt-20 max-lg:mt-10 gap-10 items-center ">
          <h1 className="text-6xl max-lg:text-4xl font-bold whitespace-pre-line leading-normal max-lg:leading-normal text-center">
            전문적인 고객관리{"\n"}효율적인 시간관리{"\n"}
            업무 효율 극대화
          </h1>
          <LinkButton
            href="/program"
            title="CCRM 체험하기"
            color="primary"
            className="rounded-full flex-shrink-0 w-44 font-semibold bg-main-2 text-lg"
          />
        </div>
      </div>
      {/* 고객등록 */}
      <div className="w-full mt-80 max-lg:mt-40 grid grid-cols-2 max-lg:grid-cols-1 h-[800px]">
        <div className="flex justify-center items-center bg-gradient-to-tr from-[#E3EFFF] to-grayscale-14">
          <Image
            src={"/images/main/고객등록.svg"}
            width={720}
            height={0}
            style={{ height: "auto" }}
            alt=""
          />
        </div>
        <div className="lg:pl-40 lg:pr-10 flex flex-col gap-8 justify-center max-lg:items-center">
          <Image
            src="images/main/plus-circle.svg"
            width={60}
            height={60}
            alt=""
            className="max-lg:w-12 max-lg:h-12"
          />
          <div className="max-lg:text-center">
            <h2 className="text-4xl max-lg:text-2xl font-bold">
              간편한 고객등록 및 고객관리
            </h2>
            <p className="text-2xl max-lg:text-xl max-lg:px-20 text-grayscale-6 mt-6 whitespace-pre-line font-normal leading-normal">
              구글드라이브 연동, 엑셀등으로{"\n"}
              간편하게 고객등록 완료!{"\n"}
              고객들의 모든 정보와 자료들을 고객별로 쉽게 찾아볼 수 있어요.
            </p>
          </div>
          <Link
            href={"/guide"}
            className="underline underline-offset-2 text-grayscale-7 text-lg font-medium"
          >
            이용 Guide 보기 &gt;
          </Link>
        </div>
      </div>
      {/* 고객상담 */}
      <div className="w-full mt-80 max-lg:mt-20 grid grid-cols-2 max-lg:grid-cols-1 lg:h-[800px]">
        <div className="relative bg-gradient-to-tr from-[#F3EAFF] to-grayscale-14 max-lg:h-[400px]">
          <Image
            src={"/images/main/고객상담.svg"}
            width={620}
            height={300}
            style={{ height: "auto" }}
            alt=""
            className="absolute left-0 top-[20%] max-lg:w-2/3"
          />
          <Image
            src={"/images/main/chat-bubble.png"}
            width={500}
            height={300}
            alt=""
            style={{ height: "auto" }}
            className="absolute -right-20 max-lg:right-6 top-[15%] max-lg:top-10 max-lg:w-3/5"
          />
        </div>
        <div className="lg:pl-40 lg:pr-10 flex flex-col gap-8 justify-center max-lg:items-center max-lg:p-10">
          <Image
            src="images/main/plus-circle.svg"
            width={60}
            height={60}
            alt=""
            className="max-lg:w-12 max-lg:h-12"
          />
          <div className="max-lg:text-center">
            <h2 className="text-4xl max-lg:text-2xl font-bold">
              고객상담 내역관리
            </h2>
            <p className="text-2xl max-lg:text-xl text-grayscale-6 mt-6 whitespace-pre-line font-normal leading-normal">
              모든 고객과의 미팅 내용을{"\n"}
              자유롭고 상세하기 입력/관리 가능합니다.{"\n"}
            </p>
            <p className="mt-6 text-grayscale-7 text-2xl max-lg:text-xl font-normal leading-normal">
              <strong className="text-grayscale-4 font-semibold">
                핵심 기능
              </strong>
              <br />
              미팅내용 녹음(파일 생성), 녹음파일 원터치 Text 변환, 원본 Text AI
              자동 요약
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:pl-10">
            <div className="flex gap-2 items-center">
              <Image
                src="/images/main/check-blue.svg"
                width={36}
                height={31}
                alt=""
                className="max-lg:w-8"
              />
              <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                언제, 어디서
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/images/main/check-blue.svg"
                width={36}
                height={31}
                alt=""
                className="max-lg:w-8"
              />
              <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                누구와, 어떤 대화를 했는지
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/images/main/check-blue.svg"
                width={36}
                height={31}
                alt=""
                className="max-lg:w-8"
              />
              <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                저장, 관리, 열람 가능
              </span>
            </div>
            <Link
              href={"/guide"}
              className="underline underline-offset-2 text-grayscale-7 text-lg font-medium max-lg:mx-auto max-lg:mt-4"
            >
              이용 Guide 보기 &gt;
            </Link>
          </div>
        </div>
      </div>
      {/* 메시지 대량발송 */}
      <div className="w-full mt-80 max-lg:mt-40 grid grid-cols-2 max-lg:grid-cols-1 h-[800px]">
        <div className="relative bg-[#FFFBEF] to-grayscale-14 max-lg:h-[400px]">
          <Image
            src={"/images/main/대량발송.svg"}
            width={800}
            height={0}
            style={{ height: "auto" }}
            alt=""
            className="absolute lg:-right-20 top-[33%] max-lg:w-[90%] max-lg:left-1/2 max-lg:-translate-x-1/2"
          />
        </div>
        <div className="lg:pl-40 lg:pr-10 flex flex-col gap-8 justify-center max-lg:p-10 max-lg:-mt-20 max-lg:items-center">
          <Image
            src="images/main/plus-circle.svg"
            width={60}
            height={60}
            alt=""
            className="max-lg:w-12 max-lg:h-12"
          />
          <div className="max-lg:text-center">
            <h2 className="text-4xl max-lg:text-2xl font-bold">
              메세지 대량발송 : 카카오톡/문자/메일
            </h2>
            <p className="text-2xl max-lg:text-xl text-grayscale-6 mt-6 whitespace-pre-line font-normal leading-normal">
              모든 고객들에게 안부메세지 및 뉴스레터를{"\n"}
              대량으로 쉽고 빠르게 전달 가능합니다.{"\n"}
            </p>
          </div>
          <Link
            href={"/guide"}
            className="underline underline-offset-2 text-grayscale-7 text-lg font-medium"
          >
            이용 Guide 보기 &gt;
          </Link>
        </div>
      </div>
      {/* 일정관리 */}
      <div className="w-full mt-80 max-lg:mt-10 grid grid-cols-2 max-lg:grid-cols-1 h-[800px]">
        <div className="lg:pl-[20%] lg:pr-10 flex flex-col gap-8 justify-center max-lg:items-center max-lg:p-10 max-lg:order-2">
          <Image
            src="images/main/plus-circle.svg"
            width={60}
            height={60}
            alt=""
            className="max-lg:w-12 max-lg:h-12"
          />
          <div className="max-lg:text-center">
            <h2 className="text-4xl max-lg:text-2xl font-bold">
              효율적인 일정관리
            </h2>
            <p className="text-2xl max-lg:text-lg text-grayscale-6 mt-6 whitespace-pre-line font-normal leading-normal">
              구글 및 네이버 캘린더와 연동되어 일정관리를{"\n"}
              편리하고 효율적으로 관리할 수 있습니다.{"\n"}
              사전알림 서비스{"\n"}
              (상녕일=20일전, 미팅일정=1일전, 생일 등 기념일=7일전)
            </p>
          </div>
          <Link
            href={"/guide"}
            className="underline underline-offset-2 text-grayscale-7 text-lg font-medium"
          >
            이용 Guide 보기 &gt;
          </Link>
        </div>
        <div className="relative bg-[#FFE5E5] max-lg:h-[400px]">
          <Image
            src="/images/main/일정관리1.svg"
            width={320}
            height={0}
            style={{ height: "auto" }}
            alt=""
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1/3 left-1/4 lg:left-[20%]"
          />
          <Image
            src="/images/main/일정관리2.svg"
            width={500}
            height={0}
            style={{ height: "auto" }}
            alt=""
            className="absolute right-0 bottom-0 w-1/2 lg:w-3/5"
          />
        </div>
      </div>
      {/* 메모/기록 */}
      <div className="w-full mt-80 max-lg:mt-20 grid grid-cols-2 max-lg:grid-cols-1 h-[800px]">
        <div className="lg:pl-[20%] lg:pr-10  flex flex-col gap-8 justify-center max-lg:items-center max-lg:p-10 max-lg:order-2">
          <Image
            src="images/main/plus-circle.svg"
            width={60}
            height={60}
            alt=""
            className="max-lg:w-12 max-lg:h-12"
          />
          <div className="max-lg:text-center">
            <h2 className="text-4xl max-lg:text-2xl font-bold">
              메모/기록 관리
            </h2>
            <p className="text-2xl max-lg:text-lg text-grayscale-6 mt-6 whitespace-pre-line font-normal leading-normal">
              생각나는 모든 것들을 글로벌 프로그램 Notion 연동을 통해{"\n"}
              빠르고 간편하게 기록해 보세요(모바일-PC실시간 동기화)
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:pl-10">
            <div className="flex gap-2 items-center">
              <Image
                src="/images/main/check-blue.svg"
                width={36}
                height={31}
                alt=""
                className="max-lg:w-8 max-lg:h-8"
              />
              <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                아이디어, 메모, 할일 등을 자유롭게 기록
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/images/main/check-blue.svg"
                width={36}
                height={31}
                alt=""
                className="max-lg:w-8 max-lg:h-8"
              />
              <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                Mobile과 PC 상호간 실시간 동기화
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/images/main/check-blue.svg"
                width={36}
                height={31}
                alt=""
                className="max-lg:w-8 max-lg:h-8"
              />
              <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                팀별 업무 및 소통관리{" "}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/images/main/check-blue.svg"
                width={36}
                height={31}
                alt=""
                className="max-lg:w-8 max-lg:h-8"
              />
              <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                쉽고 간단한 효율적인 메모입력 시스템{" "}
              </span>
            </div>
            <Link
              href={"/guide"}
              className="underline underline-offset-2 text-grayscale-7 text-lg font-medium max-lg:mx-auto max-lg:mt-4"
            >
              이용 Guide 보기 &gt;
            </Link>
          </div>
        </div>
        <div className="relative bg-[#F6F5F4] max-lg:h-[400px]">
          <Image
            src={"/images/main/업무일지.svg"}
            width={500}
            height={0}
            style={{ height: "auto" }}
            alt=""
            className="absolute right-0 bottom-0 w-[92%]"
          />
        </div>
      </div>
      {/* 아침독서 */}
      <div className="w-full mt-80 max-lg:mt-40 grid grid-cols-2 max-lg:grid-cols-1 h-[800px]">
        <div className="lg:pl-[20%] lg:pr-10  flex flex-col gap-8 justify-center  max-lg:items-center max-lg:p-10 max-lg:order-2">
          <Image
            src="images/main/plus-circle.svg"
            width={60}
            height={60}
            alt=""
            className="max-lg:w-12 max-lg:h-12"
          />
          <div className="max-lg:text-center">
            <h2 className="text-4xl max-lg:text-2xl font-bold">아침 독서</h2>
            <p className="text-2xl max-lg:text-xl text-grayscale-6 mt-6 whitespace-pre-line font-normal leading-normal">
              국내 유일의 도서 요약 프로그램{"\n"}
              이용자 맞춤형 웹사이트 제공!{" "}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:pl-10">
            <div className="flex gap-2 items-center">
              <Image
                src="/images/main/check-blue.svg"
                width={36}
                height={31}
                alt=""
                className="max-lg:w-8 max-lg:h-8"
              />
              <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                매주 월요일 분야별 신간도서 6권 요약본 제공
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/images/main/check-blue.svg"
                width={36}
                height={31}
                alt=""
                className="max-lg:w-8 max-lg:h-8"
              />
              <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                읽기도 하고 듣기도 하고(음성버전 제공)
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/images/main/check-blue.svg"
                width={36}
                height={31}
                alt=""
                className="max-lg:w-8 max-lg:h-8"
              />
              <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                Hi-Quality 고객관리 프로그램 ‘아침독서’
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/images/main/check-blue.svg"
                width={36}
                height={31}
                alt=""
                className="max-lg:w-8 max-lg:h-8"
              />
              <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                정가=30만원/연 → CCRM회원 런칭Event(100% 무상지원)
              </span>
            </div>
            <Link
              href={"/guide"}
              className="underline underline-offset-2 text-grayscale-7 text-lg font-medium max-lg:mx-auto max-lg:mt-4"
            >
              이용 Guide 보기 &gt;
            </Link>
          </div>
        </div>
        <div className="relative bg-gradient-to-br from-[#FFF1CE] to-[#F6F5F4] max-lg:h-[400px]">
          <Image
            src={"/images/main/아침독서1.svg"}
            width={800}
            height={0}
            alt=""
            style={{ height: "auto" }}
            className="absolute top-[20%] -left-20 w-[90%] max-lg:left-1/2 max-lg:-translate-x-1/2"
          />
          <Image
            src={"/images/main/아침독서2.png"}
            width={500}
            height={0}
            alt=""
            style={{ height: "auto" }}
            className="absolute right-[10%] bottom-[10%] w-3/5"
          />
        </div>
      </div>
      {/* Education */}
      <div className="w-full mt-80 max-lg:mt-20 grid grid-cols-2 max-lg:grid-cols-1 h-[800px]">
        <div className="lg:pl-[20%] lg:pr-10 flex flex-col gap-8 justify-center max-lg:items-center max-lg:p-10 max-lg:order-2 max-lg:-mt-20">
          <Image
            src="images/main/plus-circle.svg"
            width={60}
            height={60}
            alt=""
            className="max-lg:w-12 max-lg:h-12"
          />
          <div className="flex flex-col gap-3 max-lg:items-center">
            <h2 className="text-4xl max-lg:text-3xl font-bold">Education</h2>
            <p className="text-2xl max-lg:text-xl text-grayscale-6 mt-6 whitespace-pre-line font-normal leading-normal">
              적시성 있는 정보{"\n"}
              분야별 이슈와 쟁점사항{" "}
            </p>
          </div>
          <Link
            href={"/guide"}
            className="underline underline-offset-2 text-grayscale-7 text-lg font-medium"
          >
            이용 Guide 보기 &gt;
          </Link>
        </div>
        <div className="relative bg-gradient-to-b from-[#D2D5DE] to-[#F8F9FF] max-lg:h-[400px]">
          <div
            className="flex flex-col absolute w-1/2 -left-[20%] top-1/2 -translate-y-1/2 bg-[#D5D8E1] p-6 gap-4 rounded-lg max-lg:hidden"
            style={{ boxShadow: "50px 40px 30px #00000030" }}
          >
            <div className="flex justify-center items-center rounded-md bg-grayscale-14 py-5">
              <p className="text-2xl font-semibold leading-normal">
                베테랑 전문가들의{" "}
                <span className="text-sub-2">daily 이슈브리핑</span>
              </p>
            </div>
            <div className="flex flex-col items-center rounded-md bg-grayscale-14 py-5">
              <p className="text-2xl leading-normal text-sub-2  font-semibold">
                분야별 40여명의 베테랑 전문가 집단
              </p>
              <p className="text-xl leading-normal">
                (공인회계사, 세무사, 변리사, 노무사, 변호사, 감정평가사, 행정사,
                법무사 등 로테이션 진행)
              </p>
            </div>
            <div className="flex justify-center items-center rounded-md bg-grayscale-14 py-5">
              <p className="text-2xl font-semibold leading-normal">
                전문가 특강 <span className="text-sub-2">Everyday Update!</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col absolute w-full top-1/2 -translate-y-1/2 p-6 gap-4 rounded-lg lg:hidden">
            <div className="flex justify-center items-center rounded-md bg-grayscale-14 py-5">
              <p className="text-xl font-semibold leading-normal">
                베테랑 전문가들의{" "}
                <span className="text-sub-2">daily 이슈브리핑</span>
              </p>
            </div>
            <div className="flex flex-col items-center rounded-md bg-grayscale-14 py-5">
              <p className="text-xl leading-normal text-sub-2  font-semibold">
                분야별 40여명의 베테랑 전문가 집단
              </p>
              <p className="text-base leading-normal px-4 text-center">
                (공인회계사, 세무사, 변리사, 노무사, 변호사, 감정평가사, 행정사,
                법무사 등 로테이션 진행)
              </p>
            </div>
            <div className="flex justify-center items-center rounded-md bg-grayscale-14 py-5">
              <p className="text-xl font-semibold leading-normal">
                전문가 특강 <span className="text-sub-2">Everyday Update!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 종합건강검진 */}
      <div className="max-w-[1200px] m-auto mt-80 max-lg:mt-20 flex flex-col w-full">
        <div className="w-full flex flex-col items-center border-y border-grayscale-11 py-20">
          <div className="flex flex-row items-end">
            <span className="text-2xl font-bold leading-normal">
              CCRM회원이라면&nbsp;
            </span>
            <div className="flex flex-col items-center">
              <div className="rounded-full w-1 h-1 bg-sub-1" />
              <span className="text-sub-1 text-2xl font-bold leading-normal">
                누
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full w-1 h-1 bg-sub-1" />
              <span className="text-sub-1 text-2xl font-bold leading-normal">
                구
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full w-1 h-1 bg-sub-1" />
              <span className="text-sub-1 text-2xl font-bold leading-normal">
                나
              </span>
            </div>
            <span className="text-2xl font-bold leading-normal">
              &nbsp;받을 수 있는
            </span>
          </div>
          <p className="text-5xl max-lg:text-4xl leading-normal">
            종합건강검진{" "}
            <strong className="text-sub-1 font-semibold">회원특별가</strong>
          </p>
          <Image
            src="/images/main/logo-kmi.png"
            alt=""
            width={255}
            height={36}
            className="mt-10"
          />
        </div>
        <div className="w-full flex max-lg:flex-col lg:justify-between items-center h-[600px] max-lg:px-10 max-lg:pt-20">
          <div>
            <p className="text-4xl max-lg:text-3xl font-semibold leading-normal ">
              <strong className="text-sub-1 font-semibold">전국 8개도시</strong>
              에서 <br />
              동일항목/동일수가 적용 검진혜택
            </p>
            <div className="flex flex-col gap-3 pt-10 lg:pl-10 ">
              <div className="flex gap-2 items-center">
                <Image
                  src="/images/main/check-orange.svg"
                  width={36}
                  height={31}
                  alt=""
                  className="max-lg:w-8 max-lg:h-8"
                />
                <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                  CCRM 회원
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  src="/images/main/check-orange.svg"
                  width={36}
                  height={31}
                  alt=""
                  className="max-lg:w-8 max-lg:h-8"
                />
                <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                  읽기도 하고 듣기도 하고(음성버전 제공)
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  src="/images/main/check-orange.svg"
                  width={36}
                  height={31}
                  alt=""
                  className="max-lg:w-8 max-lg:h-8"
                />
                <span className="text-2xl max-lg:text-lg text-grayscale-4 font-semibold leading-normal">
                  Hi-Quality 고객관리 프로그램 ‘아침독서’
                </span>
              </div>
              <p className="flex text-2xl max-lg:text-lg text-grayscale-4 mt-2 leading-normal">
                <strong className="font-semibold pr-1">
                  상기 모두 회원특별가격 적용
                </strong>
                (대기업 이용가격수준)
              </p>
            </div>
          </div>
          <Image
            src={"/images/main/검진.png"}
            width={500}
            height={0}
            alt=""
            style={{ height: "auto" }}
            className="w-1/2 max-lg:w-[90%]"
          />
        </div>
        <div className="w-full flex flex-col justify-center gap-8 h-80 lg:rounded-[60px] bg-[url('/images/main/bg-kmi.png')] bg-no-repeat bg-center bg-cover max-lg:px-10">
          <p className="text-2xl max-lg:text-lg text-grayscale-4 mt-2 leading-normal">
            <strong className="text-xl font-semibold text-sub-1">
              전국 8개 검진센터에서 동일진행
            </strong>
            <br />
            서울(강남, 여의도, 광화문), 수원, 대구, 부산, 광주, 제주
          </p>
          <p className="text-2xl max-lg:text-lg text-grayscale-4 mt-2 leading-normal">
            <strong className="text-xl font-semibold text-sub-1">
              국민건강보험공단 종합평가 최우수 등급
            </strong>
            <br />
            (일반, 위암, 대장암, 간암, 유방암, 자궁경부암 등…)
          </p>
        </div>
        <div className="flex flex-col max-w-[1200px] w-full mt-28 items-center">
          <div className="w-full bg-grayscale-9 h-60 overflow-hidden">
            <div className="flex animate-conveyor">
              {[1, 2, 3].map((i) => (
                <div key={`slider-${i}`} className="flex-shrink-0">
                  <Image
                    src={`/images/main/slider-${i}.png`}
                    alt={`Conveyor Image ${i}`}
                    width={720}
                    height={240}
                    className="object-contain h-60 w-auto"
                  />
                </div>
              ))}
              {/* 이미지 반복 */}
              {[1, 2, 3].map((i) => (
                <div key={`slider-duplicate-${i}`} className="flex-shrink-0">
                  <Image
                    src={`/images/main/slider-${i}.png`}
                    alt={`Conveyor Image Duplicate ${i}`}
                    width={720}
                    height={240}
                    className="object-contain h-60 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
          <Link
            href="https://www.kmi.or.kr/"
            target="_blank"
            className="mt-5 text-lg text-grayscale-7 underline underline-offset-2"
          >
            한국의학연구소 홈페이지 바로가기
          </Link>
        </div>
        <div className="flex justify-center mt-28 gap-4">
          <Link
            href="https://fpcenter.withkmi.or.kr"
            target="_blank"
            className="rounded-full px-8 py-4 bg-main-1 text-grayscale-14 font-bold text-lg leading-normal max-lg:text-base"
          >
            종합건강검진 신청하기
          </Link>
          <Link
            href="https://drive.google.com/file/d/1qxrjoadupm82NuQU1MrQ2GA58DJs8YKs/view"
            target="_blank"
            className="rounded-full px-8 py-4 shadow-inner-2 shadow-grayscale-6 text-grayscale-6 font-bold text-lg  leading-normal max-lg:text-base"
          >
            종합건강검진 유형보기
          </Link>
        </div>
      </div>
      <div className="w-full h-[600px] flex flex-col justify-center items-center text-grayscale-3">
        <h3 className="text-2xl text-grayscale-3 leading-normal font-semibold">
          영업의 편리함을 플러스하다
        </h3>
        <h1 className="py-1 text-5xl max-lg:text-4xl leading-normal font-bold">
          CCRM <span className="text-sub-2">무료체험</span> 해보기
        </h1>
        <p className="text-lg leading-normal text-center">
          서비스를 무료체험해보고 결정하세요
          <br />
          고객관리와 영업의 편리함을 업그레이드 시킬 수 있습니다!
        </p>
        <div className="flex justify-center mt-8 gap-4">
          <Link
            href="/sign-in"
            className="rounded-full px-8 py-4 bg-sub-2 text-grayscale-14 font-bold text-lg leading-normal max-lg:text-base"
          >
            CCRM 무료체험
          </Link>
          <Link
            href="/service-center"
            className="rounded-full px-8 py-4 bg-grayscale-8 font-bold text-lg text-grayscale-14 leading-normal max-lg:text-base"
          >
            고객센터 문의하기{" "}
          </Link>
        </div>
      </div>
      <FloatingBar />
    </div>
  );
}
