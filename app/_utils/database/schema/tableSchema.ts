"use client";
type TableColumn = {
  type: string;
  primaryKey?: boolean;
  notNull?: boolean;
  autoincrement?: boolean;
};

export type TableSchema = {
  [key: string]: TableColumn;
};
