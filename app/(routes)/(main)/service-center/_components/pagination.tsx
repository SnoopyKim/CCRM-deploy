import Icon from "@/app/_components/Icon";
import clsx from "clsx";
import Link from "next/link";

export default function Pagination({
  total,
  pageIndex,
  pageSize = 10,
  onChange,
}: {
  total: number;
  pageIndex: number;
  pageSize?: number;
  onChange?: (page: number) => void;
}) {
  const totalPages = Math.ceil(total / pageSize);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center mt-4">
      <Link
        className={clsx(
          "flex w-10 h-10 rounded-sm bg-grayscale-13 justify-center items-center mr-5",
          {
            "pointer-events-none": pageIndex === 1,
            "cursor-pointer hover:bg-grayscale-12": pageIndex !== 1,
          }
        )}
        href={`.?page=${Math.max(1, pageIndex - 1)}`}
        scroll={false}
      >
        <Icon type="left" className="w-6 h-6 stroke-grayscale-8" />
      </Link>
      {pages.map((page) => (
        <Link
          key={page}
          className={clsx(
            "w-10 h-10 mx-1 rounded-sm flex justify-center items-center",
            {
              "hover:bg-grayscale-13 text-grayscale-8": page !== pageIndex,
              "bg-grayscale-12 text-grayscale-1": page === pageIndex,
            }
          )}
          href={`.?page=${page}`}
          scroll={false}
        >
          <p>{page}</p>
        </Link>
      ))}
      <Link
        className={clsx(
          "flex w-10 h-10 rounded-sm bg-grayscale-13 justify-center items-center ml-5",
          {
            "pointer-events-none": pageIndex === totalPages,
            "cursor-pointer hover:bg-grayscale-12": pageIndex !== totalPages,
          }
        )}
        href={`.?page=${Math.min(totalPages, pageIndex + 1)}`}
        scroll={false}
      >
        <Icon type="right" className="w-6 h-6 stroke-grayscale-8" />
      </Link>
    </div>
  );
}
