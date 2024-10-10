import GoogleMetadataModel, { GoogleMetadataDTO } from "./google-metadata";

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  username: string;
  phoneNumber: string;
  createdAt: string;
  googleMetadata?: GoogleMetadataDTO;
  paymentMetadata?: {
    subscriptionStatus: string;
    renewalDate: string;
  };
};

export default class UserModel {
  id: string;
  name: string;
  email: string;
  username: string;
  phoneNumber: string;
  createdAt: string;
  googleMetadata?: GoogleMetadataModel;
  paymentMetadata?: {
    subscriptionStatus: string;
    renewalDate: string;
  };

  constructor(
    id: string,
    name: string,
    email: string,
    username: string,
    phoneNumber: string,
    createdAt: string,
    googleMetadata: GoogleMetadataModel | undefined,
    paymentMetadata:
      | {
          subscriptionStatus: string;
          renewalDate: string;
        }
      | undefined
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.createdAt = createdAt;
    this.googleMetadata = googleMetadata;
    this.paymentMetadata = paymentMetadata;
  }

  // DTO 데이터를 받아 Model로 변환
  static fromJson(userDTO: UserDTO): UserModel {
    return new UserModel(
      userDTO.id,
      userDTO.name,
      userDTO.email,
      userDTO.username,
      userDTO.phoneNumber,
      userDTO.createdAt,
      userDTO.googleMetadata
        ? GoogleMetadataModel.fromJson(userDTO.googleMetadata)
        : undefined,
      userDTO.paymentMetadata
    );
  }

  // Model 데이터를 DTO로 변환
  toJson(): UserDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      phoneNumber: this.phoneNumber,
      createdAt: this.createdAt,
      googleMetadata: this.googleMetadata
        ? this.googleMetadata.toJson()
        : undefined,
      paymentMetadata: this.paymentMetadata,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}
