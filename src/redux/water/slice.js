import { createSlice } from "@reduxjs/toolkit";
import { addWater, deleteWater, updateWater } from "./operations";

export const handlePending = (state) => {
  state.isLoading = true;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: "water",
  initialState: {
    waterEntries: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWater.rejected, handleRejected)
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.waterEntries.push(action.payload);
      })
      .addCase(updateWater.rejected, handleRejected)
      .addCase(updateWater.pending, handlePending)
      .addCase(updateWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.waterEntries.findIndex(
          (water) => water.id === action.payload.id
        );
        if (index !== -1) {
          state.waterEntries[index] = action.payload;
        }
      })
      .addCase(deleteWater.rejected, handleRejected)
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.waterEntries.findIndex(
          (water) => water.id === action.payload.id
        );
        if (index !== -1) {
          state.waterEntries.splice(index, 1);
        }
      });
  },
});

export const waterReducer = waterSlice.reducer;
