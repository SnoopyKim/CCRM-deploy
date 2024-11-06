"use client";
import { getDatabase, updateDatabase } from "../getDatabase";
import {
  generateInsertQuery,
  generateUpdateQuery,
  generateDeleteQuery,
  generateSelectQuery,
  mapResultsToKeyValue,
} from "../generator/queryGenerator";
import ClientModel from "@/app/_models/client";

export class ClientDao {
  @updateDatabase
  async insertClient(client: ClientModel): Promise<number> {
    const db = await getDatabase();
    const clientData = client.toJson();
    clientData.createdAt = new Date().toISOString();
    clientData.updatedAt = new Date().toISOString();
    const query = generateInsertQuery("client", clientData);
    db.run(query);

    // 삽입된 마지막 row의 ID 가져오기
    const result = db.exec("SELECT last_insert_rowid() AS id");

    // 결과에서 id 추출
    const lastId = result[0]?.values[0][0] as number;
    return lastId;
  }

  @updateDatabase
  async updateClient(id: number, client: Partial<ClientModel>): Promise<void> {
    const db = await getDatabase();
    const updatedData = Object.keys(client).reduce((acc, key) => {
      const value = (client as any)[key];
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    if (Object.keys(updatedData).length === 0) {
      throw new Error("No valid fields to update.");
    }

    const query = generateUpdateQuery("client", updatedData, `id = ${id}`);
    db.run(query);
  }

  @updateDatabase
  async deleteClient(id: number): Promise<void> {
    const db = await getDatabase();
    const query = generateDeleteQuery("client", `id = ${id}`);
    db.run(query);
  }

  @updateDatabase
  async deleteClients(ids: number[]): Promise<void> {
    if (ids.length === 0) return;

    const db = await getDatabase();
    const idList = ids.join(", ");
    const query = generateDeleteQuery("client", `id IN (${idList})`);
    db.run(query);
  }

  @updateDatabase
  async deleteClientsTransaction(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    const db = await getDatabase();
    const idList = ids.join(", ");

    // 트랜잭션 시작
    await db.exec("BEGIN TRANSACTION");
    try {
      // 해당 유저와 관련된 모든 데이터를 삭제
      await db.run(generateDeleteQuery("client", `id IN (${idList})`));
      await db.run(
        generateDeleteQuery("consultation", `clientId IN (${idList})`)
      );
      await db.run(
        generateDeleteQuery(
          "client_management_group",
          `clientId IN (${idList})`
        )
      );

      await db.exec("COMMIT");
    } catch (error) {
      await db.exec("ROLLBACK");
      throw error;
    }
  }

  async getClient(id: number): Promise<ClientModel | null> {
    const db = await getDatabase();
    const query = generateSelectQuery("client", `id = ${id}`);
    const result = db.exec(query);

    if (result.length === 0 || !result[0].values.length) {
      return null;
    }

    const clients = mapResultsToKeyValue(result); // Key-value로 변환
    const clientData = clients[0]; // 첫 번째 결과만 가져옴

    return ClientModel.fromJson({
      id: clientData.id,
      name: clientData.name,
      clientType: clientData.clientType,
      driverLicense: clientData.driverLicense,
      contactNumber: clientData.contactNumber,
      residentRegistrationNumber: clientData.residentRegistrationNumber,
      occupation: clientData.occupation,
      address: clientData.address,
      addressDetail: clientData.addressDetail,
      interests: clientData.interests,
      family: clientData.family,
      anniversary: clientData.anniversary,
      bankAccountInfo: clientData.bankAccountInfo,
      notes: clientData.notes,
      hospitalRecord: clientData.hospitalRecord,
      insuranceRecord: clientData.insuranceRecord,
      autoInsuranceExpiration: clientData.autoInsuranceExpiration,
      fireInsuranceExpiration: clientData.fireInsuranceExpiration,
      exemptionReductionEndDate: clientData.exemptionReductionEndDate,
      honorific: clientData.honorific,
      createdAt: clientData.createdAt,
      updatedAt: clientData.updatedAt,
    });
  }

  async getAllClients(): Promise<ClientModel[]> {
    const db = await getDatabase();
    const query = generateSelectQuery("client");
    const result = db.exec(query);

    const clients = mapResultsToKeyValue(result); // Key-value로 변환

    return clients.map((clientData) => {
      return ClientModel.fromJson({
        id: clientData.id,
        name: clientData.name,
        clientType: clientData.clientType,
        driverLicense: clientData.driverLicense,
        contactNumber: clientData.contactNumber,
        residentRegistrationNumber: clientData.residentRegistrationNumber,
        occupation: clientData.occupation,
        address: clientData.address,
        addressDetail: clientData.addressDetail,
        interests: clientData.interests,
        family: clientData.family,
        anniversary: clientData.anniversary,
        bankAccountInfo: clientData.bankAccountInfo,
        notes: clientData.notes,
        hospitalRecord: clientData.hospitalRecord,
        insuranceRecord: clientData.insuranceRecord,
        autoInsuranceExpiration: clientData.autoInsuranceExpiration,
        fireInsuranceExpiration: clientData.fireInsuranceExpiration,
        exemptionReductionEndDate: clientData.exemptionReductionEndDate,
        honorific: clientData.honorific,
        createdAt: clientData.createdAt,
        updatedAt: clientData.updatedAt,
      });
    });
  }
}
