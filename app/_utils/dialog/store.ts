// store/popupStore.ts
"use client"; // 클라이언트 전용

import { create } from "zustand";

export enum DialogType {
  NONE,
  ALERT,
  CONFIRM,
  CUSTOM,
}

interface DialogState {
  activeDialog: DialogType;
  params: {
    title: string;
    description: string;
    resolve?: (value?: any) => void;
  };
  customContent?: React.ReactNode;
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
  openCustom: <T>(content: React.ReactNode) => Promise<T>;
  closeDialog: (returnValue?: any) => void; // 팝업 닫기
}

const useDialogStore = create<DialogState>((set) => ({
  activeDialog: DialogType.NONE,
  params: {
    title: "",
    description: "",
  },
  customContent: undefined,
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
  openCustom: <T>(content: React.ReactNode) => {
    return new Promise<T>((resolve) => {
      set({
        activeDialog: DialogType.CUSTOM,
        customContent: content,
        params: {
          title: "",
          description: "",
          resolve,
        },
      });
    });
  },
  closeDialog: (returnValue?: any) =>
    set((state) => {
      state.params.resolve?.(returnValue);
      return { activeDialog: DialogType.NONE };
    }),
}));

export default useDialogStore;
