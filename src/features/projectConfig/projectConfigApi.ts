// src/features/projectConfigs/projectConfigApi.ts

import { api } from "../../app/api";

import type {
  ProjectConfigRequest,
  ProjectConfigResponse,
} from "./projectConfigType";

export const projectConfigApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE CONFIG FOR PROJECT
    createProjectConfig: builder.mutation<
      ProjectConfigResponse,
      { projectId: number; data: ProjectConfigRequest }
    >({
      query: ({ projectId, data }) => ({
        url: `/configs/project/${projectId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProjectConfig"],
    }),

    // GET ALL CONFIGS OF A PROJECT
    getProjectConfigs: builder.query<ProjectConfigResponse[], number>({
      query: (projectId) => `/configs/project/${projectId}`,
      providesTags: ["ProjectConfig"],
    }),

    // GET SINGLE CONFIG
    getProjectConfig: builder.query<ProjectConfigResponse, number>({
      query: (configId) => `/configs/${configId}`,
      providesTags: ["ProjectConfig"],
    }),

    // UPDATE CONFIG
    updateProjectConfig: builder.mutation<
      ProjectConfigResponse,
      { configId: number; data: ProjectConfigRequest }
    >({
      query: ({ configId, data }) => ({
        url: `/configs/${configId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProjectConfig"],
    }),

    // DELETE CONFIG
    deleteProjectConfig: builder.mutation<string, number>({
      query: (configId) => ({
        url: `/configs/${configId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectConfig"],
    }),
  }),
});

export const {
  useCreateProjectConfigMutation,
  useGetProjectConfigsQuery,
  useGetProjectConfigQuery,
  useUpdateProjectConfigMutation,
  useDeleteProjectConfigMutation,
} = projectConfigApi;
