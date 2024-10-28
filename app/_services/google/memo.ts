import { DRIVE_NAME_MEMO } from "@/app/_constants/gdrive";
import { DriveDirectory, DriveItem } from "@/app/_models/drive";
import { googleRequest } from "@/app/_utils/axios/google";
import { getFileMetadata } from "./drive";

export async function loadMemoDrive() {
  const { data: memoDir, error: memoError } = await googleRequest(
    "/drive/v3/files",
    {
      method: "GET",
      params: {
        q: `name = '${DRIVE_NAME_MEMO}' and mimeType = 'application/vnd.google-apps.folder'`,
        fields: "files(id, name)",
      },
    }
  );
  if (memoError) {
    return { error: memoError };
  }

  const { data, error } = await googleRequest(`/drive/v3/files`, {
    method: "GET",
    params: {
      q: `'${memoDir.files[0].id}' in parents`,
      fields: "files(id, name, mimeType, modifiedTime)",
    },
  });
  if (error) {
    return { error };
  }

  return {
    data: {
      id: memoDir.files[0].id,
      name: memoDir.files[0].name,
      items: data.files || [],
    } as DriveDirectory,
  };
}

export async function getMemoData(fileId: string) {
  const [res1, res2] = await Promise.all([
    getFileMetadata(fileId),
    googleRequest(`/drive/v3/files/${fileId}`, {
      method: "GET",
      params: {
        alt: "media",
      },
      responseType: "blob",
    }),
  ]);

  if (res1.error || res2.error || !res1.data || !res2.data) {
    console.error(res1.error || res2.error);
    return { error: res1.error || res2.error };
  }

  const content = await res2.data.text();
  return { data: { title: res1.data.name, content } };
}

export async function uploadMemoFile(
  fileName: string,
  content: string,
  folderId?: string
) {
  const metadata = {
    name: fileName, // 파일 이름
    mimeType: "text/plain", // MIME 타입은 텍스트 파일로 지정
    ...(folderId && { parents: [folderId] }), // 폴더가 지정된 경우 상위 폴더 ID 설정
  };
  // 문자열을 Blob으로 변환
  const fileData = new Blob([content], { type: "text/plain" });
  // FormData 객체 생성하여 메타데이터와 파일 데이터 추가
  const formData = new FormData();
  formData.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  formData.append("file", fileData); // 파일 데이터 추가

  // Google Drive에 업로드 요청 (멀티 파트 업로드)
  const { data, error } = await googleRequest(
    "upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/related",
      },
      data: formData,
    }
  );
  if (error) {
    return { error };
  }

  return { data: data as DriveItem };
}

export async function updateMemoFile(
  fileId: string,
  newTitle?: string,
  newContent?: string
) {
  // 파일 메타데이터 (파일 이름 변경을 원할 경우 설정)
  const metadata = {
    ...(newTitle && { name: newTitle }), // 새로운 파일 이름이 있을 경우 메타데이터에 추가
  };
  // FormData 객체 생성
  const formData = new FormData();
  formData.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  if (newContent) {
    // 새로운 콘텐츠를 Blob으로 변환
    const fileData = new Blob([newContent], { type: "text/plain" });
    formData.append("file", fileData);
  }
  const { data, error } = await googleRequest(
    `/upload/drive/v3/files/${fileId}?uploadType=multipart`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/related",
      },
      data: formData,
    }
  );
  if (error) {
    return { error };
  }

  return { data: data as DriveItem };
}
