"use client";
import { getDatabase } from "../getDatabase";
import {
  generateInsertQuery,
  generateUpdateQuery,
  generateDeleteQuery,
  generateSelectQuery,
} from "../generator/queryGenerator";

export class ManagementGroupDao {
  async insertManagementGroup(data: Record<string, any>): Promise<void> {
    const db = await getDatabase();
    const query = generateInsertQuery("management_group", data);
    db.run(query);
  }

  async updateManagementGroup(
    id: number,
    newData: Record<string, any>
  ): Promise<void> {
    const db = await getDatabase();
    const query = generateUpdateQuery(
      "management_group",
      newData,
      `id = ${id}`
    );
    db.run(query);
  }

  async deleteManagementGroup(id: number): Promise<void> {
    const db = await getDatabase();
    const query = generateDeleteQuery("management_group", `id = ${id}`);
    db.run(query);
  }

  async getManagementGroup(id: number): Promise<any> {
    const db = await getDatabase();
    const query = generateSelectQuery("management_group", `id = ${id}`);
    return db.exec(query);
  }

  async getAllManagementGroups(): Promise<any[]> {
    const db = await getDatabase();
    const query = generateSelectQuery("management_group");
    const result = db.exec(query);
    return result[0]?.values || [];
  }
}
