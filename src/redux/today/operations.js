import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://binary-shift-backend.onrender.com/";

export const getWaterToday = createAsyncThunk(
  "water/today",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/today");
      console.log('Отримані дані:', response.data);
      return response.data;
    } catch (err) {
      console.error('Помилка при отриманні даних:', err);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);