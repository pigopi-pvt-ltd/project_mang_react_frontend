// src/app/api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),

  tagTypes: ["Me", "Projects", "Users", "ProjectConfig", "ProjectFile"],

  endpoints: () => ({}),
});
