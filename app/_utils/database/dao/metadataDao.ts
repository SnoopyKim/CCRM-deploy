"use client";
import { getDatabase } from "../getDatabase";
import {
  generateInsertQuery,
  generateUpdateQuery,
  generateDeleteQuery,
  generateSelectQuery,
} from "../generator/queryGenerator";

export class MetadataDao {
  async insertMetadata(data: Record<string, any>): Promise<void> {
    const db = await getDatabase();
    const query = generateInsertQuery("metadata", data);
    db.run(query);
  }

  async updateMetadata(
    id: number,
    newData: Record<string, any>
  ): Promise<void> {
    const db = await getDatabase();
    const query = generateUpdateQuery("metadata", newData, `id = ${id}`);
    db.run(query);
  }

  async deleteMetadata(id: number): Promise<void> {
    const db = await getDatabase();
    const query = generateDeleteQuery("metadata", `id = ${id}`);
    db.run(query);
  }

  async getMetadata(id: number): Promise<any> {
    const db = await getDatabase();
    const query = generateSelectQuery("metadata", `id = ${id}`);
    return db.exec(query);
  }

  async getMetadataByEntity(
    entityType: string,
    entityId: number
  ): Promise<any[]> {
    const db = await getDatabase();
    const query = generateSelectQuery(
      "metadata",
      `entity_type = '${entityType}' AND entity_id = ${entityId}`
    );
    const result = db.exec(query);
    return result[0]?.values || [];
  }

  async getAllMetadata(): Promise<any[]> {
    const db = await getDatabase();
    const query = generateSelectQuery("metadata");
    const result = db.exec(query);
    return result[0]?.values || [];
  }
}
