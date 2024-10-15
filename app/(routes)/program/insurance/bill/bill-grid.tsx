/* eslint-disable @next/next/no-img-element */
import InsuranceModel from "@/app/_models/insurance";
import Link from "next/link";

export default function BillGridView({
  bills,
  category,
}: {
  bills: InsuranceModel[];
  category: string;
}) {
  const filteredBills = bills.filter((bill) => bill.category === category);

  return (
    <div className="grid grid-cols-3 gap-2">
      {filteredBills.map((bill, index) => (
        <Link
          key={index}
          href={bill.link}
          target="_blank"
          className="flex h-14 p-2 items-center border border-grayscale-11 hover:bg-grayscale-13 cursor-pointer"
        >
          <img src={bill.insurerLogo} alt="" width={60} height={20} />
          <p className="flex-1 mx-2 text-lg text-grayscale-6">
            {bill.insurerName}
          </p>
          <span className="text-sub-1">★</span>
          <span className="text-sub-2">▣</span>
        </Link>
      ))}
    </div>
  );
}
