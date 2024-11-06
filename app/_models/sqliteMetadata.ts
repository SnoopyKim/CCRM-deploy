export default class SqliteMetadataModel {
    id?: number;
    metaKey: string;
    metaValue: string;
    createdAt: string;
    updatedAt: string;
  
    constructor(
      id: number | undefined,
      metaKey: string,
      metaValue: string,
      createdAt: string,
      updatedAt: string,
    ) {
      this.id = id;
      this.metaKey = metaKey;
      this.metaValue = metaValue;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  
    static fromJson(metadata: any): SqliteMetadataModel {
      return new SqliteMetadataModel(
        metadata.id,
        metadata.metaKey,
        metadata.metaValue,
        metadata.createdAt,
        metadata.updatedAt,
      );
    }
  
    toJson(): any {
      return {
        id: this.id,
        metaKey: this.metaKey,
        metaValue: this.metaValue,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
    }
  
    toString(): string {
      return JSON.stringify(this.toJson());
    }
  }
  