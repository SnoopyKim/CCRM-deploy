import { metadata } from "./../../layout";
import {
  DRIVE_NAME_CUSTOMER,
  DRIVE_NAME_DATABASE,
  DRIVE_NAME_HOME,
  DRIVE_NAME_MEMO,
} from "@/app/_constants/gdrive";
import { DriveDirectory, DriveItem } from "@/app/_models/drive";
import { googleRequest } from "@/app/_utils/axios/google";

export async function initDrive() {
  const { data: data1, error: error1 } = await googleRequest(
    "/drive/v3/files",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: DRIVE_NAME_HOME,
        mimeType: "application/vnd.google-apps.folder",
      },
    }
  );
  if (error1) {
    return { error: error1 };
  }

  const folderCreations = [
    DRIVE_NAME_DATABASE,
    DRIVE_NAME_CUSTOMER,
    DRIVE_NAME_MEMO,
  ].map((name) =>
    googleRequest("/drive/v3/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name,
        mimeType: "application/vnd.google-apps.folder",
        parents: [data1.id],
      },
    })
  );
  const result = await Promise.all(folderCreations);
  if (result.some((r) => r.error)) {
    return { error: result.find((r) => r.error)!.error };
  }

  return {
    data: { id: data1.id, name: data1.name, items: [] } as DriveDirectory,
  };
}

export async function loadMainDrive() {
  const { data, error } = await googleRequest("/drive/v3/files", {
    method: "GET",
    params: {
      q: `name = '${DRIVE_NAME_HOME}' and mimeType = 'application/vnd.google-apps.folder'`,
      fields: "files(id, name)",
    },
  });

  if (error) {
    return { error };
  }
  if (data.files.length === 0) {
    // ** 폴더가 없을 경우 초기형태로 생성
    const response = await initDrive();
    return response;
  }

  return {
    data: { ...data.files[0], parents: [], items: [] } as DriveDirectory,
  };
}

export async function getParentDirectory(parentId: string) {
  const [res1, res2] = await Promise.all([
    getFileMetadata(parentId),
    getDriveFiles(parentId),
  ]);
  if (res1.error || res2.error || !res1.data || !res2.data) {
    return { error: res1.error || res2.error };
  }

  return {
    data: {
      id: res1.data.id,
      name: res1.data.name,
      items: res2.data,
      parents: res1.data.parents || [],
    } as DriveDirectory,
  };
}

export async function getDriveFiles(directoryId: string) {
  const { data, error } = await googleRequest(`/drive/v3/files`, {
    method: "GET",
    params: {
      q: `'${directoryId}' in parents`,
      fields:
        "files(id, name, mimeType, parents,size,  modifiedTime, webContentLink)",
    },
  });
  if (error) {
    return { error };
  }

  return {
    data: (data.files || []) as DriveItem[],
  };
}

export async function getFileMetadata(fileId: string) {
  const { data, error } = await googleRequest(`/drive/v3/files/${fileId}`, {
    params: {
      fields:
        "id, name, mimeType, parents, modifiedTime, createdTime, size, webViewLink, webContentLink", // 필요한 필드 지정
    },
  });

  if (error) {
    return { error };
  }

  return { data };
}

export async function uploadFolder(name: string, parentId?: string) {
  const metadata = {
    name,
    mimeType: "application/vnd.google-apps.folder",
    ...(parentId && { parents: [parentId] }), // 폴더가 지정된 경우
  };
  const { data, error } = await googleRequest("/drive/v3/files", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: metadata,
  });
  if (error) {
    return { error };
  }

  return { data };
}

export async function uploadFile(file: File, folderId?: string) {
  // FormData 객체를 사용하여 파일과 메타데이터를 설정
  const formData = new FormData();
  // 메타데이터 (폴더에 파일을 업로드할 경우, 부모 폴더 ID 지정)
  const metadata = {
    name: file.name,
    mimeType: file.type,
    ...(folderId && { parents: [folderId] }), // 폴더가 지정된 경우
  };
  // FormData에 메타데이터와 파일 추가
  formData.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  formData.append("file", file);

  // 파일 업로드 요청 (멀티 파트 업로드)
  const { data, error } = await googleRequest(
    "/upload/drive/v3/files?uploadType=multipart",
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

  const { data: metadataData, error: metadataError } = await getFileMetadata(
    data.id
  );
  if (metadataError) {
    return { error: metadataError };
  }

  return { data: metadataData as DriveItem };
}

export async function deleteDriveFile(fileId: string) {
  const { error } = await googleRequest(`/drive/v3/files/${fileId}`, {
    method: "DELETE",
  });

  return !error;
}

export async function getDriveUsage() {
  const { data, error } = await googleRequest("/drive/v3/about", {
    method: "GET",
    params: {
      fields: "storageQuota",
    },
  });

  if (error) {
    return { error };
  }

  return { data };
}
