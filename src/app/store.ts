import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import projectReducer from "../features/projects/projectSlice";
import projectConfigReducer from "../features/projectConfig/projectConfigSlice"
import projectFileReducer from "../features/projectFiles/projectFileSlice"
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,

    auth: authReducer,
    user: userReducer,
    project: projectReducer,
    projectConfig:projectConfigReducer,
    projectFile:projectFileReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
