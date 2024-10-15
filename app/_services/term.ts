"use client";

import TermModel, { TermDTO } from "../_models/term";
import PageList from "../_models/page-list";
import { apiRequest, SimpleResponse } from "../_utils/axios/client";
const endpoint = "/information/insurance-terms";

export async function getTerms(
  page: number,
  limit: number = 10
): Promise<SimpleResponse<PageList<TermModel>>> {
  const { data, error } = await apiRequest<PageList<TermDTO>>(endpoint, {
    method: "GET",
    params: { page, limit },
  });

  if (error) {
    return { data: undefined, error };
  }

  // DTO 데이터를 Model로 변환
  const newData: PageList<TermModel> = {
    ...data!,
    data: data!.data.map((term) => TermModel.fromJson(term)),
  };

  return { data: newData, error };
}
