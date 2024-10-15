"use client";

import { AxiosError } from "axios";
import CourseModel, { CourseDTO } from "../_models/course";
import PageList from "../_models/page-list";
import { apiRequest, SimpleResponse } from "../_utils/axios/client";

const endpoint = "/customer-support/lecture";

export async function getCourses(
  page: number,
  limit: number = 10
): Promise<SimpleResponse<PageList<CourseModel>>> {
  const { data, error } = await apiRequest<PageList<CourseDTO>>(endpoint, {
    method: "GET",
    params: { page, limit },
  });

  if (error) {
    return { data: undefined, error };
  }

  // DTO 데이터를 Model로 변환
  const newData: PageList<CourseModel> = {
    ...data!,
    data: data!.data.map((course) => CourseModel.fromJson(course)),
  };

  return { data: newData, error };
}
