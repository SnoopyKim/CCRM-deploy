"use client";
import { TableSchema } from "./tableSchema";

export const metadataSchema: TableSchema = {
  id: { type: "INTEGER", primaryKey: true },
  meta_key: { type: "TEXT", notNull: true },
  meta_value: { type: "TEXT", notNull: true },
  created_at: { type: "TEXT", notNull: true },
  updated_at: { type: "TEXT", notNull: true },
};
