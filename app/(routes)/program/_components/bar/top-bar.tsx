import Image from "next/image";

export default function TopBar() {
  return (
    <div className="flex-col w-full bg-grayscale-14 p-3 border-b border-grayscale-11">
      <div className="mx-auto flex items-center justify-between text-sm">
        <div className="flex space-x-2">
          <button className="bg-main-2 px-2 py-1 rounded flex items-center">
            <Image
              src="/images/google.png"
              alt="Google"
              width={16}
              height={16}
            />
            <span className="ml-2 text-grayscale-14 font-bold">
              캘린더 연동
            </span>
          </button>
          <button className="bg-main-2 px-2 py-1 rounded flex items-center">
            <Image
              src="/images/google.png"
              alt="Google"
              width={16}
              height={16}
            />
            <span className="ml-2 text-grayscale-14 font-bold">
              드라이브 연동
            </span>
          </button>
          <button className="bg-grayscale-13 border border-grayscale-11 text-grayscale-3 px-2 py-1 rounded font-bold">
            서비스 메뉴얼
          </button>
        </div>
        <button className="bg-main-2 text-white px-2 py-1 rounded">
          <span className="text-grayscale-14 font-bold">스토어 바로가기</span>
        </button>
      </div>
    </div>
  );
}
