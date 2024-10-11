"use client";
import { TableSchema } from "./tableSchema";

export const consultationSchema: TableSchema = {
  id: { type: "INTEGER", primaryKey: true },
  client_id: { type: "INTEGER", notNull: true },
  title: { type: "TEXT", notNull: true },
  detailed_content: { type: "TEXT" },
  consultation_time: { type: "TEXT", notNull: true },
  consultation_address: { type: "TEXT" },
  consultation_address_detail: { type: "TEXT" },
  created_at: { type: "TEXT", notNull: true },
};
