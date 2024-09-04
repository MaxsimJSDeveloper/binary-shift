import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://binary-shift-backend.onrender.com/";

export const getWaterToday = createAsyncThunk(
  "water/today",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/today");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

