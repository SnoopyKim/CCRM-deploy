"use client";
import { getDatabase, updateDatabase } from "../getDatabase";
import { generateDeleteQuery, generateInsertQuery, generateSelectQuery, mapResultsToKeyValue } from "../generator/queryGenerator";
import ManagementGroupModel from "@/app/_models/managementGroup";
import ClientModel from "@/app/_models/client";

export class ClientManagementGroupDao {
  async getManagementGroupsByClientId(clientId: number): Promise<ManagementGroupModel[]> {
    const db = await getDatabase();
    const query = `
      SELECT mg.*
      FROM management_group mg
      JOIN client_management_group cmg ON mg.id = cmg.managementGroupId
      WHERE cmg.clientId = ${clientId}
    `;
    const result = db.exec(query);

    const groups = mapResultsToKeyValue(result);
    return groups.map(groupData => ManagementGroupModel.fromJson(groupData));
  }

  async getClientsByManagementGroupId(managementGroupId: number): Promise<ClientModel[]> {
    const db = await getDatabase();
    const query = `
      SELECT c.*
      FROM client c
      JOIN client_management_group cmg ON c.id = cmg.clientId
      WHERE cmg.managementGroupId = ${managementGroupId}
    `;
    const result = db.exec(query);

    const clients = mapResultsToKeyValue(result);
    return clients.map(clientData => ClientModel.fromJson(clientData));
  }
  
  @updateDatabase
  async addClientsToManagementGroup(managementGroupId: number, clientIds: number[]): Promise<void> {
    if (clientIds.length === 0) return;
  
    const db = await getDatabase();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
  
    // 이미 존재하는 clientId를 확인하기 위해 DB 조회
    const existingClientIdsQuery = `
      SELECT clientId
      FROM client_management_group
      WHERE managementGroupId = ${managementGroupId} AND clientId IN (${clientIds.join(", ")})
    `;
    const result = db.exec(existingClientIdsQuery);
    const existingClientIds = result[0]?.values.map(row => row[0]) || [];
  
    // 중복되지 않은 clientId만 필터링
    const uniqueClientIds = clientIds.filter(clientId => !existingClientIds.includes(clientId));
  
    // 중복되지 않은 clientId만 추가
    uniqueClientIds.forEach(clientId => {
      const data = {
        clientId,
        managementGroupId,
        createdAt,
        updatedAt,
      };
      const query = generateInsertQuery("client_management_group", data);
      db.run(query);
    });
  }
  
  @updateDatabase
  async removeClientsFromManagementGroup(managementGroupId: number, clientIds: number[]): Promise<void> {
    if (clientIds.length === 0) return;

    const db = await getDatabase();
    const idList = clientIds.join(", ");
    const query = generateDeleteQuery("client_management_group", `managementGroupId = ${managementGroupId} AND clientId IN (${idList})`);
    db.run(query);
  }
}
