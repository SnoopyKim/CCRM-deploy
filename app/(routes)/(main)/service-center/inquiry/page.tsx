import Link from "next/link";
import InquiryForm from "./_components/form";

export default function InquiryPage() {
  return (
    <>
      <h1 className="text-2xl py-2">1:1문의 화면</h1>
      <p className="text-grayscale-6 mt-10">
        {/* TODO: 문구 확정 필요 */}
        1:1문의는 <strong>support@ccrm.com</strong> 에 전달되며, 이후 메일로
        진행합니다.
      </p>
      <InquiryForm />
    </>
  );
}
