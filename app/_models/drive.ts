export interface DriveDirectory {
  id: string;
  name: string;
  parents?: string[];
  items: DriveItem[];
}

export type DriveItem = {
  id: string; // 파일의 고유 ID
  name: string; // 파일 이름
  mimeType?: string; // 파일의 MIME 타입 (예: "application/pdf", "image/jpeg" 등)
  parents?: string[]; // 부모 폴더 ID 배열
  modifiedTime?: string; // 파일이 마지막으로 수정된 시간 (ISO 8601 형식)
  createdTime?: string; // 파일이 처음 생성된 시간 (ISO 8601 형식)
  size?: string; // 파일 크기 (바이트 단위)
  webViewLink?: string; // 웹에서 파일을 볼 수 있는 링크
  webContentLink?: string; // 파일의 직접 다운로드 링크
};
