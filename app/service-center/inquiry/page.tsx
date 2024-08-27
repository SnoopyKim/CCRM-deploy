import Link from "next/link";

export default function InquiryPage() {
  return (
    <div className="flex flex-col items-center justify-center p-24">
      <h1 className="text-3xl py-4">1:1문의 화면</h1>
      <Link href="/service-center/notice">공지사항</Link>
      <Link href="/service-center/faq">FAQ</Link>
    </div>
  );
}
