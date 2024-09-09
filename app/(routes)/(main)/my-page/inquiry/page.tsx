import PageTitle from "../_components/page-title";
import Link from "next/link";
import Pagination from "@components/Pagination";
import { CategoryBadge } from "@components/Badge";

interface Inquiry {
  status: "wait" | "complete";
  title: string;
  date: string;
}
const inquiries: Inquiry[] = Array.from({ length: 79 }).map<Inquiry>(
  (_, index) => ({
    status: index == 0 ? "complete" : "wait",
    title: "안녕하세요. 문의드립니다",
    date: "2024.01.01",
  })
);

export default function InquiryHistoryPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <>
      {true ? (
        <div className="pt-10 px-20">
          <table className="w-full">
            <thead>
              <tr className="h-12 divide-x divide-grayscale-11">
                <th className="w-[100px]">상태</th>
                <th className="pl-4 text-start">제목</th>
                <th className="w-[100px]">작성일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grayscale-11">
              {inquiries
                .filter(
                  (_, index) => (page - 1) * 10 <= index && index < page * 10
                )
                .map((_, index) => (
                  <tr key={index} className="h-12">
                    <td className="text-center">
                      <CategoryBadge
                        color={_.status === "wait" ? "sub" : "gray"}
                      >
                        {_.status === "wait" ? "답변대기" : "답변완료"}
                      </CategoryBadge>
                    </td>
                    <td className="pl-4">
                      <Link
                        href={`/my-page/inquiry/${(page - 1) * 10 + index + 1}`}
                        className="flex"
                      >
                        {_.title} {(page - 1) * 10 + index + 1}
                      </Link>
                    </td>
                    <td className="text-center text-sm text-grayscale-6">
                      {_.date}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination total={80} />
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-10 items-center">
          <p className="text-grayscale-8 text-2xl">1:1 문의 내역이 없습니다.</p>
          <p className="text-grayscale-8">
            궁금한 점은 &quot; 고객센터 &gt;&nbsp;
            <Link
              href={"/service-center/inquiry"}
              className="underline underline-offset-2 text-sub-2"
            >
              1:1 문의하기
            </Link>{" "}
            &gt;&nbsp;&quot;에서 문의해주세요.
          </p>
        </div>
      )}
    </>
  );
}
