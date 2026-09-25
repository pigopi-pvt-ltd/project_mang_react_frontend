// src/features/projectFiles/projectFileApi.ts

import { api } from "../../app/api";

import type { ProjectFileResponse } from "./projectFileType";

export const projectFileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // UPLOAD FILE
    uploadProjectFile: builder.mutation<
      ProjectFileResponse,
      { projectId: number; file: File }
    >({
      query: ({ projectId, file }) => {
        const formData = new FormData();

        formData.append("file", file);

        return {
          url: `/projectfiles/project/${projectId}`,
          method: "POST",
          body: formData,
        };
      },

      invalidatesTags: ["ProjectFile"],
    }),

    // GET ALL FILES OF PROJECT
    getProjectFiles: builder.query<ProjectFileResponse[], number>({
      query: (projectId) => `/projectfiles/project/${projectId}`,

      providesTags: ["ProjectFile"],
    }),

    // GET ONE FILE
    getProjectFile: builder.query<ProjectFileResponse, number>({
      query: (fileId) => `/projectfiles/${fileId}`,

      providesTags: ["ProjectFile"],
    }),

    // DELETE FILE
    deleteProjectFile: builder.mutation<string, number>({
      query: (fileId) => ({
        url: `/projectfiles/${fileId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["ProjectFile"],
    }),
  }),
});

export const {
  useUploadProjectFileMutation,
  useGetProjectFilesQuery,
  useGetProjectFileQuery,
  useDeleteProjectFileMutation,
} = projectFileApi;
