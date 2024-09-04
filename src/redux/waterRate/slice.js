import { createSlice } from "@reduxjs/toolkit";
import { fetchWaterRate, putWaterRate } from "./operations";

export const handlePending = (state) => {
  state.isLoading = true;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const waterRateSlice = createSlice({
  name: "waterRate",
  initialState: {
    isLoading: false,
    error: null,
    data: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterRate.rejected, handleRejected)
      .addCase(fetchWaterRate.pending, handlePending)
      .addCase(fetchWaterRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(putWaterRate.rejected, handleRejected)
      .addCase(putWaterRate.pending, handlePending)
      .addCase(putWaterRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      });
  },
});

export const waterRateReducer = waterRateSlice.reducer;
