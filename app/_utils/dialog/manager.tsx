// components/Popup.tsx
"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import useDialogStore, { DialogType } from "@utils/dialog/store";
import AlertDialog from "@/app/_components/Dialog/alert";
import ConfirmDialog from "@/app/_components/Dialog/confirm";

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
        className="bg-grayscale-14 rounded-sm shadow-lg overflow-hidden"
        onClick={handleDialogClick} // 모달 본체 클릭 시에는 닫히지 않음
      >
        {children}
      </div>
    </div>
  );
};

// Dialog 관리하는 컴포넌트
const DialogManager: React.FC = () => {
  const { activeDialog, customContent } = useDialogStore();

  const isDialogOpen = activeDialog !== DialogType.NONE;

  useEffect(() => {
    if (isDialogOpen) {
      document.body.classList.add("overflow-hidden");
    } else if (document.body.classList.contains("overflow-hidden")) {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isDialogOpen]);

  const openDialog = (dialog: DialogType) => {
    switch (dialog) {
      case DialogType.ALERT:
        return <AlertDialog />;
      case DialogType.CONFIRM:
        return <ConfirmDialog />;
      case DialogType.CUSTOM:
        return customContent;
      default:
        return null;
    }
  };

  return isDialogOpen
    ? ReactDOM.createPortal(
        <DialogWrapper>{openDialog(activeDialog)}</DialogWrapper>,
        document.getElementById("dialog-container") ?? document.body // Portal을 사용하여 body에 직접 렌더링
      )
    : null;
};

export default DialogManager;
