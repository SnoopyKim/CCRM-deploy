"use client";
import { getDatabase } from "../getDatabase";
import {
  generateInsertQuery,
  generateUpdateQuery,
  generateDeleteQuery,
  generateSelectQuery,
} from "../generator/queryGenerator";

export class MemoDao {
  async insertMemo(data: Record<string, any>): Promise<void> {
    const db = await getDatabase();
    const query = generateInsertQuery("memo", data);
    db.run(query);
  }

  async updateMemo(id: number, newData: Record<string, any>): Promise<void> {
    const db = await getDatabase();
    const query = generateUpdateQuery("memo", newData, `id = ${id}`);
    db.run(query);
  }

  async deleteMemo(id: number): Promise<void> {
    const db = await getDatabase();
    const query = generateDeleteQuery("memo", `id = ${id}`);
    db.run(query);
  }

  async getMemo(id: number): Promise<any> {
    const db = await getDatabase();
    const query = generateSelectQuery("memo", `id = ${id}`);
    return db.exec(query);
  }

  async getAllMemos(): Promise<any[]> {
    const db = await getDatabase();
    const query = generateSelectQuery("memo");
    const result = db.exec(query);
    return result[0]?.values || [];
  }
}
