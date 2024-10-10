"use client";

import PaymentModel, { PaymentDTO } from "../_models/payment";
import PageList from "../_models/page-list";
import { apiRequest } from "@utils/axios/client";
import { AxiosError } from "axios";

const endpoint = "/payment/transactions";

export async function getPayments(
  page: number,
  limit: number = 10
): Promise<{ data: PageList<PaymentModel> | undefined; error?: AxiosError }> {
  const { data, error } = await apiRequest<PageList<PaymentDTO>>(endpoint, {
    method: "GET",
    params: { page, limit },
  });

  if (error) {
    return { data: undefined, error };
  }

  // DTO 데이터를 Model로 변환
  const newData: PageList<PaymentModel> = {
    ...data!,
    data: data!.data.map((payment) => PaymentModel.fromJson(payment)),
  };

  return { data: newData, error };
}

export async function getPayment(
  id: string
): Promise<{ data: PaymentModel | undefined; error?: AxiosError }> {
  const { data, error } = await apiRequest<PaymentDTO>(`${endpoint}/${id}`, {
    method: "GET",
  });

  if (error) {
    return { data: undefined, error };
  }

  return { data: PaymentModel.fromJson(data!), error };
}
