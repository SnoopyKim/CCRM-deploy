import axios, { AxiosRequestConfig } from "axios";
import { apiRequest } from "./client";

const googleClient = axios.create({
  baseURL: "https://www.googleapis.com",
});

const getGoogleToken = async () => {
  const { data, error } = await apiRequest<{ accessToken: string }>(
    "/auth/google/token",
    {
      method: "GET",
    }
  );
  return error || !data ? "" : data.accessToken;
};

export async function googleRequest(
  url: string,
  config: AxiosRequestConfig
): Promise<{
  data?: any;
  error?: string;
}> {
  const token = await getGoogleToken();
  if (!token) return { error: "사용자 정보 오류" };

  try {
    const { data } = await googleClient(url, {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: config?.headers?.Authorization || `Bearer ${token}`,
      },
    });

    return { data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios 에러 처리
      console.error(
        "API Error:",
        error.response?.data.message || error.message
      );
      return { error: error.response?.data.message || error.message };
    } else {
      // 기타 에러 처리
      return { error: "알 수 없는 오류가 발생했습니다." };
    }
  }
}
