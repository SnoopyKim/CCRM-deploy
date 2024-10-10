import FaqModel from "@/app/_models/faq";
import PageList from "@/app/_models/page-list";
import { getFaqs } from "@/app/_services/faq";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AccordianItem from "./accordian";
import Pagination from "@/app/_components/Pagination";

export default function FaqList({ category }: { category: string }) {
  const searchParams = useSearchParams();
  const pageNum: number = Number(searchParams.get("page") ?? "1");

  const [faqs, setFaqs] = useState<PageList<FaqModel>>();

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await getFaqs(pageNum);
      if (error) {
        console.error(error);
        return;
      }
      setFaqs(data!);
    };

    fetchFaqs();
  }, [pageNum]);

  const filteredFaqs = (faqs?.data ?? []).filter(
    (faq) => category === "all" || faq.category === category
  );

  return (
    <>
      <div className="mb-4">
        {filteredFaqs.map((item) => (
          <AccordianItem
            key={item.id}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
      <Pagination
        totalCount={category === "all" ? faqs?.total : filteredFaqs.length}
        currentPage={pageNum}
      />
    </>
  );
}
