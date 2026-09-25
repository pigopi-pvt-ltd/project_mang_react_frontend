// src/features/users/userSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  selectedUserId: number | null;
  // selectedProjectId: number | null;
  isUserModalOpen: boolean;
  isAssignProjectModalOpen: boolean;
}

const initialState: UserState = {
  selectedUserId: null,
  // selectedProjectId: null,
  isUserModalOpen: false,
  isAssignProjectModalOpen: false,
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    // Select user
    setSelectedUser: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
    },

    // Remove selected user
    clearSelectedUser: (state) => {
      state.selectedUserId = null;
    },

    // Select project
    // setSelectedProject: (state, action: PayloadAction<number>) => {
    //   state.selectedProjectId = action.payload;
    // },

    // // Remove selected project
    // clearSelectedProject: (state) => {
    //   state.selectedProjectId = null;
    // },

    // User modal
    openUserModal: (state) => {
      state.isUserModalOpen = true;
    },

    closeUserModal: (state) => {
      state.isUserModalOpen = false;
    },

    // Assign project modal
    openAssignProjectModal: (state) => {
      state.isAssignProjectModalOpen = true;
    },

    closeAssignProjectModal: (state) => {
      state.isAssignProjectModalOpen = false;
    },
  },
});

export const {
  setSelectedUser,
  clearSelectedUser,
  // setSelectedProject,
  // clearSelectedProject,
  openUserModal,
  closeUserModal,
  openAssignProjectModal,
  closeAssignProjectModal,
} = userSlice.actions;

export default userSlice.reducer;
