import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://binary-shift-backend.onrender.com/";

export const fetchWaterRate = createAsyncThunk(
  "waterRate/fetchWaterRate",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/water-rate");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const putWaterRate = createAsyncThunk(
  "waterRate/putWaterRate",
  async ({ volume }, thunkAPI) => {
    try {
      const response = await axios.post("/water-rate", { volume });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
