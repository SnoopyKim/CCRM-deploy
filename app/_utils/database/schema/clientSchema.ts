"use client";
import { TableSchema } from "./tableSchema";

export const clientSchema: TableSchema = {
  id: { type: "INTEGER", primaryKey: true, autoincrement: true },
  name: { type: "TEXT", notNull: true },
  clientType: { type: "TEXT", notNull: true }, // 고객 구분
  driverLicense: { type: "TEXT", notNull: true }, // 운전면허
  occupation: { type: "TEXT" }, // 하시는 일

  contactNumber: { type: "TEXT", notNull: true }, // 연락처
  residentRegistrationNumber: { type: "TEXT", notNull: true }, // 주민번호(7자리)

  address: { type: "TEXT" }, // 자택 주소
  addressDetail: { type: "TEXT" }, // 상세 주소
  interests: { type: "TEXT" }, // 관심 사항/성향(최대 3개)

  family: { type: "TEXT" }, // 가족
  anniversary: { type: "TEXT" }, // 기념일

  bankAccountInfo: { type: "TEXT" }, // 계좌 번호
  notes: { type: "TEXT" }, // 메모/특이사항

  hospitalRecord: { type: "TEXT" }, // 병원 내역
  insuranceRecord: { type: "TEXT" }, // 보험 내역

  autoInsuranceExpiration: { type: "TEXT" }, // 자동차보험 만기
  fireInsuranceExpiration: { type: "TEXT" }, // 화재보험 만기
  exemptionReductionEndDate: { type: "TEXT" }, // 면책/감액 종료일

  honorific: { type: "TEXT" }, // 호칭

  createdAt: { type: "TEXT", notNull: true },
  updatedAt: { type: "TEXT", notNull: true },
};
