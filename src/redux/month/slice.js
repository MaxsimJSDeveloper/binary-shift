import { createSlice } from "@reduxjs/toolkit";
import { fetchMonthWater } from "./operations";

export const handlePending = (state) => {
  state.isLoading = true;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const monthSlice = createSlice({
  name: "monthItem",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthWater.rejected, handleRejected)
      .addCase(fetchMonthWater.pending, handlePending)
      .addCase(fetchMonthWater.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      });
  },
});


// const monthSlice = createSlice({
//   name: "monthItem",
//   initialState: {
//     cache: {},
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMonthWater.pending, handlePending)
//       .addCase(fetchMonthWater.fulfilled, (state, action) => {        
//         const { filterKeys, data } = action.payload;        
//         state.cache[filterKeys] = data;  
//         state.isLoading = false;
//       })
//     .addCase(fetchMonthWater.rejected,handleRejected)
//   }
// })

export const monthReducer = monthSlice.reducer;
