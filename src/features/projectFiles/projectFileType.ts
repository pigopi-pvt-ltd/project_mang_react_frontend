// src/features/projectFiles/projectFileType.ts

export interface ProjectFileResponse {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  cloudinaryUrl: string;
  projectId: number;
  resourceType: string;
  uploadedByUserId: number;
  uploadedAt: string;
}
