// Term.ts

export type TermDTO = {
  id: string;
  category: string;
  insurerName: string;
  insurerLogo: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  orderNum: string;
};

export const TermCategory = {
  property: "손해보험",
  life: "생명보험",
};

export default class TermModel {
  id: string;
  category: keyof typeof TermCategory;
  insurerName: string;
  insurerLogo: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  orderNum: string;

  constructor(
    id: string,
    category: keyof typeof TermCategory,
    insurerName: string,
    insurerLogo: string,
    link: string,
    createdAt: Date,
    updatedAt: Date,
    isPublished: boolean,
    orderNum: string
  ) {
    this.id = id;
    this.category = category;
    this.insurerName = insurerName;
    this.insurerLogo = insurerLogo;
    this.link = link;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isPublished = isPublished;
    this.orderNum = orderNum;
  }

  getCategoryName = (): string => TermCategory[this.category] ?? "손해보험";

  static fromJson(term: TermDTO): TermModel {
    return new TermModel(
      term.id,
      term.category as keyof typeof TermCategory,
      term.insurerName,
      term.insurerLogo,
      term.link,
      new Date(term.createdAt),
      new Date(term.updatedAt),
      term.isPublished,
      term.orderNum
    );
  }

  toJson(): TermDTO {
    return {
      id: this.id,
      category: this.category,
      insurerName: this.insurerName,
      insurerLogo: this.insurerLogo,
      link: this.link,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isPublished: this.isPublished,
      orderNum: this.orderNum,
    };
  }

  static empty(): TermModel {
    return new TermModel(
      "",
      "property",
      "",
      "",
      "",
      new Date(),
      new Date(),
      true,
      ""
    );
  }
}
