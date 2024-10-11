"use client";
import { getDatabase } from "../getDatabase";
import {
  generateInsertQuery,
  generateUpdateQuery,
  generateDeleteQuery,
  generateSelectQuery,
} from "../generator/queryGenerator";

export class ClientDao {
  async insertClient(data: Record<string, any>): Promise<void> {
    const db = await getDatabase();
    const query = generateInsertQuery("client", data);
    db.run(query);
  }

  async updateClient(id: number, newData: Record<string, any>): Promise<void> {
    const db = await getDatabase();
    const query = generateUpdateQuery("client", newData, `id = ${id}`);
    db.run(query);
  }

  async deleteClient(id: number): Promise<void> {
    const db = await getDatabase();
    const query = generateDeleteQuery("client", `id = ${id}`);
    db.run(query);
  }

  async getClient(id: number): Promise<any> {
    const db = await getDatabase();
    const query = generateSelectQuery("client", `id = ${id}`);
    return db.exec(query);
  }

  async getAllClients(): Promise<any[]> {
    const db = await getDatabase();
    const query = generateSelectQuery("client");
    const result = db.exec(query);
    return result[0]?.values || [];
  }

  async getClientWithManagementGroup(id: number): Promise<any> {
    const db = await getDatabase();

    // client 정보 조회
    const clientQuery = generateSelectQuery("client", `id = ${id}`);
    const clientResult = db.exec(clientQuery);
    const clientData = clientResult[0]?.values[0];

    if (!clientData) {
      throw new Error(`Client with id ${id} not found`);
    }

    // 관리 그룹 조회
    const managementGroupId = clientData[clientData.length - 1]; // 마지막 column이 management_group_id
    if (managementGroupId) {
      const managementGroupQuery = generateSelectQuery(
        "management_group",
        `id = ${managementGroupId}`
      );
      const managementGroupResult = db.exec(managementGroupQuery);
      const managementGroupData = managementGroupResult[0]?.values[0];

      // 관리 그룹이 있다면 해당 정보를 client와 함께 반환
      return {
        ...clientData,
        managementGroup: managementGroupData,
      };
    }

    // 관리 그룹이 없으면 client 정보만 반환
    return clientData;
  }
}
