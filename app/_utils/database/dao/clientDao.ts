"use client";
import { getDatabase } from "../getDatabase";
import {
  generateInsertQuery,
  generateUpdateQuery,
  generateDeleteQuery,
  generateSelectQuery,
  mapResultsToKeyValue,
} from "../generator/queryGenerator";
import ClientModel from "@/app/_models/client";

export class ClientDao {
  async insertClient(client: ClientModel): Promise<void> {
    const db = await getDatabase();
    const clientData = client.toJson();
    clientData.createdAt = new Date().toISOString();
    clientData.updatedAt = new Date().toISOString();
    const query = generateInsertQuery("client", clientData);
    db.run(query);
  }

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

  async deleteClient(id: number): Promise<void> {
    const db = await getDatabase();
    const query = generateDeleteQuery("client", `id = ${id}`);
    db.run(query);
  }
  async deleteClients(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
  
    const db = await getDatabase();
    const idList = ids.join(", ");
    const query = generateDeleteQuery("client", `id IN (${idList})`);
    db.run(query);
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
      managementGroupId: clientData.managementGroupId,
    });
  }

  async getAllClients(): Promise<ClientModel[]> {
    const db = await getDatabase();
    const query = generateSelectQuery("client");
    const result = db.exec(query);

    const clients = mapResultsToKeyValue(result); // Key-value로 변환

    return clients.map(clientData => {
      return ClientModel.fromJson({
        id: clientData.id,
        name: clientData.name,
        clientType: clientData.clientType,
        driverLicense: clientData.driverLicense,
        contactNumber: clientData.contactNumber,
        residentRegistrationNumber: clientData.residentRegistrationNumber,
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
        managementGroupId: clientData.managementGroupId,
      });
    });
  }
  

  async getClientWithManagementGroup(id: number): Promise<ClientModel | null> {
    const db = await getDatabase();
    const clientQuery = generateSelectQuery("client", `id = ${id}`);
    const clientResult = db.exec(clientQuery);
    const clientData = clientResult[0]?.values[0];

    if (!clientData) {
      return null;
    }

    const clientModel = ClientModel.fromJson(clientData);
    const managementGroupId = clientData[22];
    if (managementGroupId) {
      const managementGroupQuery = generateSelectQuery("management_group", `id = ${managementGroupId}`);
      const managementGroupResult = db.exec(managementGroupQuery);
      const managementGroupData = managementGroupResult[0]?.values[0];
      return null;
      // return {
      //   ...clientModel,
      //   managementGroupId: managementGroupData,
      // };
    }

    return clientModel;
  }
}
