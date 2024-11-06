"use client";
import initSqlJs, { Database } from "sql.js";
import { setupTables } from "./tableSetup";
import {
  loadDatabaseFromDrive,
  updateDatabaseToDrive,
  uploadDatabaseToDrive,
} from "@/app/_services/google/customer";
import useDialogStore from "@/app/_utils/dialog/store";
import { SqliteMetadataDao } from "./dao/sqliteMetadataDao";

declare global {
  interface Window {
    sqliteDB?: Database;
    sqliteDBId?: string;
    dbInitPromise?: Promise<Database>; // 데이터베이스 초기화 중인 Promise 저장
  }
}

// 데이터베이스 인스턴스를 전역적으로 관리하는 함수
export async function getDatabase(): Promise<Database> {
  const { openLoading, openAlert, closeDialog } = useDialogStore.getState();
  
  // 데이터베이스가 이미 존재하면 즉시 반환
  if (window.sqliteDB) {
    return window.sqliteDB;
  }

  // 데이터베이스가 초기화 중이라면, 그 Promise를 기다림
  if (window.dbInitPromise) {
    return window.dbInitPromise;
  }

  openLoading("데이터 베이스를 불러오는 중입니다...");

  

  // db를 드라이브에서 가져온다.  
  const {data, error} = await loadDatabaseFromDrive()

  if (error) { // 드라이드 로드 에러
    //alert(error);
    window.dbInitPromise = undefined;
    closeDialog();
    await openAlert({ title: "Error", description: error });
    throw(error);
  }
  else if(data!.id === "NONE"){ //없을경우 생성
    window.dbInitPromise = initializeDatabase();
    window.sqliteDB = await window.dbInitPromise;
    uploadDatabaseInner(window.sqliteDB);
    window.dbInitPromise = undefined;
    closeDialog();
    return window.sqliteDB;
  }
  else{//있을 경우 DB 가져오기
    const buffer = data!.data;
    window.sqliteDB = await loadDatabaseFromFile(buffer);
    window.sqliteDBId=data?.id;

    // 버전 메타데이터 확인
    const versionMetadata :string|undefined = await getDatabaseVersion(window.sqliteDB);
    // 버전이 없거나 특정 값보다 낮은 경우 처리 - 임시로 db 재생성으로만 처리
    if (!versionMetadata || parseInt(versionMetadata, 10) < parseInt(process.env.NEXT_PUBLIC_SQLITE_VERSION||"1",10)) {
      window.dbInitPromise = initializeDatabase();
      window.sqliteDB = await window.dbInitPromise;
      uploadDatabaseInner(window.sqliteDB);
      window.dbInitPromise = undefined;
      closeDialog();
      return window.sqliteDB;
    }

    window.dbInitPromise = undefined;
    closeDialog();
    return window.sqliteDB;
  }
}

// 이름은 추후 네이밍 룰 수정
function getDatabaseFileName(){
  return "database.sqlite";
}

// 데이터베이스 초기화
async function initializeDatabase(): Promise<Database> {
  const SQL = await initSqlJs({
    locateFile: (file) =>
      "https://minio-data.habartech.com/ccrm-dev/statics/sql-wasm.wasm",
  });
  const db = new SQL.Database();
  //테이블 스키마 생성
  await setupTables(db);

  return db;
}

//내부 DB를 드라이브로 업로드
export async function uploadDatabaseInner(db:Database): Promise<void> {
  //관리하는 sqliteDBId가 있을경우 업데이트
  if(window.sqliteDBId){
    updateDatabaseToDrive(window.sqliteDBId, db.export());
    
  }
  else{
    //드라이브에 파일생성
    const { data, error } = await uploadDatabaseToDrive(
      db.export(),
      getDatabaseFileName() 
    );
    if (error) { // 드라이브 업로드 에러
      alert(error);
      window.dbInitPromise = undefined;
      throw(error);
    }
    window.sqliteDBId=data;
  }
}

//CUD 마다 데이터베이스를 업데이트하는 데코레이터
export function updateDatabase(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    if (originalMethod) {
      const result = await originalMethod.apply(this, args);

      const db = await getDatabase();
      uploadDatabaseInner(db);

      return result;
    }
  };
}

//db 파일을 직접 다운 받을때(디버깅용)
export async function downloadDatabase(): Promise<void> {
  const db = await getDatabase(); // 현재 데이터베이스 가져오기

  // 데이터베이스를 바이너리 형식으로 추출
  const binaryArray = db.export();

  const blob = new Blob([binaryArray], { type: "application/octet-stream" });

  // 파일 다운로드 링크 생성
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "database.sqlite"; // 다운로드될 파일 이름 설정
  document.body.appendChild(link);

  // 다운로드 실행
  link.click();

  // 링크 삭제
  document.body.removeChild(link);
}

// 드라이브에서 가져온 데이터를 내부 DB로 만들때 사용
// Uint8Array to Database
export async function loadDatabaseFromFile(data: Uint8Array): Promise<Database> {
  const SQL = await initSqlJs({
    locateFile: (file) =>
      "https://minio-data.habartech.com/ccrm-dev/statics/sql-wasm.wasm",
  });

  const db = new SQL.Database(data); // 파일에서 SQLite DB 생성
  console.log("Database loaded from file and stored globally.");

  return db;
}

//버전 체크
async function getDatabaseVersion(db:Database) : Promise<string|undefined>{
  try{
    const metadataDao = new SqliteMetadataDao();
    const versionMetadata = await metadataDao.getMetadataByKey(db,"version");
    return versionMetadata?.metaValue;
  }
  catch(e){
    return undefined;
  }
}
