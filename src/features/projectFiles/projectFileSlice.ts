// src/features/projectFiles/projectFileSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProjectFileState {
  selectedFileId: number | null;
  isFileModalOpen: boolean;
  isUploadModalOpen: boolean;
}

const initialState: ProjectFileState = {
  selectedFileId: null,
  isFileModalOpen: false,
  isUploadModalOpen: false,
};

const projectFileSlice = createSlice({
  name: "projectFile",

  initialState,

  reducers: {
    // Select file
    setSelectedFile: (state, action: PayloadAction<number>) => {
      state.selectedFileId = action.payload;
    },

    // Clear selected file
    clearSelectedFile: (state) => {
      state.selectedFileId = null;
    },

    // Open file details modal
    openFileModal: (state) => {
      state.isFileModalOpen = true;
    },

    // Close file details modal
    closeFileModal: (state) => {
      state.isFileModalOpen = false;
    },

    // Open upload modal
    openUploadModal: (state) => {
      state.isUploadModalOpen = true;
    },

    // Close upload modal
    closeUploadModal: (state) => {
      state.isUploadModalOpen = false;
    },
  },
});

export const {
  setSelectedFile,
  clearSelectedFile,
  openFileModal,
  closeFileModal,
  openUploadModal,
  closeUploadModal,
} = projectFileSlice.actions;

export default projectFileSlice.reducer;
