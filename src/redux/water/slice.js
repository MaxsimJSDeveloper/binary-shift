import { createSlice } from "@reduxjs/toolkit";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    days: [],
    isLoading: false,
    error: null,
  },
});

export const waterReducer = waterSlice.reducer;
