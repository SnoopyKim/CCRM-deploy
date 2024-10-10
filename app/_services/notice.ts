"use client";

import { AxiosError } from "axios";
import NoticeModel, { NoticeDTO } from "../_models/notice";
import PageList from "../_models/page-list";
import { apiRequest } from "../_utils/axios/client";

const endpoint = "/customer-support/notice";

export async function getNotices(
  page: number,
  limit: number = 10
): Promise<{ data: PageList<NoticeModel> | undefined; error?: AxiosError }> {
  const { data, error } = await apiRequest<PageList<NoticeDTO>>(endpoint, {
    method: "GET",
    params: { page, limit },
  });

  if (error) {
    return { data: undefined, error };
  }

  // DTO 데이터를 Model로 변환
  const newData: PageList<NoticeModel> = {
    ...data!,
    data: data!.data.map((notice) => NoticeModel.fromJson(notice)),
  };

  return { data: newData, error };
}

export async function getNotice(id: string): Promise<{
  data?: NoticeModel;
  error?: AxiosError;
}> {
  const { data, error } = await apiRequest<NoticeDTO>(`${endpoint}/${id}`, {
    method: "GET",
  });

  if (error) {
    return { data: undefined, error };
  }

  return { data: NoticeModel.fromJson(data!), error };
}
