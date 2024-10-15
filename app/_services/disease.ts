"use client";

import DiseaseModel, { DiseaseDTO } from "../_models/disease";
import PageList from "../_models/page-list";
import { apiRequest, SimpleResponse } from "../_utils/axios/client";

const endpoint = "/information/disease-code";

export async function getDiseases(
  page: number,
  limit: number = 10
): Promise<SimpleResponse<PageList<DiseaseModel>>> {
  const { data, error } = await apiRequest<PageList<DiseaseDTO>>(endpoint, {
    method: "GET",
    params: { page, limit },
  });

  if (error) {
    return { data: undefined, error };
  }

  // DTO 데이터를 Model로 변환
  const newData: PageList<DiseaseModel> = {
    ...data!,
    data: data!.data.map((disease) => DiseaseModel.fromJson(disease)),
  };

  return { data: newData, error };
}
