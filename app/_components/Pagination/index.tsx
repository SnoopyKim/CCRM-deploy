"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "../Icon";
import cn from "@utils/cn";

interface PaginationProps {
  totalCount?: number;
  itemsPerPage?: number;
  currentPage?: number;
}
export default function Pagination({
  totalCount = 10,
  itemsPerPage = 10,
  currentPage = 1,
}: PaginationProps) {
  const pathname = usePathname();
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const createPageUrl = (page: number) => {
    return `${pathname}?page=${page}`;
  };

  return (
    <div
      className="flex w-full justify-between items-center pt-4 gap-2"
      aria-label="Pagination"
    >
      <div
        className={cn(
          "flex flex-1 justify-center ",
          totalCount === 0 && "hidden"
        )}
      >
        <Link
          href={createPageUrl(currentPage - 1)}
          scroll={false}
          className={cn(
            "rounded-sm p-2 hover:bg-grayscale-12 mr-8",
            currentPage <= 1
              ? "pointer-events-none text-grayscale-7"
              : "text-grayscale-5"
          )}
        >
          <Icon type="left" className="h-6 w-6" />
        </Link>
        <div className="hidden md:flex space-x-1">
          {getPageNumbers().map((number) => (
            <Link
              key={number}
              href={createPageUrl(number)}
              scroll={false}
              className={cn(
                "w-10 h-10 flex justify-center items-center text-sm font-medium rounded-sm",
                number === currentPage
                  ? "bg-grayscale-12 text-white pointer-events-none"
                  : "text-grayscale-7 hover:bg-grayscale-12"
              )}
            >
              {number}
            </Link>
          ))}
        </div>
        <Link
          href={createPageUrl(currentPage + 1)}
          scroll={false}
          className={cn(
            "rounded-sm p-2 hover:bg-grayscale-12 ml-8",
            currentPage >= totalPages
              ? "pointer-events-none text-grayscale-7"
              : "text-grayscale-5"
          )}
        >
          <Icon type="right" className="w-6 h-6 " />
        </Link>
      </div>
    </div>
  );
}
