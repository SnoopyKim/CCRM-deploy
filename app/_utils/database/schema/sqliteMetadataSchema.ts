"use client";
import { TableSchema } from "./tableSchema";

export const sqliteMetadataSchema: TableSchema = {
  id: { type: "INTEGER", primaryKey: true, autoincrement: true  },
  metaKey: { type: "TEXT", notNull: true },
  metaValue: { type: "TEXT", notNull: true },
  createdAt: { type: "TEXT", notNull: true },
  updatedAt: { type: "TEXT", notNull: true },
};
