"use client";
import { getDatabase } from "../getDatabase";
import {
  generateInsertQuery,
  generateUpdateQuery,
  generateDeleteQuery,
  generateSelectQuery,
} from "../generator/queryGenerator";

export class ConsultationDao {
  async insertConsultation(data: Record<string, any>): Promise<void> {
    const db = await getDatabase();
    const query = generateInsertQuery("consultation", data);
    db.run(query);
  }

  async updateConsultation(
    id: number,
    newData: Record<string, any>
  ): Promise<void> {
    const db = await getDatabase();
    const query = generateUpdateQuery("consultation", newData, `id = ${id}`);
    db.run(query);
  }

  async deleteConsultation(id: number): Promise<void> {
    const db = await getDatabase();
    const query = generateDeleteQuery("consultation", `id = ${id}`);
    db.run(query);
  }

  async getConsultation(id: number): Promise<any> {
    const db = await getDatabase();
    const query = generateSelectQuery("consultation", `id = ${id}`);
    return db.exec(query);
  }

  async getAllConsultations(): Promise<any[]> {
    const db = await getDatabase();
    const query = generateSelectQuery("consultation");
    const result = db.exec(query);
    return result[0]?.values || [];
  }
}
