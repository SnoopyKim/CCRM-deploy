"use client";

import OutlineButton from "@/app/_components/Button/outline";
import { getDriveUsage } from "@/app/_services/google/drive";
import useAuthStore from "@/app/_utils/auth/store";
import useDialogStore from "@/app/_utils/dialog/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const { openConfirm, openAlert } = useDialogStore();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [storageQuota, setStorageQuota] = useState<{
    usage: string;
    limit: string;
  }>({ usage: "0", limit: "0" });
  const usagePercentage =
    (parseInt(storageQuota.usage, 10) / parseInt(storageQuota.limit, 10)) * 100;

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      const { data, error } = await getDriveUsage();
      if (error || !data) return;
      setStorageQuota(data.storageQuota);
    }
    fetchData();
  }, [user]);

  const handleSignout = async () => {
    if (!user) return;
    const result = await openConfirm({
      title: "로그아웃",
      description: "정말 로그아웃 하시겠습니까?",
    });
    if (result) {
      logout();
      await openAlert({
        title: "로그아웃 완료",
        description: "로그인 페이지로 이동합니다",
      });
      router.push("/sign-in");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-6 gap-6">
      <div className="flex items-center">
        <Image
          src="/images/program/avatar-default.svg"
          width={56}
          height={56}
          alt=""
        />
        <span className="ml-3 text-lg font-normal text-grayscale-14">
          {user?.name ?? "홍길동"} 님
        </span>
      </div>
      <div className="w-full px-6">
        <div className="px-4 py-2 bg-grayscale-13 shadow-md rounded-lg text-main-1">
          <h3 className="ml-1 font-medium mb-1">드라이브 저장 용량</h3>
          <div className="relative w-full h-4 bg-grayscale-11 rounded-full overflow-hidden mb-1">
            <div
              className="absolute top-0 left-0 h-full bg-grayscale-6"
              style={{ width: `${usagePercentage}%` }}
            ></div>
          </div>
          <div className="ml-1 text-xs text-grayscale-6">
            {`${(parseInt(storageQuota.limit, 10) / 1024 ** 3).toFixed(
              2
            )} GB 중 ${(parseInt(storageQuota.usage, 10) / 1024 ** 3).toFixed(
              2
            )} GB 사용`}
          </div>
          <Link
            href="https://drive.google.com/settings/storage"
            target="_blank"
            className="mt-2 flex h-8 items-center justify-center rounded text-sm font-medium text-main-2 border border-main-2 hover:bg-main-2 hover:bg-opacity-10"
          >
            추가 용량 구매
          </Link>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <OutlineButton
          href="/my-page"
          title="마이페이지"
          className="text-sm leading-normal"
        />
        <OutlineButton
          title="로그아웃"
          className="text-sm leading-normal"
          onClick={handleSignout}
        />
      </div>
    </div>
  );
}
