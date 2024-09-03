import Link from "next/link";
import InquiryForm from "./_components/form";

export default function InquiryPage() {
  return (
    <>
      <h1 className="text-2xl py-2">1:1문의 화면</h1>
      <p className="text-grayscale-6 mt-10">
        1:1문의에 의한 답변은&nbsp;
        <Link href="/my-page/inquiry" className="underline underline-offset-2">
          &quot;마이페이지 &gt; 1:1 문의내역&quot;
        </Link>
        &nbsp;에서 확인하실 수 있습니다.
      </p>
      <InquiryForm />
    </>
  );
}
