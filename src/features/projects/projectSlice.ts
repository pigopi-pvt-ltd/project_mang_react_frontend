// src/features/projects/projectSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  selectedProjectId: number | null;
  isProjectModalOpen: boolean;
}

const initialState: ProjectState = {
  selectedProjectId: null,
  isProjectModalOpen: false,
};

const projectSlice = createSlice({
  name: "project",

  initialState,

  reducers: {
    // Select project
    setSelectedProject: (state, action: PayloadAction<number>) => {
      state.selectedProjectId = action.payload;
    },

    // Clear selected project
    clearSelectedProject: (state) => {
      state.selectedProjectId = null;
    },

    // Open project modal
    openProjectModal: (state) => {
      state.isProjectModalOpen = true;
    },

    // Close project modal
    closeProjectModal: (state) => {
      state.isProjectModalOpen = false;
    },
  },
});

export const {
  setSelectedProject,
  clearSelectedProject,
  openProjectModal,
  closeProjectModal,
} = projectSlice.actions;

export default projectSlice.reducer;
