"use client";
type TableColumn = {
  type: string;
  primaryKey?: boolean;
  notNull?: boolean;
};

export type TableSchema = {
  [key: string]: TableColumn;
};
