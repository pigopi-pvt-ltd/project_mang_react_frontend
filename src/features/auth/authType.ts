// src/features/auth/authTypes.ts
import type { Role } from "../../types/role";
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  role: Role;
  mobileNumber?: string;
  github?: string;
  officialEmail?: string;
  address?: string;
  message?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  mobileNumber?: string;
  github?: string;
  officialEmail?: string;
  address?: string;
  message: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  tokenId: string;
  newPassword: string;
  confirmPassword: string;
}
