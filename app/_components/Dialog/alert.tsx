import useDialogStore from "@/app/_utils/dialog/store";

const AlertDialog = () => {
  const { closeDialog, params } = useDialogStore();

  const { title, description } = params;

  return (
    <div className="max-w-sm">
      <div className="flex flex-col items-center p-6 gap-4">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm whitespace-pre-line text-center">{description}</p>
      </div>
      <div className="flex w-full">
        <button
          className="flex-1 bg-main-2 text-grayscale-14 px-4 py-3 hover:bg-main-3"
          onClick={closeDialog}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AlertDialog;
