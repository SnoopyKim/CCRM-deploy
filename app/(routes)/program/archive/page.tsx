"use client";

import Icon from "@/app/_components/Icon";
import { DriveItem } from "@/app/_models/drive";
import {
  getDriveFiles,
  getParentDirectory,
  loadMainDrive,
  uploadFile,
  uploadFolder,
} from "@/app/_services/google/drive";
import { useEffect, useState } from "react";
import DriveItemRow from "./_components/drive-item";
import { useGoogleDriveStore } from "@/app/_utils/gdrive/store";
import {
  DRIVE_NAME_CUSTOMER,
  DRIVE_NAME_DATABASE,
  DRIVE_NAME_HOME,
  DRIVE_NAME_MEMO,
} from "@/app/_constants/gdrive";
import cn from "@/app/_utils/cn";
import { flushSync } from "react-dom";
import useDialogStore from "@/app/_utils/dialog/store";

export default function ArchivePage() {
  const { directory, loadDirectory, addFile } = useGoogleDriveStore();
  const { openLoading, closeDialog } = useDialogStore();

  useEffect(() => {
    if (directory) return;
    const fetchDriveFiles = async () => {
      openLoading("드라이브 자료들을 가져오는 중입니다...");
      const { data: folderData, error: folderError } = await loadMainDrive();
      if (folderError || !folderData) {
        console.error(folderError);
        return;
      }
      const { data, error } = await getDriveFiles(folderData.id);
      closeDialog();
      if (error || !data) {
        console.error(error);
        return;
      }
      folderData.items = data;
      loadDirectory(folderData);
    };
    fetchDriveFiles();
  }, [directory]);

  const handleFolderAdd = async () => {
    const folderName = window.prompt("폴더 이름을 입력하세요");
    if (folderName) {
      openLoading("폴더를 추가하는 중입니다...");
      const { data, error } = await uploadFolder(folderName, directory?.id);
      closeDialog();
      if (error || !data) {
        console.error(error);
        return;
      }

      addFile(data as DriveItem);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      openLoading("파일을 업로드하는 중입니다...");
      const file = e.target.files[0];
      const { data, error } = await uploadFile(file, directory?.id);
      closeDialog();

      if (error || !data) {
        console.error(error);
        return;
      }

      addFile(data as DriveItem);
    }
  };

  const handleBack = async () => {
    openLoading("상위폴더를 불러오는 중입니다...");
    const { data, error } = await getParentDirectory(directory!.parents![0]);
    closeDialog();
    if (error || !data) {
      console.error(error);
      return;
    }
    console.log("Parent directory", data);
    loadDirectory(data);
  };

  return (
    <div className="flex flex-col mt-10 w-full max-w-screen-lg mx-auto">
      <h2 className="text-3xl font-normal">
        자료실 |
        <strong className="ml-3 text-main-2">
          {directory?.name || DRIVE_NAME_HOME}
        </strong>
      </h2>
      <div className="flex justify-end gap-4">
        <div
          className={cn(
            "text-grayscale-14 px-6 py-2 rounded text-lg font-medium bg-main-2 hover:bg-main-3 cursor-pointer"
          )}
          onClick={handleFolderAdd}
        >
          폴더 추가
        </div>
        <label
          htmlFor="upload-drive-file"
          className={cn(
            "text-grayscale-14 px-6 py-2 rounded text-lg font-medium bg-main-2 hover:bg-main-3 cursor-pointer"
          )}
        >
          파일 업로드
        </label>
        <input
          id="upload-drive-file"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div className="mt-4">
        <table className="w-full table-fixed ">
          <thead>
            <tr className="bg-grayscale-12">
              <th className="text-left px-4 py-2 w-20">유형</th>
              <th className="text-left">이름</th>
              <th className="text-left w-48">수정 날짜</th>
              <th className="text-left w-28"></th>
            </tr>
          </thead>
          <tbody>
            {directory?.name !== DRIVE_NAME_HOME &&
              (directory?.parents?.length || 0) > 0 && (
                <tr
                  className="border-b border-grayscale-11 hover:bg-grayscale-13 cursor-pointer"
                  onClick={handleBack}
                >
                  <td className="px-4 py-2.5 font-normal">
                    <Icon type={"down"} className="rotate-90" />
                  </td>
                  <td className="">상위 폴더로</td>
                  <td className="">-</td>
                  <td className="p-2"></td>
                </tr>
              )}
            {directory?.items
              .filter(
                (item) =>
                  ![
                    DRIVE_NAME_DATABASE,
                    DRIVE_NAME_CUSTOMER,
                    DRIVE_NAME_MEMO,
                  ].includes(item.name)
              )
              .map((item) => (
                <DriveItemRow key={item.id} item={item} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
