"use client";
import { getDatabase, updateDatabase } from "../getDatabase";
import {
  generateInsertQuery,
  generateUpdateQuery,
  generateDeleteQuery,
  generateSelectQuery,
  mapResultsToKeyValue,
} from "../generator/queryGenerator";
import ManagementGroupModel from "@/app/_models/managementGroup";

export class ManagementGroupDao {
  @updateDatabase
  async insertManagementGroup(group: ManagementGroupModel): Promise<void> {
    const db = await getDatabase();
    const groupData = group.toJson();
    groupData.createdAt = new Date().toISOString();
    groupData.updatedAt = new Date().toISOString();
    const query = generateInsertQuery("management_group", groupData);
    db.run(query);
  }

  @updateDatabase
  async updateManagementGroup(id: number, group: Partial<ManagementGroupModel>): Promise<void> {
    const db = await getDatabase();
    const updatedData = Object.keys(group).reduce((acc, key) => {
      const value = (group as any)[key];
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    if (Object.keys(updatedData).length === 0) {
      throw new Error("No valid fields to update.");
    }

    const query = generateUpdateQuery("management_group", updatedData, `id = ${id}`);
    db.run(query);
  }

  @updateDatabase
  async deleteManagementGroup(id: number): Promise<void> {
    const db = await getDatabase();
    const query = generateDeleteQuery("management_group", `id = ${id}`);
    db.run(query);
  }

  @updateDatabase
  async deleteManagementGroupTransaction(id: number): Promise<void> {
    const db = await getDatabase();

    await db.exec('BEGIN TRANSACTION');
    try {
      await db.run(generateDeleteQuery("client_management_group", `managementGroupId = ${id}`));
      await db.run(generateDeleteQuery("management_group", `id = ${id}`));

      await db.exec('COMMIT');
    } catch (error) {
      await db.exec('ROLLBACK');
      throw error;
    }
  }


  async getManagementGroup(id: number): Promise<ManagementGroupModel | null> {
    const db = await getDatabase();
    const query = generateSelectQuery("management_group", `id = ${id}`);
    const result = db.exec(query);

    if (result.length === 0 || !result[0].values.length) {
      return null;
    }

    const groupData = mapResultsToKeyValue(result)[0];

    return ManagementGroupModel.fromJson({
      id: groupData.id,
      groupName: groupData.groupName,
      createdAt: groupData.createdAt,
      updatedAt: groupData.updatedAt,
    });
  }

  async getAllManagementGroups(): Promise<ManagementGroupModel[]> {
    const db = await getDatabase();
    const query = generateSelectQuery("management_group");
    const result = db.exec(query);

    return mapResultsToKeyValue(result).map(groupData =>
      ManagementGroupModel.fromJson({
        id: groupData.id,
        groupName: groupData.groupName,
        createdAt: groupData.createdAt,
        updatedAt: groupData.updatedAt,
      })
    );
  }
}
