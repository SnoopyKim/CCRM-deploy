"use client";

import { AxiosError } from "axios";
import FaqModel, { FaqDTO } from "../_models/faq";
import PageList from "../_models/page-list";
import { apiRequest } from "@utils/axios/client";

const endpoint = "/customer-support/faq";

export async function getFaqs(
  page: number,
  limit: number = 10
): Promise<{ data: PageList<FaqModel> | undefined; error?: AxiosError }> {
  const { data, error } = await apiRequest<PageList<FaqDTO>>(endpoint, {
    method: "GET",
    params: { page, limit },
  });

  if (error) {
    return { data: undefined, error };
  }

  // DTO 데이터를 Model로 변환
  const newData: PageList<FaqModel> = {
    ...data!,
    data: data!.data.map((faq) => FaqModel.fromJson(faq)),
  };

  return { data: newData, error };
}
