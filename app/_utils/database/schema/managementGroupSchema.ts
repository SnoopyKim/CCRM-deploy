"use client";
import { TableSchema } from "./tableSchema";

export const managementGroupSchema: TableSchema = {
  id: { type: "INTEGER", primaryKey: true },
  group_name: { type: "TEXT", notNull: true },
  created_at: { type: "TEXT", notNull: true },
  updated_at: { type: "TEXT", notNull: true },
};
