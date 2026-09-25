// src/features/projects/projectType.ts

export interface ProjectRequest {
  name: string;
  description?: string;
}

export interface ProjectUpdateRequest {
  name?: string;
  description?: string;
}

export interface ProjectResponse {
  id: number;
  name: string;
  description?: string;
}
