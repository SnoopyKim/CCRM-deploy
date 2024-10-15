import useDialogStore from "@/app/_utils/dialog/store";

const ConfirmDialog = () => {
  const { closeDialog, params } = useDialogStore();
  const { title, description } = params;

  const handleConfirm = () => {
    closeDialog(true);
  };

  const handleCancel = () => {
    closeDialog(false);
  };

  return (
    <div className="max-w-sm">
      <div className="flex flex-col items-center p-6 gap-4">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm whitespace-pre-line text-center">{description}</p>
      </div>
      <div className="flex w-full">
        <button
          className="flex-1 bg-main-2 text-grayscale-14 px-4 py-3 hover:bg-main-3"
          onClick={handleConfirm}
        >
          확인
        </button>
        <button
          className="flex-1 bg-grayscale-11 text-main-1 px-4 py-3 hover:bg-grayscale-10"
          onClick={handleCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
