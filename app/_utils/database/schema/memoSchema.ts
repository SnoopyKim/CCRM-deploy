"use client";
import { TableSchema } from "./tableSchema";

export const memoSchema: TableSchema = {
  id: { type: "INTEGER", primaryKey: true },
  memo_content: { type: "TEXT" },
};
