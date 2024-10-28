import { DriveDirectory, DriveItem } from "@/app/_models/drive";
import { create } from "zustand";

interface DriveStore {
  directory: DriveDirectory | null;
  loadDirectory: (directory: DriveDirectory) => void;
  addFile: (newFile: DriveItem) => void;
  deleteFile: (id: string) => void;
}

// Zustand store 정의
export const useGoogleDriveStore = create<DriveStore>((set) => ({
  directory: null, // 초기 스케줄 데이터
  loadDirectory: (directory: DriveDirectory) => {
    set({ directory });
  },
  addFile: (newFile: DriveItem) => {
    set((state) => ({
      directory: {
        ...state.directory!,
        items: [...state.directory!.items, newFile],
      },
    }));
  },
  deleteFile: (id: string) => {
    set((state) => ({
      directory: {
        ...state.directory!,
        items: state.directory!.items.filter(
          (file: DriveItem) => file.id !== id
        ),
      },
    }));
  },
}));
