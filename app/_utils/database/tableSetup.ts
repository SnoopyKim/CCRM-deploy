import { Database } from "sql.js";
import { createTables } from "./generator/tableGenerator";
import { clientSchema } from "./schema/clientSchema";
import { consultationSchema } from "./schema/consultationSchema";
import { managementGroupSchema } from "./schema/managementGroupSchema";
import { memoSchema } from "./schema/memoSchema";
import { sqliteMetadataSchema } from "./schema/sqliteMetadataSchema";
import { clientManagementGroupSchema } from "./schema/clientManagementGroupSchema";

export async function setupTables(db: Database): Promise<void> {
  const tables = {
    metadata: sqliteMetadataSchema,
    client: clientSchema,
    consultation: consultationSchema,
    management_group: managementGroupSchema,
    memo: memoSchema,
    client_management_group:clientManagementGroupSchema
  };

  await createTables(db, tables);


  const version = process.env.NEXT_PUBLIC_SQLITE_VERSION || "1";
  const result = db.exec("SELECT COUNT(*) as count FROM metadata WHERE metaKey = 'version'");
  const count = result[0]?.values[0][0] as number;

  if (count === 0) {

    db.run(`
      INSERT INTO client (name, clientType, driverLicense, contactNumber, residentRegistrationNumber, createdAt, updatedAt)
      VALUES 
      ('홍길동', '관리 고객', '123456', '010-1234-5678', '900101-1', '${new Date().toISOString()}', '${new Date().toISOString()}'),
      ('김철수', '가망 고객', '654321', '010-9876-5432', '850101-1', '${new Date().toISOString()}', '${new Date().toISOString()}'),
      ('이영희', '가망 고객', '789012', '010-1234-6789', '880201-2', '${new Date().toISOString()}', '${new Date().toISOString()}'),
      ('박지성', '관리 고객', '890123', '010-3456-7890', '020305-3', '${new Date().toISOString()}', '${new Date().toISOString()}');
    `);

    db.run(`
      INSERT INTO consultation (clientId, title, content, detailedContent, consultationTime, consultationAddress, consultationAddressDetail, createdAt, updatedAt)
      VALUES 
      (1, '보험 분석 상담', 1, '현재 보험 상품의 보장 범위를 점검하고 향후 개선 방향 논의', '2024-10-25', '서울 강남구', '테헤란로 123', '${new Date().toISOString()}', '${new Date().toISOString()}'),
      (3, '자산 관리 상담', 1, '고객의 투자 성향에 맞춘 자산 관리 방안을 제안', '2024-10-26', '부산 해운대구', '해운대로 456', '${new Date().toISOString()}', '${new Date().toISOString()}'),
      (3, '연금 계획 상담', 3, '고객의 은퇴 시기와 필요 자금에 따른 연금 상품 추천', '2024-11-01', '인천 남동구', '인천로 789', '${new Date().toISOString()}', '${new Date().toISOString()}'),
      (3, '세금 절감 상담', 4, '절세 가능한 항목에 대해 설명하고 최적의 절세 전략 제안', '2024-11-15', '대전 서구', '대전로 101', '${new Date().toISOString()}', '${new Date().toISOString()}');
    `);

    db.run(`
      INSERT INTO metadata (metaKey, metaValue, createdAt, updatedAt)
      VALUES ('version', '${version}', '${new Date().toISOString()}', '${new Date().toISOString()}');
    `);

    console.log("Inserted example data into clients table.");

  }
  
}
