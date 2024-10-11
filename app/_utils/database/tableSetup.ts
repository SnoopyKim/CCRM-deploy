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

  createTables(db, tables);
}
