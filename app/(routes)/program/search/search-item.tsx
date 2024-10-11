import { ProgramSearchResult } from "@/app/_types/model";

export default function searchItem({
  results,
}: {
  results: ProgramSearchResult[];
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {results.map((result, index) => (
        <button
          key={index}
          className="flex w-80 h-20 justify-start items-center bg-white hover:bg-gray-200 rounded-lg p-2"
        >
          <img
            className="w-20 h-20 m-2"
            src={result.imageUrl}
            alt=""
          />
          <div className="flex flex-col m-2 justify-start items-start">
            <p className="text-sub-2 hover:underline">{result.title}</p>
            <p>{`${result.type} | ${result.date}`}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
