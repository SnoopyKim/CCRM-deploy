import { Database } from "sql.js";
import { createTables } from "./generator/tableGenerator";
import { metadataSchema } from "./schema/metadataSchema";
import { clientSchema } from "./schema/clientSchema";
import { consultationSchema } from "./schema/consultationSchema";
import { managementGroupSchema } from "./schema/managementGroupSchema";
import { memoSchema } from "./schema/memoSchema";

export async function setupTables(db: Database): Promise<void> {
  const tables = {
    metadata: metadataSchema,
    client: clientSchema,
    consultation: consultationSchema,
    management_group: managementGroupSchema,
    memo: memoSchema,
  };

  await createTables(db, tables);

  // 예시 데이터가 있는지 확인
  const result = db.exec("SELECT COUNT(*) as count FROM client");
  const count = result[0]?.values[0][0] as number;

  if (count === 0) {
  // db.run(`
  //   INSERT INTO client (name, clientType, driverLicense, contactNumber, residentRegistrationNumber, createdAt, updatedAt)
  //   VALUES 
  //   ('홍길동', '관리 고객', '123456', '010-1234-5678', '900101-1234567', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('김철수', '일반 고객', '654321', '010-9876-5432', '850101-1234567', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('이영희', 'VIP 고객', '789012', '010-1234-6789', '880201-2345678', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('박지성', '관리 고객', '890123', '010-3456-7890', '920305-3456789', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('송중기', '일반 고객', '901234', '010-4567-8901', '940405-4567890', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('최수현', '관리 고객', '123789', '010-5678-9012', '950506-5678901', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('김민수', 'VIP 고객', '234890', '010-6789-0123', '960607-6789012', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('강호동', '일반 고객', '345901', '010-7890-1234', '970708-7890123', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('하정우', '관리 고객', '456012', '010-8901-2345', '980809-8901234', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('유재석', 'VIP 고객', '567123', '010-9012-3456', '990910-9012345', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('정우성', '일반 고객', '678234', '010-0123-4567', '000101-0123456', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('조인성', '관리 고객', '789345', '010-1234-5678', '010202-1234567', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('공유', 'VIP 고객', '890456', '010-2345-6789', '020303-2345678', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('이병헌', '일반 고객', '901567', '010-3456-7890', '030404-3456789', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('원빈', '관리 고객', '012678', '010-4567-8901', '040505-4567890', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('장동건', 'VIP 고객', '123789', '010-5678-9012', '050606-5678901', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('김우빈', '일반 고객', '234890', '010-6789-0123', '060707-6789012', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('정해인', '관리 고객', '345901', '010-7890-1234', '070808-7890123', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('이민호', 'VIP 고객', '456012', '010-8901-2345', '080909-8901234', '${new Date().toISOString()}', '${new Date().toISOString()}'),
  //   ('박보검', '일반 고객', '567123', '010-9012-3456', '091010-9012345', '${new Date().toISOString()}', '${new Date().toISOString()}');
  // `);
  
  db.run(`
    INSERT INTO client (name, clientType, driverLicense, contactNumber, residentRegistrationNumber, createdAt, updatedAt)
    VALUES 
    ('홍길동', '관리 고객', '123456', '010-1234-5678', '900101-1', '${new Date().toISOString()}', '${new Date().toISOString()}'),
    ('김철수', '가망 고객', '654321', '010-9876-5432', '850101-1', '${new Date().toISOString()}', '${new Date().toISOString()}'),
    ('이영희', '가망 고객', '789012', '010-1234-6789', '880201-2', '${new Date().toISOString()}', '${new Date().toISOString()}'),
    ('박지성', '관리 고객', '890123', '010-3456-7890', '020305-3', '${new Date().toISOString()}', '${new Date().toISOString()}');
  `);
    console.log("Inserted example data into clients table.");
  }
}
