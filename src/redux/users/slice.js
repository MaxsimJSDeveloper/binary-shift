import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  updateUser,
  updateUserAvatar,
  requestResetEmail,
  resetPassword,
} from "./operations";

export const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, handleRejected)

      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, handleRejected)

      .addCase(updateUserAvatar.pending, handlePending)
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserAvatar.rejected, handleRejected)

      .addCase(requestResetEmail.pending, handlePending)
      .addCase(requestResetEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(requestResetEmail.rejected, handleRejected)

      .addCase(resetPassword.pending, handlePending)
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, handleRejected);
  },
});

export const usersReducer = usersSlice.reducer;
