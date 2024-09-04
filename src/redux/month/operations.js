import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://binary-shift-backend.onrender.com/";

export const fetchMonthWater = createAsyncThunk(
  "month/fetchMonthWater",
  async ( month, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/month?month=${month}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
