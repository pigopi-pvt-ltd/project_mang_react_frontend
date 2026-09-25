// src/features/users/userTypes.ts

import type { Role } from "../../types/role";

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: Role;
  mobilenumber?: string;
  github?: string;
  officialEmail?: string;
  address?: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  role: Role;
  message: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: Role;
  mobileNumber?: string;
  github?: string;
  address?: string;
  officialEmail?: string;
  message?: string;
}

export interface UserUpdateRequest {
  username?: string;
  email?: string;
  mobilenumber?: string;
  github?: string;
  address?: string;
  officialEmail?: string;
}

export interface ProjectResponse {
  id: number;
  name: string;
  description?: string;
}

export interface AssignProjectResponse {
  id: number;
  username: string;
  email: string;
  message: string;
  project: ProjectResponse;
}

export interface RemoveUserFromProjectResponse {
  userId: number;
  projectId:number;
  username: string;
  projectName:string;
  message: string;
}

export interface UserAllProjectsResponse {
  userId: number;
  username: string;
  projects: ProjectResponse[];
  message: string;
}
