import { ClientManagementGroupDao } from "../_utils/database/dao/clientManagementGroupDao";
import ClientModel, { ClientDTO } from "./client";

export type ManagementGroupDTO = Partial<{
    id: number;
    groupName: string;
    createdAt: string;
    updatedAt: string;
    clients:ClientDTO[]
  }>;
  
  export default class ManagementGroupModel {
    id?: number;
    groupName: string;
    createdAt: string;
    updatedAt: string;
  
    constructor(
      id: number | undefined,
      groupName: string,
      createdAt: string,
      updatedAt: string
    ) {
      this.id = id;
      this.groupName = groupName;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  
    // JSON 데이터를 통해 객체를 생성하는 정적 메서드
    static fromJson(data: any): ManagementGroupModel {
      return new ManagementGroupModel(
        data.id,
        data.groupName,
        data.createdAt,
        data.updatedAt
      );
    }
  
    // 객체 데이터를 JSON 형식으로 변환
    toJson(): any {
      return {
        id: this.id,
        groupName: this.groupName,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
    }
  
    // DTO로 변환하는 메서드
    toDTO(): ManagementGroupDTO {
      return {
        id: this.id,
        groupName: this.groupName,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
    }
  
    // DTO에서 ManagementGroupModel을 생성하는 메서드
    static fromDTO(dto: Partial<ManagementGroupDTO>): ManagementGroupModel {
      return new ManagementGroupModel(
        dto.id,
        dto.groupName || "",
        dto.createdAt || new Date().toISOString(),
        new Date().toISOString()
      );
    }
    

    async getClients(): Promise<ClientModel[]> {
      if(this.id){
          const dao = await new ClientManagementGroupDao();
          return dao.getClientsByManagementGroupId(this.id);
      }
      return [];
    }
  
    // 문자열 형식으로 객체 표현
    toString(): string {
      return JSON.stringify(this.toJson());
    }
  }
  