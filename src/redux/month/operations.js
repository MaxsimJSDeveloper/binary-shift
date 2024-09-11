import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://binary-shift-backend.onrender.com/";

export const fetchMonthWater = createAsyncThunk(
  "monthItem/fetchMonthWater",
  async ({ month,year}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/month?month=${month}&year=${year}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// export const fetchMonthWater = createAsyncThunk(
//   'monthItem/fetchMonthWater',
//   async ({ month, year }, { getState, rejectWithValue }) => {
//     const { monthItem } = getState();
//     const filterKeys = `${month}${year}`;
    
//     if (monthItem.cache[filterKeys]) {
//       return rejectWithValue('Items already cached for this filters')
//     }
//     const response = await axios.get(`/month?month=${month}&year=${year}`);   
        
//     const data = await response.data.data;  
    
//     return{filterKeys, data}
//   }
// )