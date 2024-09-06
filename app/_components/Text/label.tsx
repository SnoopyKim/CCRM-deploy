export default function TextLabel({
  htmlFor,
  title,
  caution,
}: {
  htmlFor?: string;
  title: string;
  caution?: string;
}) {
  return (
    <div className="flex gap-2">
      <label
        htmlFor={htmlFor}
        className="inline-block text-sm font-semibold text-grayscale-6"
      >
        {title}
      </label>
      {caution && <span className="text-sub-1 text-sm">※ {caution}</span>}
    </div>
  );
}
