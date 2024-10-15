// Insurance.ts

export type InsuranceDTO = {
  id: string;
  category: string;
  insurerName: string;
  insurerLogo: string;
  link: string;
  virtualFaxNumber: string;
  groupInsurance: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  orderNum: number;
};

export const InsuranceCategory = {
  property: "손해보험",
  life: "생명보험",
  pet: "펫보험",
  liability: "배상책임",
};

export default class InsuranceModel {
  id: string;
  category: keyof typeof InsuranceCategory;
  insurerName: string;
  insurerLogo: string;
  link: string;
  virtualFaxNumber: string;
  groupInsurance: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  orderNum: number;

  constructor(
    id: string,
    category: keyof typeof InsuranceCategory,
    insurerName: string,
    insurerLogo: string,
    link: string,
    virtualFaxNumber: string,
    groupInsurance: string,
    createdAt: Date,
    updatedAt: Date,
    isPublished: boolean,
    orderNum: number
  ) {
    this.id = id;
    this.category = category;
    this.insurerName = insurerName;
    this.insurerLogo = insurerLogo;
    this.link = link;
    this.virtualFaxNumber = virtualFaxNumber;
    this.groupInsurance = groupInsurance;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isPublished = isPublished;
    this.orderNum = orderNum;
  }

  getCategoryName = (): string =>
    InsuranceCategory[this.category] ?? "손해보험";

  static fromJson(dto: InsuranceDTO): InsuranceModel {
    return new InsuranceModel(
      dto.id,
      dto.category as keyof typeof InsuranceCategory,
      dto.insurerName,
      dto.insurerLogo,
      dto.link,
      dto.virtualFaxNumber,
      dto.groupInsurance,
      new Date(dto.createdAt),
      new Date(dto.updatedAt),
      dto.isPublished,
      dto.orderNum
    );
  }

  toJson(): InsuranceDTO {
    return {
      id: this.id,
      category: this.category,
      insurerName: this.insurerName,
      insurerLogo: this.insurerLogo,
      link: this.link,
      virtualFaxNumber: this.virtualFaxNumber,
      groupInsurance: this.groupInsurance,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isPublished: this.isPublished,
      orderNum: this.orderNum,
    };
  }

  static empty(): InsuranceModel {
    return new InsuranceModel(
      "",
      "property",
      "",
      "",
      "",
      "",
      "",
      new Date(),
      new Date(),
      true,
      1
    );
  }
}
