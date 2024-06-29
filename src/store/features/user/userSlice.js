import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../../../shared/api.js";

export const register = createAsyncThunk("user/register", async (userData) => {
  const response = await registerUser(userData);
  return response;
});

export const login = createAsyncThunk("user/login", async (userData) => {
  const response = await loginUser(userData);
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
