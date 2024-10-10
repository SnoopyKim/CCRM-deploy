// components/Popup.tsx
"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import useDialogStore, { DialogType } from "@utils/dialog/store";

// 첫 번째 팝업 컴포넌트
const AlertDialog = () => {
  const { closeDialog, params } = useDialogStore();

  const { title, description } = params;

  return (
    <div className="">
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

// 두 번째 팝업 컴포넌트
const ConfirmDialog = () => {
  const { closeDialog, params } = useDialogStore();
  const { title, description, resolve } = params;

  const handleConfirm = () => {
    resolve?.(true);
    closeDialog();
  };

  const handleCancel = () => {
    resolve?.(false);
    closeDialog();
  };

  return (
    <div className="">
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

const DialogWrapper = ({ children }: { children: React.ReactNode }) => {
  const { closeDialog } = useDialogStore();

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트가 모달 안쪽으로 전달되지 않도록 막음
    closeDialog();
  };

  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 모달 본체 클릭 시 이벤트 버블링 막기
  };

  return (
    <div
      className="fixed inset-0 bg-grayscale-3 bg-opacity-75 flex items-center justify-center z-20"
      onClick={handleBackdropClick} // 백드롭 클릭 시 모달 닫기
    >
      <div
        className="bg-grayscale-14 rounded-lg shadow-lg max-w-sm overflow-hidden"
        onClick={handleDialogClick} // 모달 본체 클릭 시에는 닫히지 않음
      >
        {children}
      </div>
    </div>
  );
};

// Dialog 관리하는 컴포넌트
const DialogManager: React.FC = () => {
  const { activeDialog } = useDialogStore();

  const isDialogOpen = activeDialog !== DialogType.NONE;

  useEffect(() => {
    if (isDialogOpen) {
      document.body.classList.add("overflow-hidden");
    } else if (document.body.classList.contains("overflow-hidden")) {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isDialogOpen]);

  return isDialogOpen
    ? ReactDOM.createPortal(
        <DialogWrapper>
          {activeDialog === DialogType.ALERT ? <AlertDialog /> : null}
          {activeDialog === DialogType.CONFIRM ? <ConfirmDialog /> : null}
        </DialogWrapper>,
        document.getElementById("dialog-container") ?? document.body // Portal을 사용하여 body에 직접 렌더링
      )
    : null;
};

export default DialogManager;
