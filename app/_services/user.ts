"use client";

import UserModel, { UserDTO } from "../_models/user";
import { apiRequest } from "@utils/axios/client";
import { AxiosError } from "axios";

const endpoint = "users/me";

export async function getUser(): Promise<{
  data: UserModel | undefined;
  error?: AxiosError;
}> {
  const { data, error } = await apiRequest<UserDTO>(endpoint, {
    method: "GET",
  });

  if (error) {
    return { data: undefined, error };
  }

  return { data: UserModel.fromJson(data!), error };
}
