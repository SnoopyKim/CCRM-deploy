import Image from "next/image";
import Link from "next/link";

export default function MessagePage() {
  return (
    <div className="flex flex-col max-w-screen-lg w-full mx-auto my-10">
      <h1 className="text-2xl font-normal">메시지 대량 발송 소개</h1>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex max-lg:flex-col gap-4">
          <Link
            href={"/program/message/kakao"}
            className="flex flex-col h-80 flex-1 border border-grayscale-11"
          >
            <div className="flex lg:flex-1 justify-center items-center bg-[#FEE141] max-lg:h-40">
              <Image
                src={"/images/program/message/ic_kakao.svg"}
                alt=""
                width={64}
                height={64}
              />
            </div>
            <div className="flex justify-center items-center py-4 text-lg font-normal">
              카톡 대량 발송
            </div>
          </Link>
          {/* <Link
            href={"/program/message/mail"}
            className="flex flex-col h-80 flex-1 border border-grayscale-11"
          >
            <div className="flex flex-1 justify-center items-center bg-[#87D4FF]">
              <Image
                src={"/images/program/message/ic_mail.svg"}
                alt=""
                width={64}
                height={64}
              />
            </div>
            <div className="flex justify-center items-center py-4 text-lg font-normal">
              메일 대량 발송
            </div>
          </Link> */}
          <Link
            href={"/program/message/sms"}
            className="flex flex-col h-80 flex-1 border border-grayscale-11"
          >
            <div className="flex lg:flex-1 justify-center items-center bg-[#B0FFBD] max-lg:h-40">
              <Image
                src={"/images/program/message/ic_sms.svg"}
                alt=""
                width={64}
                height={64}
              />
            </div>
            <div className="flex justify-center items-center py-4 text-lg font-normal">
              문자 대량 발송
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
