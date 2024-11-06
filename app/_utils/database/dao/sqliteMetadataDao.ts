"use client";
import { getDatabase, updateDatabase } from "../getDatabase";
import {
  generateInsertQuery,
  generateUpdateQuery,
  generateDeleteQuery,
  generateSelectQuery,
  mapResultsToKeyValue,
} from "../generator/queryGenerator";
import SqliteMetadataModel from "@/app/_models/sqliteMetadata";
import { Database } from "sql.js";

export class SqliteMetadataDao {
  @updateDatabase
  async insertMetadata(metadata: SqliteMetadataModel): Promise<void> {
    const db = await getDatabase();
    const metadataData = metadata.toJson();
    metadataData.createdAt = new Date().toISOString();
    metadataData.updatedAt = new Date().toISOString();
    const query = generateInsertQuery("metadata", metadataData);
    db.run(query);
  }

  @updateDatabase
  async updateMetadata(id: number, metadata: Partial<SqliteMetadataModel>): Promise<void> {
    const db = await getDatabase();
    const updatedData = Object.keys(metadata).reduce((acc, key) => {
      const value = (metadata as any)[key];
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    if (Object.keys(updatedData).length === 0) {
      throw new Error("No valid fields to update.");
    }

    const query = generateUpdateQuery("metadata", updatedData, `id = ${id}`);
    db.run(query);
  }

  @updateDatabase
  async deleteMetadata(id: number): Promise<void> {
    const db = await getDatabase();
    const query = generateDeleteQuery("metadata", `id = ${id}`);
    db.run(query);
  }

  async getMetadata(id: number): Promise<SqliteMetadataModel | null> {
    const db = await getDatabase();
    const query = generateSelectQuery("metadata", `id = ${id}`);
    const result = db.exec(query);

    if (result.length === 0 || !result[0].values.length) {
      return null;
    }

    const metadataArray = mapResultsToKeyValue(result);
    const metadataData = metadataArray[0];

    return SqliteMetadataModel.fromJson({
      id: metadataData.id,
      metaKey: metadataData.metaKey,
      metaValue: metadataData.metaValue,
      createdAt: metadataData.createdAt,
      updatedAt: metadataData.updatedAt,
    });
  }

  async getAllMetadata(): Promise<SqliteMetadataModel[]> {
    const db = await getDatabase();
    const query = generateSelectQuery("metadata");
    const result = db.exec(query);

    const metadataArray = mapResultsToKeyValue(result);

    return metadataArray.map(metadataData => {
      return SqliteMetadataModel.fromJson({
        id: metadataData.id,
        metaKey: metadataData.metaKey,
        metaValue: metadataData.metaValue,
        createdAt: metadataData.createdAt,
        updatedAt: metadataData.updatedAt,
      });
    });
  }

  async getMetadataByKey(db:Database ,metaKey: string): Promise<SqliteMetadataModel | null> {
    const query = generateSelectQuery("metadata", `metaKey = '${metaKey}'`);
    const result = db.exec(query);

    if (result.length === 0 || !result[0].values.length) {
      return null;
    }

    const metadataArray = mapResultsToKeyValue(result);
    const metadataData = metadataArray[0];

    return SqliteMetadataModel.fromJson({
      id: metadataData.id,
      metaKey: metadataData.metaKey,
      metaValue: metadataData.metaValue,
      createdAt: metadataData.createdAt,
      updatedAt: metadataData.updatedAt,
    });
  }
}
