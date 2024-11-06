// store/popupStore.ts
"use client"; // 클라이언트 전용

import { create } from "zustand";

export enum DialogType {
  NONE,
  ALERT,
  CONFIRM,
  CUSTOM,
  LOADING,
}

interface DialogState {
  activeDialog: DialogType;
  params: {
    title: string;
    description?: string;
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
  openCustom: <T>(content: React.ReactNode) => Promise<T | undefined>;
  openLoading: (title?: string) => void;
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
    return new Promise<T | undefined>((resolve) => {
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
  openLoading: (title?: string) => {
    set({ activeDialog: DialogType.LOADING, params: { title: title ?? "" } });
  },
  closeDialog: (returnValue?: any) =>
    set((state) => {
      state.params.resolve?.(returnValue);
      return { activeDialog: DialogType.NONE };
    }),
}));

export default useDialogStore;
