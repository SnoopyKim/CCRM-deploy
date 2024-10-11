"use client";
import { TableSchema } from "./tableSchema";

export const clientSchema: TableSchema = {
  id: { type: "INTEGER", primaryKey: true },
  name: { type: "TEXT", notNull: true },
  client_type: { type: "TEXT", notNull: true },
  occupation: { type: "TEXT" },
  contact_number: { type: "TEXT", notNull: true },
  resident_registration_number: { type: "TEXT", notNull: true },
  address: { type: "TEXT" },
  address_detail: { type: "TEXT" },
  interests: { type: "TEXT" },
  bank_account_info: { type: "TEXT" },
  insurance_info: { type: "TEXT" },
  attach: { type: "TEXT" },
  notes: { type: "TEXT" },
  created_at: { type: "TEXT", notNull: true },
  updated_at: { type: "TEXT", notNull: true },
  management_group_id: { type: "INTEGER" },
};
