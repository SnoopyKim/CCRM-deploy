/* eslint-disable @next/next/no-img-element */
import TermModel from "@/app/_models/term";
import Link from "next/link";

export default function TermGridView({
  terms,
  category,
}: {
  terms: TermModel[];
  category: string;
}) {
  const filteredTerms = terms.filter((bill) => bill.category === category);

  return (
    <div className="grid grid-cols-3 gap-2">
      {filteredTerms.map((bill, index) => (
        <Link
          key={index}
          href={bill.link}
          target="_blank"
          className="flex flex-col h-28 justify-center items-center border border-grayscale-11 hover:bg-grayscale-13 cursor-pointer"
        >
          <img src={bill.insurerLogo} alt="" width={100} height={50} />
          <p className="mt-1 text-lg text-grayscale-6">{bill.insurerName}</p>
        </Link>
      ))}
    </div>
  );
}
