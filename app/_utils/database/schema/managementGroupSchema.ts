"use client";
import { TableSchema } from "./tableSchema";

export const managementGroupSchema: TableSchema = {
  id: { type: "INTEGER", primaryKey: true , autoincrement: true},
  groupName: { type: "TEXT", notNull: true },
  createdAt: { type: "TEXT", notNull: true },
  updatedAt: { type: "TEXT", notNull: true },
};
