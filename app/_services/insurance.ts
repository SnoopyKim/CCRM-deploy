"use client";

import InsuranceModel, { InsuranceDTO } from "../_models/insurance";
import PageList from "../_models/page-list";
import { apiRequest, SimpleResponse } from "../_utils/axios/client";

const endpoint = "/information/insurance-claims";

export async function getInsurances(
  page: number,
  limit: number = 10
): Promise<SimpleResponse<PageList<InsuranceModel>>> {
  const { data, error } = await apiRequest<PageList<InsuranceDTO>>(endpoint, {
    method: "GET",
    params: { page, limit },
  });

  if (error) {
    return { data: undefined, error };
  }

  // DTO 데이터를 Model로 변환
  const newData: PageList<InsuranceModel> = {
    ...data!,
    data: data!.data.map((insurance) => InsuranceModel.fromJson(insurance)),
  };

  return { data: newData, error };
}
