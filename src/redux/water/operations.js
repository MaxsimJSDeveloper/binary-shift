import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://binary-shift-backend.onrender.com/";

export const addWater = createAsyncThunk(
  "water/add",
  async ({date, volume}, thunkAPI) => {
    try {
      const res = await axios.post("/water", { date, volume });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data.data || err.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  "water/update",
  async ({ id, date, volume }, thunkAPI) => {
    try {
      const res = await axios.patch(`/water/${id}`, { date, volume });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/delete",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/water/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
