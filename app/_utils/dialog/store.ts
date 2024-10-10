// store/popupStore.ts
"use client"; // 클라이언트 전용

import { create } from "zustand";

export enum DialogType {
  NONE,
  ALERT,
  CONFIRM,
}

interface DialogState {
  activeDialog: DialogType;
  params: {
    title: string;
    description: string;
    resolve?: (value?: any) => void;
  };
  openAlert: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => Promise<void>;
  openConfirm: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => Promise<boolean>;
  closeDialog: () => void; // 팝업 닫기
}

const useDialogStore = create<DialogState>((set) => ({
  activeDialog: DialogType.NONE,
  params: {
    title: "",
    description: "",
  },
  openAlert: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    return new Promise<void>((resolve) => {
      set({
        activeDialog: DialogType.ALERT,
        params: {
          title,
          description,
          resolve,
        },
      });
    });
  },
  openConfirm: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    return new Promise<boolean>((resolve) => {
      set({
        activeDialog: DialogType.CONFIRM,
        params: {
          title,
          description,
          resolve,
        },
      });
    });
  },
  closeDialog: () =>
    set((state) => {
      state.params.resolve?.();
      return { activeDialog: DialogType.NONE };
    }),
}));

export default useDialogStore;
