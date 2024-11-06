"use client";

import useAuthStore from "@/app/_utils/auth/store";
import Link from "next/link";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <>
      {children}
      {!isAuthenticated && (
        <div className="absolute w-[calc(100%-18rem)] h-[calc(100%-9rem)] bg-grayscale-14 bg-opacity-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center bg-grayscale-13 p-4 rounded shadow-md shadow-grayscale-9 text-grayscale-5">
              <h1 className="text-xl font-semibold">로그인 필요</h1>
              <p className="my-4">이 화면은 가입 후 이용할 수 있습니다.</p>
              <Link
                href="/sign-in"
                className="w-full py-2 bg-sub-1 text-grayscale-14 text-center rounded font-medium"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
