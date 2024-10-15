import { create, State } from "zustand";
import { persist } from "zustand/middleware";
import { UserDTO } from "@/app/_models/user"; // 사용자 정의 User 모델
import { apiRequest } from "../axios/client";
import { signIn, signUp } from "@/app/_services/auth";
import RegisterModel from "@/app/_models/register";

// **상태 인터페이스**
interface AuthState {
  isAuthenticated: boolean;
  user: null | UserDTO;
  token: null | string;
  tempToken: null | string; // Google 가입을 위한 임시 토큰
  fetching: boolean;
  error: string | null;
  hasInitialized: boolean;
}

// **액션 인터페이스**
interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (model: RegisterModel) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  saveToken: (token: string) => void;
  saveTempToken: (tempToken: string) => void;
  initialize: () => void;
}

// **상태와 액션을 합친 스토어 인터페이스**
type AuthStore = AuthState & AuthActions;

const isProduction = process.env.NODE_ENV === "production";

// **스토어 생성**
const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // **초기 상태**
      isAuthenticated: false,
      user: null,
      token: null,
      tempToken: null,
      fetching: false,
      error: null,
      hasInitialized: false,

      // **액션 구현**
      // 로그인 후 사용자 정보 받기
      login: async (email, password) => {
        set({ fetching: true, error: null });
        const { data, error } = await signIn(email, password);
        if (error) {
          set({
            fetching: false,
            error:
              (error.response?.data as { message: string })?.message ||
              "로그인 실패",
          });
          return;
        }

        if (data) {
          const { data: user, error } = await apiRequest<UserDTO>("/users/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.jwtToken}`,
            },
          });
          if (error) {
            set({
              fetching: false,
              error:
                (error.response?.data as { message: string })?.message ||
                "사용자 정보 오류",
            });
            return;
          }
          set({
            isAuthenticated: true,
            token: data.jwtToken,
            user,
            fetching: false,
            error: null,
          });
        }
      },

      // 회원가입
      register: async (model) => {
        set({ fetching: true, error: null });
        const { data, error } = await signUp(model, get().tempToken);
        if (error) {
          set({
            fetching: false,
            error:
              (error.response?.data as { message: string })?.message ||
              "회원가입 오류",
          });
        }
        if (data) {
          const { data: user, error } = await apiRequest<UserDTO>("/users/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.jwtToken}`,
            },
          });
          if (error) {
            set({
              fetching: false,
              error:
                (error.response?.data as { message: string })?.message ||
                "사용자 정보 오류",
            });
            return;
          }
          set({
            isAuthenticated: true,
            token: data.jwtToken,
            tempToken: null,
            user,
            fetching: false,
            error: null,
          });
        }
      },

      // 로그아웃
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          tempToken: null,
          error: null,
        });
      },

      // 사용자 정보 가져오기
      fetchUser: async () => {
        const token = get().token;
        if (!token) {
          set({ error: "로그인 정보가 없습니다" });
          return;
        }

        set({ fetching: true, error: null });
        const { data: user, error } = await apiRequest<UserDTO>("/users/me", {
          method: "GET",
        });
        if (error) {
          set({
            fetching: false,
            error:
              (error.response?.data as { message: string })?.message ||
              "사용자 정보 오류",
          });
          return;
        }
        set({ fetching: false, user });
      },

      saveToken: (token: string) => {
        set({ token });
      },
      saveTempToken: (tempToken: string) => {
        set({ tempToken });
      },
      initialize: () => {
        set({ hasInitialized: true });
      },
    }),
    {
      name: "ccrm-auth", // 저장할 키 이름
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          state.initialize(); // 상태 복원 완료 후 로딩 상태 해제
        }
      },
    }
  )
);

export default useAuthStore;
