import UserModel, { UserDTO } from "./user";

export type CourseDTO = {
  id: string;
  title: string;
  lecturer: string;
  category: string;
  author?: UserDTO;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  layoutOrder: number;
  url: string;
  attachment: string;
};

export const CourseCategory = {
  invest: "제테크/투자",
  etc: "기타",
};

class CourseModel {
  id: string;
  title: string;
  lecturer: string;
  category: keyof typeof CourseCategory;
  author?: UserModel; // Optional field
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  layoutOrder: number;
  url: string;
  attachment: string;
  newAttachemnt?: File | string;

  constructor(
    id: string,
    title: string,
    lecturer: string,
    category: keyof typeof CourseCategory,
    author: UserModel | undefined,
    createdAt: Date,
    updatedAt: Date,
    isPublished: boolean,
    layoutOrder: number,
    url: string,
    attachment: string
  ) {
    this.id = id;
    this.title = title;
    this.lecturer = lecturer;
    this.category = category as keyof typeof CourseCategory;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isPublished = isPublished;
    this.layoutOrder = layoutOrder;
    this.url = url;
    this.attachment = attachment;
  }

  getCategoryName = (): string => CourseCategory[this.category] ?? "기타";

  // DTO에서 CourseModel로 변환
  static fromJson(courseDTO: CourseDTO): CourseModel {
    return new CourseModel(
      courseDTO.id,
      courseDTO.title,
      courseDTO.lecturer,
      courseDTO.category as keyof typeof CourseCategory,
      courseDTO.author ? UserModel.fromJson(courseDTO.author) : undefined, // Optional 처리
      new Date(courseDTO.createdAt),
      new Date(courseDTO.updatedAt),
      courseDTO.isPublished,
      courseDTO.layoutOrder,
      courseDTO.url,
      courseDTO.attachment
    );
  }

  // CourseModel을 DTO로 변환
  toJson(): CourseDTO {
    return {
      id: this.id,
      title: this.title,
      lecturer: this.lecturer,
      category: this.category,
      author: this.author ? this.author.toJson() : undefined, // Optional 처리
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      isPublished: this.isPublished,
      layoutOrder: this.layoutOrder,
      url: this.url,
      attachment: this.attachment,
    };
  }

  toFormData(): FormData {
    const formData = new FormData();
    formData.append("title", this.title);
    formData.append("lecturer", this.lecturer);
    formData.append("category", this.category);
    formData.append("isPublished", String(this.isPublished));
    formData.append("layoutOrder", String(this.layoutOrder));
    formData.append("url", this.url);
    if (this.newAttachemnt) {
      formData.append("attachment", this.newAttachemnt);
    }
    return formData;
  }

  static empty(): CourseModel {
    return new CourseModel(
      "",
      "",
      "",
      "invest",
      undefined, // Author는 초기화되지 않음
      new Date(),
      new Date(),
      false,
      0,
      "",
      ""
    );
  }
}

export default CourseModel;
