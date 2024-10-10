"use client";

import { apiRequest } from "./../_utils/axios/client";
import axiosClient from "../_utils/axios/client";
import Cookies from "js-cookie";
import RegisterModel from "../_models/register";

export async function signIn(username: string, password: string) {
  const { data, error } = await apiRequest<{
    jwtToken: string;
    message: string;
  }>("/auth/login", {
    method: "POST",
    data: { username, password },
  });

  if (data) {
    Cookies.set("ccrm-token", data.jwtToken, {
      expires: 30,
    });
  }

  return { data, error };
}

export async function signUp(register: RegisterModel) {
  const googleToken = Cookies.get("ccrm-temp-token");
  console.log(googleToken);
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

export function signOut() {
  Cookies.remove("ccrm-token");
}
