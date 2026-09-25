// src/features/users/userApi.ts

import { api } from "../../app/api";

import type {
  RegisterRequest,
  RegisterResponse,
  UserResponse,
  UserUpdateRequest,
  AssignProjectResponse,
  RemoveUserFromProjectResponse,
  UserAllProjectsResponse,
} from "./userType";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE EMPLOYEE / MANAGER
    // POST /api/users
    createUser: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Users"],
    }),

    // GET ALL USERS
    // GET /api/users
    getAllUsers: builder.query<UserResponse[], void>({
      query: () => "/users",

      providesTags: ["Users"],
    }),
    // GET USER BY ID
    // GET /api/users/{id}

    getUser: builder.query<UserResponse, number>({
      query: (id) => `/users/${id}`,

      providesTags: ["Users"],
    }),

    // UPDATE USER
    // PUT /api/users/{id}
    updateUser: builder.mutation<
      UserResponse,
      {
        id: number;
        data: UserUpdateRequest;
      }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["Users"],
    }),

    // DELETE USER
    // DELETE /api/users/{id}
    deleteUser: builder.mutation<string, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Users"],
    }),

    // ASSIGN PROJECT
    // POST /api/users/{userId}/projects/{projectId}
    assignProject: builder.mutation<
      AssignProjectResponse,
      {
        userId: number;
        projectId: number;
      }
    >({
      query: ({ userId, projectId }) => ({
        url: `/users/${userId}/projects/${projectId}`,
        method: "POST",
      }),

      invalidatesTags: ["Users"],
    }),

    // REMOVE USER FROM PROJECT
    // DELETE /api/users/{userId}/projects/{projectId}
    removeUserFromProject: builder.mutation<
      RemoveUserFromProjectResponse,
      {
        userId: number;
        projectId: number;
      }
    >({
      query: ({ userId, projectId }) => ({
        url: `/users/${userId}/projects/${projectId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Users"],
    }),

    // GET USER'S ALL PROJECTS
    // GET /api/users/{userId}/projects
    getUserAllProjects: builder.query<UserAllProjectsResponse, number>({
      query: (userId) => `/users/${userId}/projects`,

      providesTags: ["Users"],
    }),
  }),
});

// EXPORT HOOKS

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignProjectMutation,
  useRemoveUserFromProjectMutation,
  useGetUserAllProjectsQuery,
} = userApi;
