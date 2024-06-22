import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import settingsReducer from "./features/settings/settingsSlice";
import todoReducer from "./features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    todo: todoReducer,
  },
});
