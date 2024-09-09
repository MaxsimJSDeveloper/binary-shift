import { createSlice } from "@reduxjs/toolkit";
import { getWaterToday } from "./operations";

export const handlePending = (state) => {
  state.isLoading = true;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const todaySlice = createSlice({
  name: "today",
  initialState: {
    entriesToday: [],
    percentageConsumed: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
    .addCase(getWaterToday.rejected, handleRejected)
    .addCase(getWaterToday.pending, handlePending)
    .addCase(getWaterToday.fulfilled, (state, action)=>{
      state.isLoading=false;
      state.error = null;
      state.entriesToday = action.payload.numberOfValue;
      state.percentageConsumed = action.payload.percentageConsumed; 
    })
  },
});

export const todayReducer = todaySlice.reducer;
