/* eslint-disable @next/next/no-img-element */
import DiseaseModel from "@/app/_models/disease";

export default function DiseaseGridView({
  diseases,
}: {
  diseases: DiseaseModel[];
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {diseases.map((disease, index) => (
        <div
          key={index}
          className="flex h-14 p-2 items-center border border-grayscale-11 hover:bg-grayscale-13 cursor-pointer"
        >
          <span className="text-sub-1 font-semibold">CODE</span>
          <p className="flex-1 mx-2 text-lg text-grayscale-6">
            {disease.title}
          </p>
        </div>
      ))}
    </div>
  );
}
