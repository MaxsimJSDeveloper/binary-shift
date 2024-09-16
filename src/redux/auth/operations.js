import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://binary-shift-backend.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", credentials);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", credentials, {
        withCredentials: true,
      });
      setAuthHeader(res.data.data.accessToken);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async () => {
    const { data } = await axios.post("/auth/refresh", null, {
      withCredentials: true,
    });
    setAuthHeader(data.data.accessToken);
    return data.data;
  },
  {
    condition(_, { getState }) {
      const state = getState();
      return state.auth.token !== null && !state.auth.isRefreshing;
    },
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const { data } = await axios.post("/auth/logout", null, {
    withCredentials: true,
  });
  return data.data;
});

export const setInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        const navigate = useNavigate();
        navigate("/signin");
      }
      return Promise.reject(error);
    }
  );
};
