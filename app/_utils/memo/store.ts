import { DriveDirectory, DriveItem } from "@/app/_models/drive";
import { loadMemoDrive } from "@/app/_services/google/memo";
import { create } from "zustand";

interface MemoStore {
  directory: DriveDirectory | null;
  loadDirectory: () => Promise<void>;
  addMemo: (newFile: DriveItem) => void;
  deleteMemo: (id: string) => void;
}

// Zustand store 정의
export const useMemoStore = create<MemoStore>((set) => ({
  directory: null, // 초기 스케줄 데이터
  loadDirectory: async () => {
    const { data: directory, error } = await loadMemoDrive();
    if (error || !directory) {
      console.error(error);
      return;
    }
    set({ directory });
  },
  addMemo: (newMemo: DriveItem) => {
    set((state) => ({
      directory: {
        ...state.directory!,
        items: [...state.directory!.items, newMemo],
      },
    }));
  },
  deleteMemo: (id: string) => {
    set((state) => ({
      directory: {
        ...state.directory!,
        items: state.directory!.items.filter(
          (memo: DriveItem) => memo.id !== id
        ),
      },
    }));
  },
}));
