import PageTitle from "../_components/page-title";

export default function InquiryHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTitle>1:1 문의내역</PageTitle>
      {children}
    </>
  );
}
