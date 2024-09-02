import { createSlice } from "@reduxjs/toolkit";

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
  },
  extraReducers: (builder) => {},
});

export const waterRateReducer = waterRateSlice.reducer;
