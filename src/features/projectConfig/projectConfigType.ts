// src/features/projectConfigs/projectConfigType.ts

export interface ProjectConfigRequest {
  configName: string;
  configValue: string;
}

export interface ProjectConfigResponse {
  id: number;
  configName: string;
  configValue: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
}
