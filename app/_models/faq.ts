// src/models/FaqModel.ts

// DTO 정의
export type FaqDTO = {
  id: string;
  category: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  attachment: string;
};

export const FaqCategory = {
  payment: "결제 관련",
  member: "회원 관련",
  error: "오류 관련",
  program: "프로그램 관련",
  coalition: "제휴 관련",
  etc: "기타",
};

// Model 정의
export default class FaqModel {
  id: string;
  category: keyof typeof FaqCategory;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  attachment: string;
  newAttachemnt?: File | string;

  constructor(
    id: string,
    category: keyof typeof FaqCategory,
    title: string,
    content: string,
    isPublished: boolean,
    createdAt: Date,
    updatedAt: Date,
    attachment: string
  ) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.content = content;
    this.isPublished = isPublished;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.attachment = attachment;
  }

  getCategoryName = (): string => FaqCategory[this.category] ?? "기타";

  // DTO에서 FaqModel로 변환
  static fromJson(faqDTO: FaqDTO): FaqModel {
    return new FaqModel(
      faqDTO.id,
      faqDTO.category as keyof typeof FaqCategory,
      faqDTO.title,
      faqDTO.content,
      faqDTO.isPublished,
      new Date(faqDTO.createdAt), // string -> Date 변환
      new Date(faqDTO.updatedAt), // string -> Date 변환
      faqDTO.attachment
    );
  }

  // FaqModel을 DTO로 변환
  toJson(): FaqDTO {
    return {
      id: this.id,
      category: this.category,
      title: this.title,
      content: this.content,
      isPublished: this.isPublished,
      createdAt: this.createdAt.toISOString(), // Date -> string 변환
      updatedAt: this.updatedAt.toISOString(), // Date -> string 변환
      attachment: this.attachment,
    };
  }

  toFormData(): FormData {
    const formData = new FormData();
    formData.append("title", this.title);
    formData.append("category", this.category);
    formData.append("content", this.content);
    formData.append("isPublished", String(this.isPublished));
    if (this.newAttachemnt) {
      formData.append("attachment", this.newAttachemnt);
    }
    return formData;
  }

  // 빈 인스턴스 반환
  static empty(): FaqModel {
    return new FaqModel(
      "",
      "payment",
      "",
      "",
      true,
      new Date(),
      new Date(),
      ""
    );
  }
}
