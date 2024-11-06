"use client";
import { TableSchema } from "./tableSchema";

// 연결 테이블: client_management_group
export const clientManagementGroupSchema: TableSchema = {
  id: { type: "INTEGER", primaryKey: true, autoincrement: true }, 
  clientId: { type: "INTEGER", notNull: true }, 
  managementGroupId: { type: "INTEGER", notNull: true }, 
  createdAt: { type: "TEXT", notNull: true }, 
  updatedAt: { type: "TEXT", notNull: true }, 
};
