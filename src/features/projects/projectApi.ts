// src/features/projects/projectApi.ts

import { api } from "../../app/api";

import type {
  ProjectRequest,
  ProjectResponse,
  ProjectUpdateRequest,
} from "./projectType";

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE PROJECT
    createProject: builder.mutation<ProjectResponse, ProjectRequest>({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),

    // GET ALL PROJECTS
    getAllProjects: builder.query<ProjectResponse[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),

    // GET PROJECT BY ID
    getProject: builder.query<ProjectResponse, number>({
      query: (id) => `/projects/${id}`,
      providesTags: ["Projects"],
    }),

    // GET PROJECT BY NAME
    getProjectByName: builder.query<ProjectResponse, string>({
      query: (name) => `/projects/name/${encodeURIComponent(name)}`,
      providesTags: ["Projects"],
    }),

    // UPDATE PROJECT
    updateProject: builder.mutation<
      ProjectResponse,
      { id: number; data: ProjectUpdateRequest }
    >({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),

    // DELETE PROJECT
    deleteProject: builder.mutation<string, number>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
        responseHandler: "text",
      }),
      invalidatesTags: ["Projects"],
    }),

    // GET CURRENT USER'S PROJECTS
    getMyProjects: builder.query<ProjectResponse[], void>({
      query: () => "/projects/me/projects",
      providesTags: ["Projects"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useGetProjectByNameQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetMyProjectsQuery,
} = projectApi;
