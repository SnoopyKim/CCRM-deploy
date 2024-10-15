// src/models/CategoryModel.ts

// DTO 정의
export type DiseaseDTO = {
  id: string;
  depth: string;
  title: string;
  children: string;
  isPublished: string;
  orderNum: string;
};

// Model 정의
export default class DiseaseModel {
  id: string;
  depth: string;
  title: string;
  children: string;
  isPublished: string;
  orderNum: string;

  constructor(
    id: string,
    depth: string,
    title: string,
    children: string,
    isPublished: string,
    orderNum: string
  ) {
    this.id = id;
    this.depth = depth;
    this.title = title;
    this.children = children;
    this.isPublished = isPublished;
    this.orderNum = orderNum;
  }

  // DTO에서 Model로 변환
  static fromJson(categoryDTO: DiseaseDTO): DiseaseModel {
    return new DiseaseModel(
      categoryDTO.id,
      categoryDTO.depth,
      categoryDTO.title,
      categoryDTO.children,
      categoryDTO.isPublished,
      categoryDTO.orderNum
    );
  }

  // Model에서 DTO로 변환
  toJson(): DiseaseDTO {
    return {
      id: this.id,
      depth: this.depth,
      title: this.title,
      children: this.children,
      isPublished: this.isPublished,
      orderNum: this.orderNum,
    };
  }

  // 빈 인스턴스 반환
  static empty(): DiseaseModel {
    return new DiseaseModel("", "", "Untitled", "", "false", "0");
  }
}
