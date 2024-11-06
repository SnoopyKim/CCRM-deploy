"use client";
import { TableSchema } from "./tableSchema";

export const consultationSchema: TableSchema = {
  id: { type: "INTEGER", primaryKey: true , autoincrement: true},
  clientId: { type: "INTEGER", notNull: true },
  title: { type: "TEXT", notNull: true }, // 상담 제목
  content: { type: "INTEGER", notNull: true }, // 상담 내용
  detailedContent: { type: "TEXT" }, // 자세한 상담 내용
  consultationTime: { type: "TEXT", notNull: true }, // 상담 일
  consultationTimeDetail: { type: "TEXT" }, // 상담 시간
  consultationAddress: { type: "TEXT" }, // 주소
  consultationAddressDetail: { type: "TEXT" }, // 상세 주소
  createdAt: { type: "TEXT", notNull: true },
  updatedAt: { type: "TEXT", notNull: true },
  consultationStatus: { type: "TEXT" }, //상담 진행 현황
};
