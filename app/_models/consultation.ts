import ClientModel, { ClientDTO } from "./client";

export const consultationContents = [
  { value: 0, text: "조회 상담" },
  { value: 1, text: "정보 수집" },
  { value: 2, text: "상품 제안" },
  { value: 3, text: "계약 체결" },
  { value: 4, text: "증권 전달" },
  { value: 5, text: "기타" },
];

export type TimeDetail = {
  timePeriod: string;
  hour: number;
  minute: number;
};

export type ConsultationDTO = Partial<{
  id: number;
  clientId: number;
  client: ClientDTO;
  title: string;
  content: number;
  detailedContent?: string;
  consultationTime: string;
  consultationTimeDetail: TimeDetail;
  consultationAddress?: string;
  consultationAddressDetail?: string;
  createdAt: string;
  updatedAt: string;
  consultationStatus?: string;
}>;

export default class ConsultationModel {
  id?: number;
  clientId: number;
  title: string;
  content: number;
  detailedContent?: string;
  consultationTime: string;
  consultationTimeDetail: string;
  consultationAddress?: string;
  consultationAddressDetail?: string;
  createdAt: string;
  updatedAt: string;
  client?: ClientModel;
  consultationStatus?: string;

  constructor(
    id: number | undefined,
    clientId: number,
    title: string,
    content: number,
    consultationTime: string,
    consultationTimeDetail: string,
    createdAt: string,
    updatedAt: string,
    detailedContent?: string,
    consultationAddress?: string,
    consultationAddressDetail?: string,
    consultationStatus?: string
  ) {
    this.id = id;
    this.clientId = clientId;
    this.title = title;
    this.content = content;
    this.detailedContent = detailedContent;
    this.consultationTime = consultationTime;
    this.consultationTimeDetail = consultationTimeDetail;
    this.consultationAddress = consultationAddress;
    this.consultationAddressDetail = consultationAddressDetail;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.consultationStatus = consultationStatus||"SCHEDULED";
  }

  isPastConsultation(): boolean {
    const consultationDate = new Date(this.consultationTime);

    // TimeDetail이 존재하는 경우 시간과 분을 반영
    if (this.consultationTimeDetail) {
      const timeDetail: TimeDetail = JSON.parse(this.consultationTimeDetail);

      let hour = timeDetail.hour;
      if (!timeDetail.timePeriod||timeDetail.timePeriod.toLowerCase() === "am" && hour === 12) {
        hour = 0; // 자정
      }
      else if (timeDetail.timePeriod.toLowerCase() === "pm" && hour < 12) {
        hour += 12;
      } 

      consultationDate.setHours(hour, timeDetail.minute, 0, 0);
    }

    const currentDate = new Date();
    return consultationDate < currentDate;
  }

  static fromJson(data: any): ConsultationModel {
    return new ConsultationModel(
      data.id,
      data.clientId,
      data.title,
      data.content,
      data.consultationTime,
      data.consultationTimeDetail,
      data.createdAt,
      data.updatedAt,
      data.detailedContent,
      data.consultationAddress,
      data.consultationAddressDetail,
      data.consultationStatus
    );
  }

  toJson(): any {
    return {
      id: this.id,
      clientId: this.clientId,
      title: this.title,
      content: this.content,
      detailedContent: this.detailedContent,
      consultationTime: this.consultationTime,
      consultationTimeDetail: this.consultationTimeDetail,
      consultationAddress: this.consultationAddress,
      consultationAddressDetail: this.consultationAddressDetail,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      consultationStatus: this.consultationStatus,
    };
  }

  toDTO(): ConsultationDTO {
    return {
      id: this.id,
      clientId: this.clientId,
      title: this.title,
      content: this.content,
      detailedContent: this.detailedContent,
      consultationTime: this.consultationTime,
      consultationTimeDetail: this.consultationTimeDetail
        ? JSON.parse(this.consultationTimeDetail)
        : {},
      consultationAddress: this.consultationAddress,
      consultationAddressDetail: this.consultationAddressDetail,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      consultationStatus: this.consultationStatus,
    };
  }

  static fromDTO(dto: Partial<ConsultationDTO>): ConsultationModel {
    return new ConsultationModel(
      dto.id,
      dto.clientId || 0,
      dto.title || "",
      dto.content || 0,
      dto.consultationTime || "",
      JSON.stringify(dto.consultationTimeDetail || {}),
      dto.createdAt || new Date().toISOString(),
      dto.updatedAt || new Date().toISOString(),
      dto.detailedContent,
      dto.consultationAddress,
      dto.consultationAddressDetail,
      dto.consultationStatus,
    );
  }
}
