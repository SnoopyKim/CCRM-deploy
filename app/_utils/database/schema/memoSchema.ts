"use client";
import { TableSchema } from "./tableSchema";

export const memoSchema: TableSchema = {
  id: { type: "INTEGER", primaryKey: true },
  memoContent: { type: "TEXT" },
};
