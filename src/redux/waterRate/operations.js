import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://binary-shift-backend.onrender.com/";

export const fetchWaterRate = createAsyncThunk(
  "waterRate/fetchWaterRate",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/water-rate");      
      return response.data.data.dailyNorma;       
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data.dailyNorma || err.message);
    }
  }
);

export const putWaterRate = createAsyncThunk(
  "waterRate/putWaterRate",
  async (dailyNorma , thunkAPI) => {
    try {
      const response = await axios.put("/water-rate", dailyNorma);      
      return response.data.data.dailyNorma;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data.data.dailyNorma || err.message);
    }
  }
);
