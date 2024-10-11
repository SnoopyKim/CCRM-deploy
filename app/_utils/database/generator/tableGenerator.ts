"use client";

import { Database } from "sql.js";
import { TableSchema } from "../schema/tableSchema";

export async function createTable(
  db: Database,
  tableName: string,
  schema: TableSchema
): Promise<void> {
  const columns = Object.entries(schema)
    .map(([name, attributes]) => {
      let columnDef = `${name} ${attributes.type}`;
      if (attributes.primaryKey) columnDef += " PRIMARY KEY";
      if (attributes.notNull) columnDef += " NOT NULL";
      return columnDef;
    })
    .join(", ");

  const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;

  db.run(createTableQuery);
  console.log(`Table "${tableName}" created successfully.`);
}

export async function createTables(
  db: Database,
  tables: { [key: string]: TableSchema }
): Promise<void> {
  for (const [tableName, schema] of Object.entries(tables)) {
    await createTable(db, tableName, schema);
  }
}
