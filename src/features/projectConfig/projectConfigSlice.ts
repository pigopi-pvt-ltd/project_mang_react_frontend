// src/features/projectConfigs/projectConfigSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProjectConfigState {
  selectedConfigId: number | null;
  isConfigModalOpen: boolean;
}

const initialState: ProjectConfigState = {
  selectedConfigId: null,
  isConfigModalOpen: false,
};

const projectConfigSlice = createSlice({
  name: "projectConfig",

  initialState,

  reducers: {
    // Select config
    setSelectedConfig: (state, action: PayloadAction<number>) => {
      state.selectedConfigId = action.payload;
    },

    // Clear selected config
    clearSelectedConfig: (state) => {
      state.selectedConfigId = null;
    },

    // Open config modal
    openConfigModal: (state) => {
      state.isConfigModalOpen = true;
    },

    // Close config modal
    closeConfigModal: (state) => {
      state.isConfigModalOpen = false;
    },
  },
});

export const {
  setSelectedConfig,
  clearSelectedConfig,
  openConfigModal,
  closeConfigModal,
} = projectConfigSlice.actions;

export default projectConfigSlice.reducer;
