export type NoticeDTO = {
  id: string;
  category: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  attachment: string;
};

export const NoticeCategory = {
  notice: "공지사항",
  main: "메인 상단",
  popup: "팝업",
};

export default class NoticeModel {
  id: string;
  category: keyof typeof NoticeCategory;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  attachment: string;
  newAttachemnt?: File | string;

  constructor(
    id: string,
    category: keyof typeof NoticeCategory,
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

  getCategoryName = (): string => NoticeCategory[this.category] ?? "기타";

  // DTO에서 NoticeModel로 변환
  static fromJson(noticeDTO: NoticeDTO): NoticeModel {
    return new NoticeModel(
      noticeDTO.id,
      noticeDTO.category as keyof typeof NoticeCategory,
      noticeDTO.title,
      noticeDTO.content,
      noticeDTO.isPublished,
      new Date(noticeDTO.createdAt), // string -> Date 변환
      new Date(noticeDTO.updatedAt), // string -> Date 변환
      noticeDTO.attachment
    );
  }

  // NoticeModel을 DTO로 변환
  toJson(): NoticeDTO {
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
    formData.append("id", this.id);
    formData.append("category", this.category);
    formData.append("title", this.title);
    formData.append("content", this.content);
    formData.append("isPublished", String(this.isPublished));
    if (this.newAttachemnt) {
      formData.append("attachment", this.newAttachemnt);
    }
    return formData;
  }

  // 빈 인스턴스 반환
  static empty(): NoticeModel {
    return new NoticeModel(
      "",
      "notice",
      "",
      "",
      true,
      new Date(),
      new Date(),
      ""
    );
  }
}
