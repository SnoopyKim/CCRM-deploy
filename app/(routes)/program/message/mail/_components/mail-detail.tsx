import { Button, OutlineButton } from "@/app/_components/Button";
import PrimaryButton from "@/app/_components/Button/button";
import Icon from "@/app/_components/Icon";

export default function MailDetailView({
  onBack,
  onRemove,
}: {
  onBack: () => void;
  onRemove?: () => void;
}) {
  return (
    <>
      <div className="border-b border-grayscale-11">
        <div className="flex items-center py-2">
          <Icon
            type="down"
            className="rotate-90 h-10 w-10 p-2 cursor-pointer"
            onClick={onBack}
          />
          <Icon
            type="delete"
            className="ml-4 h-10 w-10 p-2 cursor-pointer"
            onClick={onRemove}
          />
        </div>
      </div>
      <div className="flex flex-col flex-grow gap-4 m-4">
        <h2 className="text-2xl font-normal">Email Subject</h2>
        <div className="text-main-1 font-medium">
          Recipient Name{" "}
          <span className="text-grayscale-6 text-sm font-normal">
            {"<email@domain.com>"}
          </span>
        </div>
        <p>
          Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui
          esse pariatur duis deserunt mollit dolore cillum minim tempor enim.
          Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate
          aute id deserunt nisi.
        </p>
      </div>
      <div className="flex mt-4">
        <Button title="답장" className="w-36 h-12 rounded text-base" />
      </div>
    </>
  );
}
