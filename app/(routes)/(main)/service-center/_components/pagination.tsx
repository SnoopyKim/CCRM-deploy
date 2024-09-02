"use client";

import Icon from "@/app/_components/Icon";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  total,
  pageSize = 10,
}: {
  total: number;
  pageSize?: number;
}) {
  const totalPages = Math.ceil(total / pageSize);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageIndex = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;

  const setPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    const newUrl = `${pathname}?${newSearchParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className={clsx(
          "flex w-10 h-10 rounded-sm bg-grayscale-13 justify-center items-center mr-5",
          {
            "pointer-events-none": pageIndex === 1,
            "cursor-pointer hover:bg-grayscale-12": pageIndex !== 1,
          }
        )}
        onClick={() => setPage(Math.max(1, pageIndex - 1))}
      >
        <Icon type="left" className="w-6 h-6 stroke-grayscale-8" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={clsx(
            "w-10 h-10 mx-1 rounded-sm flex justify-center items-center",
            {
              "hover:bg-grayscale-13 text-grayscale-8": page !== pageIndex,
              "bg-grayscale-12 text-grayscale-1": page === pageIndex,
            }
          )}
          onClick={() => setPage(page)}
        >
          <p>{page}</p>
        </button>
      ))}
      <button
        className={clsx(
          "flex w-10 h-10 rounded-sm bg-grayscale-13 justify-center items-center ml-5",
          {
            "pointer-events-none": pageIndex === totalPages,
            "cursor-pointer hover:bg-grayscale-12": pageIndex !== totalPages,
          }
        )}
        onClick={() => setPage(Math.min(totalPages, pageIndex + 1))}
      >
        <Icon type="right" className="w-6 h-6 stroke-grayscale-8" />
      </button>
    </div>
  );
}
