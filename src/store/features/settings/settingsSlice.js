import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserSettings, saveUserSettings } from "../../../shared/api.js";

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, { getState }) => {
    const token = getState().user.token;
    return await fetchUserSettings(token);
  },
);

export const saveSettings = createAsyncThunk(
  "settings/saveSettings",
  async (settings, { getState }) => {
    const token = getState().user.token;
    return await saveUserSettings(settings, token);
  },
);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    theme: "light",
    priorityColors: {
      high: "#ff0000",
      medium: "#ffa500",
      low: "#008000",
    },
    taskManagement: {
      allowDeletion: true,
      allowEditing: true,
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setPriorityColor: (state, action) => {
      const { priority, color } = action.payload;
      state.priorityColors[priority] = color;
    },
    setTaskManagementOption: (state, action) => {
      const { option, value } = action.payload;
      state.taskManagement[option] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(saveSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setTheme, setPriorityColor, setTaskManagementOption } =
  settingsSlice.actions;

export default settingsSlice.reducer;
