import { api } from "../../app/api";

import type {
  LoginRequest,
  AuthResponse,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "./authType";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // POST /api/auth/login
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Me"],
    }),

    // POST /api/auth/logout
    logout: builder.mutation<string, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      invalidatesTags: ["Me"],
    }),

    // GET /api/auth/me
    getMe: builder.query<AuthResponse, void>({
      query: () => "/auth/me",

      providesTags: ["Me"],
    }),

    // PUT /api/auth/change-password
    changePassword: builder.mutation<string, ChangePasswordRequest>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
    }),

    // POST /api/auth/forgot-password
    forgotPassword: builder.mutation<string, ForgotPasswordRequest>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // POST /api/auth/reset-password
    resetPassword: builder.mutation<string, ResetPasswordRequest>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
