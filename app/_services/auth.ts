"use client";

import { apiRequest } from "./../_utils/axios/client";
import RegisterModel from "../_models/register";

export async function signIn(username: string, password: string) {
  const { data, error } = await apiRequest<{
    jwtToken: string;
    message: string;
  }>("/auth/login", {
    method: "POST",
    data: { username, password },
  });

  return { data, error };
}

export async function signUp(
  register: RegisterModel,
  googleToken?: string | null
) {
  const endpoint = googleToken ? "/auth/google/signup" : "/auth/signup";
  const requestData = googleToken
    ? {
        ...register.toJson(),
        refreshToken: googleToken,
        redirectUri: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/google/callback`,
      }
    : register.toJson();

  const { data, error } = await apiRequest<{
    jwtToken: string;
    message: string;
  }>(endpoint, {
    method: "POST",
    data: requestData,
  });

  return { data, error };
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  const { data, error } = await apiRequest<{
    jwtToken: string;
    message: string;
  }>("/auth/change-password", {
    method: "POST",
    data: {
      currentPassword,
      newPassword,
    },
  });
  if (error || !data) {
    return { error };
  }
  return { data: data.jwtToken };
}
