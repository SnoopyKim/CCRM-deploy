import { DRIVE_NAME_DATABASE } from "@/app/_constants/gdrive";
import { googleRequest } from "@/app/_utils/axios/google";

// Blob을 Uint8Array로 변환하는 함수
function blobToUint8Array(blob: Blob): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      const arrayBuffer = reader.result as ArrayBuffer;
      resolve(new Uint8Array(arrayBuffer));
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob); // Blob을 ArrayBuffer로 읽음
  });
}

export async function loadDatabaseFromDrive(): Promise<{
  data?: {
    id: string;
    data: Uint8Array;
  };
  error?: string;
}> {
  const { data: dir, error: dirError } = await googleRequest(
    "/drive/v3/files",
    {
      method: "GET",
      params: {
        q: `name = '${DRIVE_NAME_DATABASE}' and mimeType = 'application/vnd.google-apps.folder'`,
        fields: "files(id, name)",
      },
    }
  );
  if (dirError || !dir) {
    return { error: dirError };
  }
  const folderId = dir.files[0].id;

  const { data: db, error: dbError } = await googleRequest(`/drive/v3/files`, {
    method: "GET",
    params: {
      q: `'${folderId}' in parents`,
      fields: "files(id, name, mimeType, modifiedTime)",
    },
  });
  if (dbError || !db) {
    return { error: dbError };
  }
  if (db.files.length === 0) {
    return {
      data: { id: "NONE", data: new Uint8Array() },
    };
  }

  const { data, error } = await googleRequest(
    `/drive/v3/files/${db.files[0].id}`,
    {
      method: "GET",
      params: {
        alt: "media",
      },
      responseType: "blob",
    }
  );
  if (error) {
    return { error };
  }

  const uint8Array = await blobToUint8Array(data as Blob);
  return { data: { id: db.files[0].id, data: uint8Array } };
}

export async function uploadDatabaseToDrive(
  data: Uint8Array,
  fileName: string
) {
  // 폴더 ID 찾기
  const { data: dir, error: dirError } = await googleRequest(
    "/drive/v3/files",
    {
      method: "GET",
      params: {
        q: `name = '${DRIVE_NAME_DATABASE}' and mimeType = 'application/vnd.google-apps.folder'`,
        fields: "files(id, name)",
      },
    }
  );
  if (dirError || !dir) {
    return { error: dirError };
  }
  const folderId = dir.files[0].id;

  // 파일 메타데이터 설정
  const metadata = {
    name: fileName, // 파일 이름
    mimeType: "application/x-sqlite3", // SQLite 파일 MIME 타입
    parents: [folderId], // 폴더가 지정된 경우 상위 폴더 ID 설정
  };

  // Uint8Array 데이터를 Blob으로 변환
  const fileData = new Blob([data], { type: "application/x-sqlite3" });

  // FormData 객체 생성하여 메타데이터와 파일 데이터 추가
  const formData = new FormData();
  formData.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  formData.append("file", fileData); // 파일 데이터 추가

  // Google Drive에 업로드 요청 (멀티 파트 업로드)
  const { data: result, error } = await googleRequest(
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
  return { data: result.id };
}

export async function updateDatabaseToDrive(
  id: string,
  data: Uint8Array
): Promise<boolean> {
  // Uint8Array 데이터를 Blob으로 변환
  const formData = new FormData();
  formData.append(
    "metadata",
    new Blob([JSON.stringify({})], { type: "application/json" })
  );
  const fileData = new Blob([data], { type: "application/x-sqlite3" });
  formData.append("file", fileData);
  
  // Google Drive에 업로드 요청 (멀티 파트 업로드)
  const { data: result, error } = await googleRequest(
    `upload/drive/v3/files/${id}?uploadType=multipart`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/related",
      },
      data: formData,
    }
  );

  return error || !data ? false : true;
}
